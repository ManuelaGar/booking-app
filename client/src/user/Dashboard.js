import DashboardNav from "../components/DashboardNav.js";
import ConnectNav from "../components/ConnectNav.js";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
