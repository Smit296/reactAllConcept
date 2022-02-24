import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import "../../Css/signup.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";
import Action from "../../ActionCreater/user";
import Notify from "../../ActionCreater/notification";

const { register } = Action;
const { notify } = Notify;

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      cpassword: "",
      mobile: "",
      name: "",
      role: "",
      toLoginRedirect: false,
    };
    this.handleChange = this.handleChange.bind();
    this.onSubmit = this.onSubmit.bind();
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let { email, password, name, mobile, role } = this.state;
    this.props.register({
      email,
      password,
      mobile,
      name,
      type: role,
    });
    // axios({
    //   method: "post",
    //   url: "http://localhost:5000/user/",
    //   data: {
    //     name: name,
    //     password: password,
    //     email: email,
    //     mobile: mobile,
    //     type: role,
    //   },
    // }).then(function (response) { });

    setTimeout(() => {
      this.props.notify({ type: 'success', msg: 'Register Succefully' })
      this.setState(() => ({ toLoginRedirect: true }));
    }, 1000);
  };

  render() {
    if (this.state.toLoginRedirect) {
      return <Redirect to="/login" />;
    }

    const { register } = this.props;
    return (
      <>
        <div className="loginfull">
          <Container ref={this.props.containerRef}>
            <Row>
              <Col lg={2} md={2} sm={12}></Col>
              <Col
                lg={8}
                md={8}
                sm={12}
                className=" w-50 mt-5 mb-3 justify-content-center"
              >
                <div className="card1">
                  <article class="card-body ">
                    <h4 class="card-title mt-3 text-center">
                      <span style={{ color: "#28ca2f" }}>Create Account</span>
                    </h4>

                    <form>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">

                            <i class="fa fa-user"></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          placeholder="Full name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">

                            <i class="fa fa-envelope"></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          placeholder="Email address"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">

                            <i class="fa fa-phone"></i>
                          </span>
                        </div>

                        <input
                          class="form-control"
                          placeholder="Phone number"
                          type="number"
                          name="mobile"
                          value={this.state.mobile}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">

                            <i class="fa fa-building"></i>
                          </span>
                        </div>
                        <select
                          class="form-control"
                          name='role'
                          onChange={this.handleChange}
                          value={this.state.role}
                        >
                          <option selected=""> Select job type</option>
                          <option>Farmer</option>
                          <option>Seller</option>
                          <option>Customer</option>
                        </select>
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">

                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          placeholder="Create password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">

                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                        <input
                          class="form-control"
                          placeholder="Repeat password"
                          type="password"
                          name="cpassword"
                          value={this.state.cpassword}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group">
                        <Button
                          variant="outline-success align-center"
                          onClick={this.onSubmit}
                        >

                          Create Account
                        </Button>
                      </div>
                    </form>
                  </article>
                </div>
              </Col>
              <Col lg={2} md={2} sm={12}></Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const take = (state) => {
  return state;
};

const change = (dispatch) => {
  return bindActionCreators({ register, notify }, dispatch);
};

export default connect(take, change)(Signup);
