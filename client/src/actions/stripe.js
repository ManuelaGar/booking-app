import axios from "axios";

export async function createConnectAccount(token) {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getAccountStatus(token) {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getAccountBalance(token) {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function currencyFormatter(data) {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
}

export async function payoutSetting(token) {
  return await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getSessionId(token, hotelId) {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function stripeSuccessRequest(token, hotelId) {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
