import React from "react";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import "../../Css/loginpage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";
import Notify from "../../ActionCreater/notification";
import { Redirect } from "react-router";

const { register } = Action;
const { notify } = Notify;

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      mobile: "",
      name: "",
      type: "Farmer",
      toLoginafterRedirect: false,
    };
    this.handleChange = this.handleChange.bind();
    this.onSubmit = this.onSubmit.bind();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    },() => {console.log(this.state)});
    
  };

  onSubmit = (event) => {
    event.preventDefault();
    let { email, password, password2, name, mobile, type } = this.state;
    this.props.register({
      email,
      password,
      password2,
      mobile,
      name,
      type,
    });
  };

  componentDidMount() {
    if (this.props.Auth) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Registered) {
      this.props.notify({ type: 'success', msg: 'Register Succefully' })
      this.props.history.push("/login");
    }
    if (nextProps.Auth) {
      this.props.history.push("/");
    }
  }
  render() {
    if (this.state.toLoginafterRedirect) {
      return <Redirect to="/login" />;
    }

    let { emailError, passwordError, password2Error, mobileError, nameError } = this.props;

    return (
      <>
        <div className="loginfull d-flex justify-content-center p-5">
          <Form className='shadow p-5 bg-light rounded text-center '>
            <h2 className="text-center mb-2">Register</h2>
            <div className="d-flex flex-wrap content justify-content-around">
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  isInvalid={!!nameError}
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange} />
                <Form.Control.Feedback type="invalid">
                  {nameError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  isInvalid={!!emailError}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange} />
                <Form.Control.Feedback type="invalid">
                  {emailError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  isInvalid={!!mobileError}
                  name="mobile"
                  value={this.state.mobile}
                  onChange={this.handleChange} />
                <Form.Control.Feedback type="invalid">
                  {mobileError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="profile-type-btn flex-grow-1" controlId="formGridType">
                <Form.Label >Profile Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleChange}>
                  <option value="Farmer" selected>Farmer</option>
                  <option value="Seller">Seller</option>
                  <option value="Consumer">Consumer</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  isInvalid={!!passwordError}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange} />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  isInvalid={!!password2Error}
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleChange} />
                <Form.Control.Feedback type="invalid">
                  {password2Error}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Button variant="success" className="text-center" type="button" onClick={this.onSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </>
    );
  }
}


const take = (state) => {
  const { email: emailError,
    password: passwordError,
    password2: password2Error,
    mobile: mobileError,
    name: nameError,
    registered
  } = state.formError;
  return {
    emailError, passwordError, password2Error, mobileError, nameError, Registered: registered, Auth: state.user.Authenticated
  }
};

const change = (dispatch) => {
  return bindActionCreators({ register, notify }, dispatch);
};

export default connect(take, change)(Register);
