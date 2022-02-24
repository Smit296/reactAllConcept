import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import "react-notifications/lib/notifications.css";

import { NotificationManager } from "react-notifications";
class CreditCardForm extends React.Component {
  state = {
    show: false,
    name: "",
    emailid: "",
    number: "",
    date: "",
    addhar: "",
    place: "",
    bankName: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  //to fill loan form
  hanldeSubmit = async (event) => {
    event.preventDefault();

    let schemeName = "Credit Card";

    let { name, emailid, number, date, addhar, place, bankName } = this.state;
    if (
      !name ||
      !emailid ||
      !number ||
      !date ||
      !addhar ||
      !place ||
      !bankName
    ) {
      NotificationManager.warning("All field required*");
    } else {
      await axios({
        method: "post",
        url: "/farmer_create",
        data: {
          name,
          emailid,
          number,
          date,
          addhar,
          place,
          bankName,
          schemeName,
        },
      }).then(function (response) {
        NotificationManager.info("Applied Successfully");
      });

      setTimeout(() => {
        this.setState({
          show: false,
        });
      }, 2000);
    }
  };
  render() {
    return (
      <>
        <a onClick={this.handleShow}>
          {" "}
          <span style={{ color: "#28ca2f" }}>Apply here for card </span>{" "}
        </a>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className="bg-success"
        >
          <Modal.Header closeButton>
            <Modal.Title>Now Get Credit Card in Easy Way</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Enter Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name Here"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Addhar Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Aadhar number"
                  name="addhar"
                  value={this.state.addhar}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email id"
                  name="emailid"
                  value={this.state.emailid}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Mobile Number"
                  name="number"
                  value={this.state.number}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Choose Appointment</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Choose Date"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Your Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  name="place"
                  value={this.state.place}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bank You want to Apply For</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bank Name"
                  name="bankName"
                  value={this.state.bankName}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={this.hanldeSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CreditCardForm;
