import React, { useEffect, useState } from "react";
import { readHotel, diffDays } from "../actions/hotel.js";
import { getSessionId } from "../actions/stripe.js";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { isAlreadyBooked } from "../actions/hotel.js";

function ViewHotel({ match, history }) {
  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
    loadSellerHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
        if (res.data.ok) setAlreadyBooked(res.data.ok);
      });
    }
  }, []);

  async function loadSellerHotel() {
    try {
      let res = await readHotel(match.params.hotelId);
      setHotel(res.data);
      setImage(`${process.env.REACT_APP_API}/hotels/image/${res.data._id}`);
    } catch (error) {
      toast.error("Error getting hotel image.");
    }
  }

  async function handleClick(event) {
    event.preventDefault();

    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    if (!auth) history.push("/login");
    let res = await getSessionId(auth.token, match.params.hotelId);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>
          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>

            <p className="card-text">
              From <br />
              {moment(new Date(hotel.from)).format("MMMM Do YYYY")}
            </p>

            <p className="card-text">
              To <br />
              {moment(new Date(hotel.to)).format("MMMM Do YYYY")}
            </p>

            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading || alreadyBooked}
            >
              {loading
                ? "Loading..."
                : alreadyBooked
                ? "Already Booked"
                : auth && auth.token
                ? "Book Now"
                : "Login to book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewHotel;
