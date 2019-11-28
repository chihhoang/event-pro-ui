import React from "react";
import Form from "./common/Form";
import Event from "./Event";

class EventForm extends Form {
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

  doSubmit() {
    // call register API
    console.log("handle submit by calling register API");
  }

  render() {
    return (
      <div>
        <Event />
      </div>
    );
  }
}

export default EventForm;
