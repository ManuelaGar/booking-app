import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe.js";
import { LoadingOutlined } from "@ant-design/icons";

function StripeSuccess({ match, history }) {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    stripeSuccessRequest(token, match.params.hotelId).then((res) => {
      if (res.data.success) {
        console.log("stripe success res", res.data);
        history.push("/dashboard");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.hotelId, token, history]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
}

export default StripeSuccess;
