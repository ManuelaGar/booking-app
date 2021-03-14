import User from "../models/user.js";
import Stripe from "stripe";
import queryString from "query-string";
import Hotel from "../models/hotel.js";
import Order from "../models/order.js";

const stripe = Stripe(process.env.STRIPE_SECRET);

export async function createConnectAccount(req, res) {
  const user = await User.findById(req.user._id).exec();

  console.log("USER ==> ", user);

  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({ type: "express" });
    console.log("Account ==> ", account);
    user.stripe_account_id = account.id;
    user.save();
  }

  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log("LOGIN LINK", link);
  res.send(link);
}

async function updateDelayDays(accountId) {
  const account = await stripe.account.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
}

export async function getAccountStatus(req, res) {
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  const updatedAccount = await updateDelayDays(account.id);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  res.json(updatedUser);
}

export async function getAccountBalance(req, res) {
  const user = await User.findById(req.user._id).exec();
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    res.json(balance);
  } catch (error) {
    console.log(error);
  }
}

export async function payoutSetting(req, res) {
  try {
    const user = await User.findById(req.user._id).exec();
    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );
    res.json(loginLink);
  } catch (error) {
    console.log("STRIPE PAYOUT SETTING ERR", error);
  }
}

export async function stripeSessionId(req, res) {
  let hotel = await Hotel.findById(req.body.hotelId)
    .populate("postedBy")
    .exec();

  const fee = hotel.price * 0.2;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: hotel.title,
        amount: hotel.price * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: fee * 100,
      transfer_data: {
        destination: hotel.postedBy.stripe_account_id,
      },
    },
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${hotel._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
  res.send({
    sessionId: session.id,
  });
}

export async function stripeSuccess(req, res) {
  try {
    const { hotelId } = req.body;
    const user = await User.findById(req.user._id).exec();
    if (!user.stripeSession) return;
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );
    if (session.payment_status === "paid") {
      const orderExists = await Order.findOne({
        "session.id": session.id,
      }).exec();
      if (!orderExists) {
        let newOrder = await new Order({
          hotel: hotelId,
          session: session,
          orderedBy: user._id,
        }).save();
        await User.findByIdAndUpdate(user._id, {
          $set: { stripeSession: {} },
        });
      }
      return res.json({ success: true });
    }
  } catch (error) {
    console.log("Stripe success err", error);
  }
}
