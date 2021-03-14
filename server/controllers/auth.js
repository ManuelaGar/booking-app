import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min 6 characters");

    let isEmailInDB = await User.findOne({ email }).exec();
    if (isEmailInDB) return res.status(400).send("Email is taken");

    const newUser = User(req.body);

    await newUser.save();
    return res.json({ ok: true });
  } catch (error) {
    console.log("Create user failed: ", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    let user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("User not found");

    user.comparePassword(password, (err, match) => {
      if (err || !match) res.status(400).send("Wrong password");
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (error) {
    console.log("Login user failed: ", error);
    return res.status(400).send("Error. Try again.");
  }
};
