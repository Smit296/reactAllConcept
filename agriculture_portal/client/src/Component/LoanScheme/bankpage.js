import React, { Component } from "react";
import {
  Image,
  ButtonGroup,
  Dropdown,
  Button,
  Jumbotron,
} from "react-bootstrap";
import BankRegistration from "./bankRegistration";
import BankDashboard from "./bankDashboard";
export default class extends Component {
  state = {
    isBankLoggedIn: false,
    user: {},
  };
  render() {
    return (
      <>
        {this.state.isBankLoggedIn && <BankDashboard user={this.state.user} />}
        {!this.state.isBankLoggedIn && (
          <Jumbotron className="Blog text-center mb-0 mt-2">
            <h3 className="mb-4 text-center">
              <span style={{ color: "#28ca2f" }}>Participating</span> Banks
            </h3>
            <div class="d-flex justify-content-around mt-5">
              <Image
                src="https://stylewhack.com/wp-content/uploads/2019/09/SBI-Logo-Over-The-Years.png"
                roundedCircle
                style={{ width: "6rem", height: "6rem" }}
              />
              <Image
                src="https://www.freshersvoice.com/wp-content/uploads/2017/03/Axis-Bank-Recruitment.png"
                roundedCircle
                style={{ width: "6rem", height: "6rem" }}
              />
              <Image
                src="https://static.toiimg.com/thumb/msid-74887573,imgsize-66932,width-400,resizemode-4/74887573.jpg"
                roundedCircle
                style={{ width: "6rem", height: "6rem" }}
              />
            </div>
            <div class="d-flex justify-content-around mt-5">
              <Image
                src="https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1502747159/xk3paka1tlsxljjzbv0y.png"
                roundedCircle
                style={{ width: "6rem", height: "6rem" }}
              />
              <Image
                src="https://www.kotak.com/content/dam/Kotak/kotak-bank-logo.jpg"
                roundedCircle
                style={{ width: "6rem", height: "6rem" }}
              />
              <Image
                src="https://www.freshersnow.com/wp-content/uploads/2018/12/Bank-of-Baroda-Recruitment.png"
                roundedCircle
                style={{ width: "6rem", height: "6rem" }}
              />
            </div>

            <div class="d-flex justify-content-center">
              <BankRegistration
                getBankLoginStatus={(isBankLoggedIn, user) => {
                  this.setState({ isBankLoggedIn: isBankLoggedIn, user: user });
                }}
              />
            </div>
          </Jumbotron>
        )}
      </>
    );
  }
}
