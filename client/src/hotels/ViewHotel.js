import React, { useEffect, useState } from "react";
import { readHotel, diffDays } from "../actions/hotel.js";
import { toast } from "react-toastify";
import moment from "moment";

function ViewHotel({ match }) {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    loadSellerHotel();
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
            <button className="btn btn-block btn-lg btn-primary mt-3">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewHotel;
