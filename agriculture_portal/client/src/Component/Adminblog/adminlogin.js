import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
class Adminlogin extends React.Component {
  state = {
    show: false,
    email: "",
    password: "",
    adminlogin: false,
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
  //to create bolg action
  hanldeSubmit = async (event) => {
    var result;
    event.preventDefault();
    let { email, password } = this.state;
    await axios({
      method: "post",
      url: "/adminlogin",
      data: {
        email,
        password,
      },
    }).then(function (response) {
      if (response.data.flag) result = true;
    });

    if (result) {
      this.props.dispatch({
        type: "adminlogin",
        payload: true,
      });
    }
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <>
        <Button variant="outline-warning" onClick={this.handleShow}>
          Login Here To Add Article
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
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
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={this.hanldeSubmit}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogState.blogList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adminlogin);
