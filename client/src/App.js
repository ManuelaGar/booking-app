import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './booking/Home.js'
import Login from './auth/Login.js'
import Register from './auth/Register.js'
import TopNav from './components/TopNav.js'

function App() {
  return (
    <BrowserRouter>
    <TopNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
