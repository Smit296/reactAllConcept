import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Container, Button, Spinner } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";
import Action from "../../ActionCreater/user";
import Notify from "../../ActionCreater/notification";
import Data from '../../Data/states'
import { Link } from "react-router-dom";
import bsCustomFileInput from 'bs-custom-file-input'
import { set } from "mongoose";


const { profileEdit } = Action;
// const { notify } = Notify;

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      dob: "",
      type: "",
      img: "",
      address: "",
      city: "",
      state: "Choose State....",
      district: "",
      pincode: "",
      img: "",
      statelist: Data.states,
      result: [],
      cityfetch: [],
      districtfetch: [],
      todashboardredirect: false,
      upload: true,
    };

    this.handleChange = this.handleChange.bind();
    this.onSubmit = this.onSubmit.bind();
    this.handlestate = this.handlestate.bind();
    this.uploadImage = this.uploadImage.bind();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let {
      name,
      email,
      mobile,
      dob,
      type,
      img,
      address,
      city,
      state,
      district,
      pincode,
    } = this.state;
    this.props.profileEdit({ name, email, mobile, dob, type, img },
      { address, city, state, district, pincode }, this.props.id, this.props.addressId);

    setTimeout(() => {
      this.setState(() => ({ todashboardredirect: true }));
    }, 1000);
  };

  // For image upload on clodinary
  uploadImage = async e => {
    this.setState({
      upload: false
    })
    const files = e.target.files;
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sitanshu')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/drr1rnoxf/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json();
    if (file) {
      this.setState({
        img: file.secure_url,
        upload: true
      })
      console.log(file.secure_url)
    }
  }

  //state update
  handlestate = (e) => {
    const value = e.target.value;
    this.setState({
      cityfetch: [],
      districtfetch: [],
    });
    var url = `https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${value.toString()}`;
    var citylist = fetch(url);
    citylist.then((res) => {
      res.json().then((res) => {
        this.setState({
          result: res,
        });
        var array1 = [];
        var array2 = [];
        for (var i = 0; i < res.length; i++) {
          if (res[i].State === value.toString()) {
            array1.push(res[i].City);
            array2.push(res[i].District);
          }
        }
        this.setState({
          cityfetch: array1,
          districtfetch: array2,
          city: array1[0],
          district: array2[0],
        });
      });
    });

    this.handleChange(e);
  };

  componentDidMount() {
    bsCustomFileInput.init()
    this.setState({
      name: this.props.name,
      email: this.props.email,
      mobile: this.props.mobile,
      dob: this.props.dob,
      type: this.props.type,
      img: this.props.img,
      address: this.props.address.address,
      state: this.props.address.state,
      city: this.props.address.city,
      district: this.props.address.district,
      pincode: this.props.address.pincode
    })
  }

  render() {
    if (this.state.todashboardredirect) {
      return <Redirect to="/profile" />;
    }

    return (
      <>
        <Container>
          <Row>
            <Col lg={2} md={2} sm={12}></Col>
            <Col lg={8} md={8} sm={12} className="mt-3 mb-3">
              <div className="    shadow-lg  ">
                <div className="card-body">
                  <h2 className="text-center mb-3">

                    Edit <span style={{ color: "#28ca2f" }}>Profile</span>
                  </h2>

                  <Form>
                    <Form.Group as={Row}>
                      <Form.Label column lg="3" sm="3">
                        Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Edit Name Here"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Email
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control type="email"
                          name="email"
                          placeholder="Edit Email"
                          value={this.state.email}
                          onChange={this.handleChange} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Contact Number
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="number"
                          name="mobile"
                          placeholder="Edit Contact Number"
                          value={this.state.mobile}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Password
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Edit Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formGridType">
                      <Form.Label column sm="3">Profile Type</Form.Label>
                      <Col sm="9">
                        <Form.Control
                          as="select"
                          name="type"
                          value={this.state.type}
                          onChange={this.handleChange}>
                          <option value="Farmer" selected>Farmer</option>
                          <option value="Seller">Seller</option>
                          <option value="Consumer">Consumer</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column lg="3" sm="3">
                        Date of Birth
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="date"
                          name="dob"
                          value={this.state.dob}
                          onChange={this.handleChange} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column lg="3" sm="3">
                        Profile Photo
                      </Form.Label>
                      <Col sm="9">
                        <Form>
                          <Form.File
                            type="file"
                            label="Upload Profile Photo"
                            custom
                            onChange={this.uploadImage}
                          />
                        </Form>
                      </Col>
                    </Form.Group>
                    <div>
                      <span>
                        Edit Address Detail <FaHome />
                        <hr></hr>
                      </span>
                      <Form.Group as={Row}>
                        <Form.Label column sm="3">
                          Address
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="text"
                            placeholder="1234 Main St"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            as="select"
                            name="state"
                            value={this.state.state}
                            onChange={this.handlestate}

                          >
                            {this.state.statelist.map((option) => {
                              return (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>City </Form.Label>
                          <Form.Control
                            as="select"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                          >
                            {this.state.cityfetch.map((option, id) => {
                              return (
                                <option
                                  key={option + id}
                                  value={option}
                                  label={option}
                                >
                                  {option}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridDistrict">
                          <Form.Label>District</Form.Label>
                          <Form.Control
                            as="select"
                            name="district"
                            value={this.state.district}
                            onChange={this.handleChange}
                          >
                            {this.state.districtfetch.map((option, id) => {
                              return (
                                <option key={option + id} value={option}>
                                  {option}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>Zip</Form.Label>
                          <Form.Control type="number"
                            name="pincode"
                            placeholder="Pincode"
                            value={this.state.pincode}
                            onChange={this.handleChange} />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridStae">
                          <div class="text-center">
                            <Link to='/profile'>
                              <Button className="btn btn-secondary">
                                Cancel
                              </Button>
                            </Link>
                          </div>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridS">
                          <div class="text-center">
                            {(this.state.upload) ?
                              <Button className="btn btn-success"
                                onClick={this.onSubmit}>
                                Update Now
                              </Button> :
                              <Button variant="success" disabled>
                                <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                               Loading...
                             </Button>}

                          </div>
                        </Form.Group>
                      </Form.Row>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
            <Col lg={2} md={2} sm={12}></Col>
          </Row>
        </Container>

      </>
    );
  }
}

const take = (state) => {
  const { id, name, email, password, dob, mobile, type, img, addressId } = state.user.currentUser
  let address = {
    address: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
  };
  if (addressId && state.user.currentUser.address)
    address = state.user.currentUser.address
  return {
    id, name, email, password, dob, mobile, type, img, address
  };
};

const change = (dispatch) => {
  return bindActionCreators({ profileEdit }, dispatch);
};

export default connect(take, change)(ProfileEdit);