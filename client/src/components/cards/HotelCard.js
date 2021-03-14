import { currencyFormatter } from "../../actions/stripe.js";
import { diffDays } from "../../actions/hotel.js";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function HotelCard({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row">
          <div className="col-md-4">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotels/image/${h._id}`}
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
                {h.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price * 100,
                    currency: "usd",
                  })}
                </span>
              </h3>
              <p className="alert alert-info">{h.location}</p>
              <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(h.from, h.to)}
                  {diffDays(h.from, h.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">
                {h.bed} {h.bed <= 1 ? "bed" : "beds"}
              </p>
              <p className="card-text">
                Available from {new Date(h.from).toLocaleDateString()}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    className="btn btn-primary"
                    onClick={() => history.push(`/hotel/${h._id}`)}
                  >
                    Show More
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning px-3" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleHotelDelete(h._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelCard;
