import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import HttpService from "../services/HttpService";
import { endPoint } from "../config.json";
import EventDescriptionPage from "../components/EventDescriptionPage";

export default class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventData: [],
      username: ""
    };
  }
  async componentDidMount() {
    HttpService.get(endPoint + "/events/list").then(res => {
      this.setState({ EventData: res.data });
    });
  }

  render() {
    return (
      <div>
        <Container>
          <br />
          <h2>List Of Events</h2>
          <br />
          <Table striped bordered hover size="xl">
            <thead class="table-success">
              <tr>
                <th>Event StartDate</th>
                 <th>Event EndDate</th>
                <th>Event Name</th>
                <th>Event Location</th>
              </tr>
            </thead>
            <tbody>
              {this.state.EventData.map(EventData => (
                <tr key={EventData.id}>
                  <td>
                    {new Date(EventData.startTime).toLocaleString("en-US")} 
                  </td>
                  <td>
                    {new Date(EventData.endTime).toLocaleString("en-US")}
                  </td>
                  <td>
                    <EventDescriptionPage
                      name={EventData.eventName}
                      imageUrl={EventData.imageUrl}
                      description={EventData.description}
                      ticketsAvailable={EventData.availableTickets}
                      ticketPrice={EventData.ticketPrice}
                      eventId={EventData.id}
                      eventRecord={EventData}
                    />
                    <img src={EventData.imageUrl} width="120"
                      height="70"/>
                  </td>
                  <td>{EventData.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
