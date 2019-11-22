import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NotFound from "./components/NotFound";
import NavBar from "./components/common/NavBar";
import Home from "./components/Home";
import Assets from "./components/Assets";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import AssetForm from "./components/AssetForm";
import "./App.css";
import Profile from "./components/Profile";
import ListEvents from "./components/ListEvents";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const token = localStorage.getItem("idToken");
      const user = jwtDecode(token);

      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    console.log("app render");

    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/assets/new" component={AssetForm}></Route>
            <Route path="/assets" component={Assets}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/list" component={ListEvents}></Route>
            <Route path="/" component={Home}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
