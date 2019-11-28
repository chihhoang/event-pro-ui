import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import * as UserService from "../services/UserService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      roles: ["ROLE_USER"],
      activated: true
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    firstName: Joi.string(),
    lastName: Joi.string(),
    roles: {},
    activated: true
  };

  doSubmit = async () => {
    console.log("handle submit by calling register API");

    // call register API
    try {
      const { data: response } = await UserService.register(this.state.data);

      localStorage.setItem("idToken", response.idToken);

      // this.props.history.push("/assets");
      window.location = "/assets";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert("Error register this user");
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "Enter username")}
          {this.renderInput("password", "Password", "password", "Password")}
          {this.renderInput("email", "Email", "email", "Email")}
          {this.renderInput("firstName", "First Name", "text", "First Name")}
          {this.renderInput("lastName", "Last Name", "text", "Last Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
