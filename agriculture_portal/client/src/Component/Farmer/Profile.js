import React, { Component } from "react";
import "../../Css/profile.css";
import { Image, Nav, Button } from "react-bootstrap";
import YourProduct from "./YourProduct";
import Purchased from "./Purchased";
import Sold from "./Sold";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/notification";
import User from "../../ActionCreater/user";

const { notify } = Action;
const { join } = User;

class Profile extends Component {

  componentDidMount() {
    this.props.join(this.props.id);
  }

  render() {
    const { notify, name, email, dob, mobile, img, type, address } = this.props;

    return (
      <>
        <div class="d-flex flex-column ">
          <div class="d-flex flex-fill justify-content-center flex-wrap m-5 flex-row">
            <div class="my-auto profile-img mr-md-5">
              <Image className="shadow" src={img} width="300vh" rounded />
              <div className="text-center">
                <Link to="/profile-edit">
                  <Button
                    className="btn-1 mt-3 mr-1"
                    onClick={() =>
                      notify({ type: "info", msg: "Edit Profile" })
                    }
                    variant="secondary"
                    size="sm">
                    Edit Profile
                  </Button>
                </Link>
                {(type === "Seller") ?
                  <Link to="/company-register">
                    <Button
                      className="btn-1 mt-3 ml-1"
                      onClick={() =>
                        notify({ type: "success", msg: "Edit Company" })
                      }
                      variant="secondary"
                      size="sm">
                      Edit Company
                </Button>
                  </Link>
                  : ""}

              </div>
            </div>
            <div class="d-flex flex-column justify-content-start ml-md-5">
              <h1 className='mb-0' style={{ 'font-weight': '500' }}>{name}</h1>
              <p className='pl-2'>{type}</p>
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone: </th>
                    <td>{mobile}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address: </th>
                    <td>{address.address}<br />{address.district} {address.city} {address.pincode}<br /> {address.state} {address.country}</td>
                  </tr>
                  {/* <tr>
                    <th scope="row">Gender: </th>
                    <td>Male</td>
                  </tr> */}
                  <tr>
                    <th scope="row">Birthday: </th>
                    <td>{dob}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div class="d-flex flex-column box4 justify-content-end">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">Occupation: </th>
                    <td>{type}</td>
                  </tr>
                  <tr>
                    <th scope="row">Types:</th>
                    <td>
                      Onion
                      <br />
                      Cucumber
                      <br />
                      Tomato
                      <br />
                      Spices
                      <br />
                      Brinjal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
          <Nav
            variant="tabs"
            className="justify-content-center">
            {(type === "Seller" || type === "Farmer") ?
              <Link to="/profile/product">
                <Nav.Item>
                  <Nav.Link href="/profile">Your Products</Nav.Link>
                </Nav.Item>
              </Link> : ""}
            {(type === "Consumer" || type === "Farmer") ?
              <Link to="/profile/purchased">
                <Nav.Item>
                  <Nav.Link href="/profile/purchased">Purchased</Nav.Link>
                </Nav.Item>
              </Link> : ""}
            {(type === "Seller" || type === "Farmer") ?
              <Link to="/profile/sold">
                <Nav.Item>
                  <Nav.Link href="/profile/sold">Sold</Nav.Link>
                </Nav.Item>
              </Link> : ""}
          </Nav>
          <Route exact path="/profile/product">
            <YourProduct />
          </Route>
          <Route path="/profile/purchased">
            <Purchased />
          </Route>
          <Route path="/profile/sold">
            <Sold />
          </Route>
        </div>
      </>
    );
  }
}

const take = (state) => {
  const { name, email, mobile, img, dob, id, type, addressId } = state.user.currentUser
  let address = {
    address: "Not Filled",
    district: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  };
  if (addressId && state.user.currentUser.address)
    address = state.user.currentUser.address
  return {
    name, email, mobile, img, id, address, type, dob
  };
};

const change = (dispatch) => {
  return bindActionCreators({ notify, join }, dispatch);
};

export default connect(take, change)(Profile);
