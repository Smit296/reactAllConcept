import React from "react";
import Google from '../Google/login';
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import "../../Css/loginpage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";
import Notify from "../../ActionCreater/notification";
import { Redirect } from "react-router";

const { login } = Action;
const { notify } = Notify;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      toLoginafterRedirect: false,
    };
    this.handleChange = this.handleChange.bind();
    this.onSubmit = this.onSubmit.bind();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    this.props.login({
      email,
      password,
    });
  };

  componentDidMount() {
    if (this.props.Auth) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Auth) {
      this.props.notify({ type: 'success', msg: 'Login Succefully' })
      this.props.history.push("/");
    }
  }
  render() {
    if (this.state.toLoginafterRedirect) {
      return <Redirect to="/profile" />;
    }

    let { emailError, passwordError } = this.props;

    return (
      <>
        <div className="loginfull d-flex justify-content-center p-5 w-md-50">
          <Form className='shadow p-5 bg-light rounded text-center'>
            <h2 className="text-center mb-2">Login</h2>
            <div className="m-3">
              <Google />
            </div>
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
  const { email: emailError, password: passwordError } = state.formError;
  return {
    emailError, passwordError, Auth: state.user.Authenticated
  }
};

const change = (dispatch) => {
  return bindActionCreators({ login, notify }, dispatch);
};

export default connect(take, change)(Login);
