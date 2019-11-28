import React, { Component } from "react";
import { post } from "axios";
import { endPoint } from "../config.json";

class Event extends Component {
  state = {
    file: null,
    description: "",
    eventName: "",
    totalTickets: 200,
    ticketPrice: 9.99
  };

  onFormSubmit = e => {
    e.preventDefault();

    this.fileUpload(this.state.file).then(response => {
      console.log(response);
    });
  };

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  onTextChange = ({ currentTarget: input }) => {
    const state = { ...this.state };

    state[input.name] = input.value; // passed from name element in input
    this.setState({ state });
  };

  fileUpload(file) {
    const url = endPoint + "/events";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", this.description.value);
    formData.append("eventName", this.eventName.value);
    formData.append("totalTickets", this.totalTickets);
    formData.append("ticketPrice", this.ticketPrice);
    // TODO pass start and end date
    // formData.append("startTime", 2019-11-21T18:00:00.616Z);
    // formData.append("endTime", 2019-11-21T18:00:00.616Z);

    console.log(formData);

    const token = localStorage.getItem("idToken");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data"
      }
    };

    return post(url, formData, config).then(
      res => {
        window.location = "/events";
      },
      error => {
        alert("File Upload Failed");
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />

        <input
          ref={ref => {
            this.description = ref;
          }}
          onChange={this.onTextChange}
          name="description"
          id="description"
          type="text"
          placeholder="Enter description"
          className="form-control"
        />
        <input
          ref={ref => {
            this.eventName = ref;
          }}
          onChange={this.onTextChange}
          name="eventNamen"
          id="eventName"
          type="text"
          placeholder="Enter Event Name"
          className="form-control"
        />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default Event;
