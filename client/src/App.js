import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./booking/Home.js";
import Login from "./auth/Login.js";
import Register from "./auth/Register.js";
import TopNav from "./components/TopNav.js";
import Dashboard from "./user/Dashboard.js";
import DashboardSeller from "./user/DashboardSeller.js";
import EditHotel from "./hotels/EditHotel.js";
import NewHotel from "./hotels/NewHotel.js";
import PrivateRoute from "./components/PrivateRoute.js";
import StripeCallback from "./stripe/StripeCallback.js";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
