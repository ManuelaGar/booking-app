import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './booking/Home.js'
import Login from './auth/Login.js'
import Register from './auth/Register.js'
import TopNav from './components/TopNav.js'
import Dashboard from './user/Dashboard.js'
import DashboardSeller from './user/DashboardSeller.js'
import PrivateRoute from './components/PrivateRoute.js'

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <PrivateRoute exact path="/dashboard" component={ Dashboard } />
        <PrivateRoute exact path="/dashboard/seller" component={ DashboardSeller } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
