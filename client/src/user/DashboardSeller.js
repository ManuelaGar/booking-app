import DashboardNav from "../components/DashboardNav.js";
import ConnectNav from "../components/ConnectNav.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe.js";
import { sellerHotels } from "../actions/hotel.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HotelCard from "../components/cards/HotelCard.js";

function DashboardSeller() {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellerHotels();
  }, []);

  async function loadSellerHotels() {
    let { data } = await sellerHotels(auth.token);
    setHotels(data);
  }

  async function handleClick() {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
      toast.error("Stripe connect failed. Try again.");
      setLoading(false);
    }
  }

  function connected() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/new">
              + Add New
            </Link>
          </div>
        </div>
        <div className="row">
          {hotels.map((h) => (
            <HotelCard
              key={h._id}
              h={h}
              owner={true}
              showViewMoreButton={false}
            />
          ))}
        </div>
      </div>
    );
  }

  function notConnected() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to post hotel rooms</h4>
              <p className="lead">
                This is so you can receive your payments when someone makes a
                reservation.
              </p>
              <button
                disabled={loading}
                onClick={handleClick}
                className="btn btn-primary mb-3"
              >
                {loading ? "Processing..." : "Setup Payouts"}
              </button>
              <p className="text-muted">
                <small>
                  You will be redirected to Stripe to complete the onboarding
                  process.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
}

export default DashboardSeller;
