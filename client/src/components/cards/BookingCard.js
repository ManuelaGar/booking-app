import { currencyFormatter } from "../../actions/stripe.js";
import { diffDays } from "../../actions/hotel.js";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import OrderModal from "../modals/OrderModal.js";

function BookingCard({ hotel, session, orderedBy, showViewMoreButton = true }) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card mb-3">
        <div className="row">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotels/image/${hotel._id}`}
                alt="Default Hotel"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=Booking"
                alt="Default Hotel"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {hotel.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "usd",
                  })}
                </span>
              </h3>
              <p className="alert alert-info">{hotel.location}</p>
              <p className="card-text">{`${hotel.content.substring(
                0,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(hotel.from, hotel.to)}
                  {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">
                {hotel.bed} {hotel.bed <= 1 ? "bed" : "beds"}
              </p>
              <p className="card-text">
                Available from {new Date(hotel.from).toLocaleDateString()}
              </p>
              {showModal && (
                <OrderModal
                  session={session}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
              <div className="d-flex justify-content-between h4">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(!showModal)}
                >
                  Show Payment Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingCard;
