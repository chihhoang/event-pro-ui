import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as EventService from "../services/EventService";
import * as AuthService from "../services/AuthService";

class Admin extends Component {
  state = {
    events: [],
    currentUser: ""
  };

  async componentDidMount() {
    const { data: events } = await EventService.getEvents();
    const { data: user } = await AuthService.me(
      localStorage.getItem("idToken")
    );

    const currentUser = user.username;

    this.setState({ events, currentUser });
  }

  handleDelete = event => {
    // Call backend to delete
    // EventService.deleteEvent(event.id);

    console.log("Deleting event ", event);
    const events = this.state.events.filter(a => a.id !== event.id);

    this.setState({ events });
  };

  render() {
    const { length: count } = this.state.events;

    if (count === 0) {
      return (
        <React.Fragment>
          <Link to="/events/new">
            <button className="btn btn-primary">New Event</button>
          </Link>
          <p>There is no event in the database</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to="/events/new">
          <button className="btn btn-primary">New Event</button>
        </Link>
        <p>
          Showing <b>{count}</b> events in the database for user{" "}
          <b>{this.state.currentUser}</b>
        </p>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Event Name</th>
              <th>Image</th>
              <th>Total Tickets</th>
              <th>Available Tickets</th>
              <th>Location</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.eventName}</td>
                <td>
                  <a href={event.imageUrl}>
                    <img
                      src={event.imageUrl}
                      width="120"
                      height="70"
                      alt="event"
                    />
                  </a>
                </td>
                <td>{event.totalTickets}</td>
                <td>{event.availableTickets}</td>
                <td>{event.location}</td>
                <td>{event.startTime}</td>
                <td>{event.endTime}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(event)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Admin;
