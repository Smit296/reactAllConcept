import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

export default class ForgetPasswordForm extends Component {
  render() {
    return (
      <div>
        <h1>Create React Modal with 22 line of code </h1>
        <Popup modal trigger={<button>Click Me</button>}>
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="w-50 mx-auto">
                <form
                  action="/forgot"
                  class="form-group text-center"
                  method="POST"
                >
                  <legend>Forgot Password</legend>
                  <label for="email">Email</label>
                  <input type="email" name="email" autofocus />
                  <Link to="/email">
                    {" "}
                    <input
                      type="submit"
                      class="btn btn-danger transport"
                      value="Reset Password"
                    />
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}
