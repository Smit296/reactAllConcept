import React from "react";
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
    setTimeout(() => {
      this.props.notify({ type: 'success', msg: 'Login Succefully' })
      this.setState(() => ({ toLoginafterRedirect: true }));
    }, 1000);
    // axios({
    //   method: "post",
    //   url: "http://localhost:5000/user/login",
    //   data: {
    //     password: password,
    //     email: email,
    //   },
    // }).then(function (response) {
    //   console.log('Loginnn',response)
    //   localStorage.setItem("token", response.data.token);
    // });

  };

  render() {
    if (this.state.toLoginafterRedirect) {
      return <Redirect to="/" />;
    }

    let { email, password } = this.state;
    return (
      <>
        <div className="loginfull">
          <Container ref={this.props.containerRef}>
            <Row>
              <Col lg={2} md={2} sm={12}></Col>
              <Col lg={8} md={8} sm={12} className="mt-5 mb-3 ml-4">
                <div class="container">
                  <div class="d-flex justify-content-center h-100">
                    <div class="card">
                      <div class="card-header">
                        <h3>Sign In</h3>
                        <div class="d-flex justify-content-end social_icon">
                          <span>
                            <i class="fab fa-facebook-square"></i>
                          </span>
                          <span>
                            <i class="fab fa-google-plus-square"></i>
                          </span>
                          <span>
                            <i class="fab fa-twitter-square"></i>
                          </span>
                        </div>
                      </div>
                      <div class="card-body">
                        <form>
                          <div class="input-group form-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="fas fa-user"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="username"
                              name="email"
                              value={email}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div class="input-group form-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="fas fa-key"></i>
                              </span>
                            </div>
                            <input
                              type="password"
                              class="form-control"
                              placeholder="password"
                              name="password"
                              value={password}
                              onChange={this.handleChange}
                            />
                          </div>

                          <div class="form-group">
                            <input
                              type="submit"
                              value="Login"
                              class="btn float-right login_btn"
                              onClick={this.onSubmit}
                            />
                          </div>
                        </form>
                      </div>
                      <div class="card-footer">
                        <div class="d-flex justify-content-center links">
                          Don't have an account?<a href="#">Sign Up</a>
                        </div>
                        <div class="d-flex justify-content-center">
                          <a href="#">Forgot your password?</a>
                        </div>
                      </div>
                    </div>
                  </div>
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
  return bindActionCreators({ login, notify }, dispatch);
};

export default connect(take, change)(Login);
