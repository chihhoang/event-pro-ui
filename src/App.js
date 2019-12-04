import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NotFound from "./components/NotFound";
import NavBar from "./components/common/NavBar";
import Home from "./components/Home";
import Admin from "./components/Admin";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import EventForm from "./components/EventForm";
import Profile from "./components/Profile";
import ListEvents from "./components/ListEvents";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from "./redux/store";
import Cart from "./components/Cart";
import PurchaseHistory from "./components/PurchaseHistory";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const token = localStorage.getItem("idToken");
      const user = jwtDecode(token);

      const env = localStorage.getItem("env");
      user.env = env;

      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    console.log("app render");
    store.subscribe(() => console.log(store.getState()));

    return (
        <Provider store={store}>
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/events/new" component={EventForm}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/list" component={ListEvents}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/history" component={PurchaseHistory}></Route>
            <Route path="/" component={Home}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
        </Provider>
    );
  }
}

export default App;
