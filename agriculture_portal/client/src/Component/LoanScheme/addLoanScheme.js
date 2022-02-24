import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
class AddLoanScheme extends React.Component {
  state = {
    show: false,
    schemeName: "",
    interestRate: "",
    maxLimit: "",
    documentRequired: "",
    description: "",
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
    let bankName = this.props.bankName;
    let {
      schemeName,
      interestRate,
      maxLimit,
      documentRequired,
      description,
    } = this.state;
    if (
      !schemeName ||
      !interestRate ||
      !maxLimit ||
      !documentRequired ||
      !description
    ) {
      NotificationManager.error("All field required*");
    } else {
      await axios({
        method: "post",
        url: "/loan_create",
        data: {
          schemeName,
          interestRate,
          maxLimit,
          documentRequired,
          description,
          bankName,
        },
      }).then(function (response) {
        NotificationManager.info("Loan Scheme Added Successfully*");
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
        <Button variant="outline-success" onClick={this.handleShow} size="sm">
          Add Scheme
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className="bg-success"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Your Loan Scheme</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label> Loan Scheme Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Scheme Name Here"
                  name="schemeName"
                  value={this.state.schemeName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Interest Rate</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter interest rate here"
                  name="interestRate"
                  value={this.state.interestRate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Maximum Loan Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Maximun Loan Limit in Lacs"
                  name="maxLimit"
                  value={this.state.maxLimit}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Document Required</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Document required"
                  name="documentRequired"
                  value={this.state.documentRequired}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Brief Description for Scheme</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description Here"
                  name="description"
                  value={this.state.description}
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

export default AddLoanScheme;
