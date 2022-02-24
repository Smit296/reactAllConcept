import React, { Component } from "react";

export default class Thankyou extends Component {
  render() {
    return (
      <>
        <div class="jumbotron text-center">
          <h1 class="display-3">Thank You For Shoping With Us!</h1>
          <p class="lead">
            <strong>Please check your email</strong> for getting details of
            orderd items
          </p>
          <hr />
          <p>
            Having trouble? <a href="/">Contact us</a>
          </p>
        </div>
      </>
    );
  }
}
