import React, { Component } from "react";
import { post } from "axios";
import { endPoint } from "../config.json";
import { Form, Input, Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import HttpService from "../services/HttpService";

const { RangePicker } = DatePicker;

class Event extends Component {
  state = {
    file: null,
    description: "",
    eventName: "",
    totalTickets: 200,
    ticketPrice: 9.99
  };

  handleSubmit = e => {
    e.preventDefault();
    const url = endPoint + "/events";

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      console.log("rangeVal", rangeValue)
      const values = {
        ...fieldsValue,
        'startTime': rangeValue[0],
        'endTime': rangeValue[1]
      };
      console.log(typeof values.startTime);
      console.log('Received values of form: ', values);
      const token = localStorage.getItem("idToken");
      console.log('token ', token);
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "multipart/form-data"
        }
      };
  
      let data = new FormData();
      data.append('file', this.state.file);
      data.append('eventName', values.eventName);
      data.append('description', values.description);
      data.append('totalTickets', values.totalTickets);
      data.append('ticketPrice', values.ticketPrice);
      data.append('startTime', values.startTime);
      data.append('endTime', values.endTime);
      HttpService.post(endPoint + "/events", data, config).then(res => {
        console.log("res", res);
        alert("Hurray! Event is created");
      },
      error => {
        alert("Sorry! Event is not created");
      }
      );
      
    });
  };

  // fileUpload(file) {
  //   const url = endPoint + "/events";

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("description", this.description.value);
  //   formData.append("eventName", this.eventName.value);
  //   formData.append("totalTickets", this.totalTickets);
  //   formData.append("ticketPrice", this.ticketPrice);
  //   // TODO pass start and end date
  //   // formData.append("startTime", 2019-11-21T18:00:00.616Z);
  //   // formData.append("endTime", 2019-11-21T18:00:00.616Z);

  //   console.log(formData);

  //   const token = localStorage.getItem("idToken");

  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //       "content-type": "multipart/form-data"
  //     }
  //   };


  //   return post(url, formData, config).then(
  //     res => {
  //       window.location = "/events";
  //     },
  //     error => {
  //       alert("File Upload Failed");
  //     }
  //   );
  // }

  changeFile(e) {
    this.setState({
      file: e.target.files[0]
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };
    return (
            <Form className="booking-form" onSubmit={this.handleSubmit}>
              <Form.Item label="Event image">
                {getFieldDecorator('inputFile', {
                rules: [
                  {
                    required: true,
                    message: 'Please upload a file!',
                  },
                ],
                })(<Input type="file" onChange={this.changeFile.bind(this)}/>)}
              </Form.Item>

              <Form.Item label="Event Name">
                {getFieldDecorator('eventName', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter event name',
                  },
                ],
                })(<Input type="text"/>)}
              </Form.Item>

              <Form.Item label="Description">
                {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter description',
                  },
                ],
                })(<Input type="text"/>)}
              </Form.Item>
              <Form.Item label="Total tickets">
                {getFieldDecorator('totalTickets', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter total tickets',
                  },
                ],
                })(<Input type="number"/>)}
              </Form.Item>
              <Form.Item label="Ticket price">
                {getFieldDecorator('ticketPrice', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter price',
                  },
                ],
                })(<Input type="number"/>)}
              </Form.Item>
              <Form.Item label="Select Events Dates" >
                {getFieldDecorator('range-picker', rangeConfig)(<RangePicker  showTime={{ format: 'HH:mm' }} />)}
              </Form.Item>
             <Button variant="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
    );
  }
}

const WrappedEvent= Form.create({ name: 'create_event_form' })(Event);
export default WrappedEvent;
//export default Event;
