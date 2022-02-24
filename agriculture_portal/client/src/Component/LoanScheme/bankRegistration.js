import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default class BankRegistration extends React.Component {
  state = {
    show: false,
    show1: false,
    bankName: "",
    registrationNumber: "",
    emailid: "",
    password: "",
    number: "",
    bankLogin: false,
  };
  handleChange = async (e) => {
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
  handleClose1 = () => {
    this.setState({
      show1: false,
    });
  };
  handleShow1 = () => {
    this.setState({
      show1: true,
    });
  };
  //to fill loan form
  hanldeSubmit = async (event) => {
    event.preventDefault();
    let flag = false;
    let {
      bankName,
      registrationNumber,
      emailid,
      password,
      number,
    } = this.state;
    await axios({
      method: "post",
      url: "/bank_check",
      data: {
        bankName,
      },
    }).then((response) => {
      if (response.data.flag) {
        flag = true;
      }
    });
    if (flag) {
      NotificationManager.error("YourBank Already Registered*");
      setTimeout(() => {
        this.setState({
          show: false,
          bankName: "",
          registrationNumber: "",
          emailid: "",
          password: "",
          number: "",
          show1: true,
        });
      }, 2000);
    } else if (
      !bankName ||
      !registrationNumber ||
      !emailid ||
      !password ||
      !number
    ) {
      NotificationManager.warning("All field required*");
    } else {
      await axios({
        method: "post",
        url: "/bank_create",
        data: {
          bankName,
          registrationNumber,
          emailid,
          password,
          number,
        },
      }).then(function (response) {
        NotificationManager.info("Applied Successfully");
      });

      setTimeout(() => {
        this.setState({
          show: false,
          bankName: "",
          registrationNumber: "",
          emailid: "",
          password: "",
          number: "",
        });
      }, 2000);
    }
  };
  handleLogin = async (e) => {
    var flag = false;
    let user = {};
    let { emailid, password } = this.state;

    if (!emailid || !password) {
      NotificationManager.error("All field required*");
    } else {
      await axios({
        method: "post",
        url: "/bank_login",
        data: {
          emailid,
          password,
        },
      }).then(function (response) {
        if (response.data.flag) {
          flag = true;
          user = response.data.user;
        }
      });
      if (flag) {
        NotificationManager.info("LoggedIn Successfully");
        this.props.getBankLoginStatus(true, user);
        setTimeout(() => {
          this.setState({
            show1: false,
            emailid: "",
            bankLogin: true,
          });
        }, 2000);
      } else {
        NotificationManager.warning("Invalid Credentials");
      }
    }
  };
  render() {
    return (
      <>
        <Button
          variant="outline-success"
          onClick={this.handleShow}
          className="m-3"
        >
          Register Here as Bank
        </Button>
        <Button
          variant="outline-success"
          onClick={this.handleShow1}
          className="m-3"
        >
          Login Here
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className="bg-success"
        >
          <Modal.Header closeButton>
            <Modal.Title>Join Agricom As Bank Partner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name Here"
                  name="bankName"
                  value={this.state.bankName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bank Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Registration Number "
                  name="registrationNumber"
                  value={this.state.registrationNumber}
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
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Contact Number"
                  name="number"
                  value={this.state.number}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Choose Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Choose Password"
                  name="password"
                  value={this.state.password}
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
              Register
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.show1} onHide={this.handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Login As Bank Partner </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder=" Enter Email"
                  name="emailid"
                  value={this.state.emailid}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=" Enter Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={this.handleLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
