import React, { Component } from "react";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import Paypal from "./integration";
import { connect } from "react-redux";
import GPayButton from "react-google-pay-button";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";
import { Link } from "react-router-dom";

const { placeOrder } = Action;

class Billing extends React.Component {
  state = {
    totalPrice: 0,
  };
  componentDidMount = () => {
    var total = 0;
    for (var i = 0; i < this.props.products.length; i++) {
      if (this.props.products[i].connectType === "booked" && (this.props.products[i].status === false && this.props.products[i].cart > 0)) {
        total += parseInt(this.props.products[i].product.price) * parseInt(this.props.products[i].cart);
      }
    }
    this.setState({
      totalPrice: total,
    });
  };

  submitForm = () => {
    let idies = []
    for (var i = 0; i < this.props.products.length; i++)
      if (this.props.products[i].connectType === "booked" && (this.props.products[i].status === false && this.props.products[i].cart > 0))
        idies.push(this.props.products[i].id);
    this.props.placeOrder(this.props.user.id, idies,this.props.user.email)
  }

  render() {
    const { cart, user } = this.props;
    let paypal, googlepay;
    if (this.state.totalPrice > 0) {
      paypal = <Paypal price={this.state.totalPrice} />;
      googlepay = (
        <GPayButton
          totalPriceStatus={"FINAL"}
          totalPrice={"1100"}
          currencyCode={"INR"}
          countryCode={"IN"}
          development={true}
        />
      );
    }
    return (
      <div>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="shadow-lg w-75 ml-5 mt-3 mb-3">
              <div className="card-body">
                <h4 className="text-center mb-3">
                  <span style={{ color: "#28ca2f" }}>
                    {" "}
                    Add Personal Details
                  </span>
                </h4>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column lg="4" sm="3">
                      Name
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="text"
                        placeholder={user.name}
                        name="name"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column lg="4" sm="3">
                      GST Number
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="email"
                        placeholder={user.email}
                        name="Email"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column lg="4" sm="3">
                      Mobile Here
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="number"
                        placeholder={user.mobile}
                        name="company_type"
                      />
                    </Col>
                  </Form.Group>
                  <div>
                    <span>
                      Address Detail
                      <hr></hr>
                    </span>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Address
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          placeholder="Enter Home ,Street"
                          name="address"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City"
                          name="city"
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>District </Form.Label>
                        <Form.Control
                          type="text"
                          name="company_city"
                        ></Form.Control>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="company_city"
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="400008"
                          name="company_pincode"
                        />
                      </Form.Group>
                    </Form.Row>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="shadow-lg w-75   mt-3 mb-3">
              <div className="card-body">
                <h4 className="text-center mb-3">
                  <span style={{ color: "#28ca2f" }}> Item Added</span>
                </h4>
                <Row>
                  <Table
                    striped
                    borderless
                    responsive
                    hover
                    size="sm"
                    className="text-center"
                  >
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    <tbody className="text-center">
                      {this.props.products &&
                        this.props.products.map((item, index) => {
                          if (item.connectType === "booked" && (item.status === false && item.cart > 0)) {
                            let product = item.product
                            return (
                              <>
                                <tr key={index}>
                                  <td>{product.productName}</td>
                                  <td>{item.cart}</td>
                                  <td>₹ {parseInt(product.price) * item.cart}</td>
                                </tr>
                              </>
                            );
                          }
                        })}
                    </tbody>
                  </Table>
                  <h4 className="text-center mb-3">
                    <span style={{ color: "#28ca2f" }}>
                      Total Price- {this.state.totalPrice}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <Col>{paypal}</Col>
                  <Col>{googlepay} </Col>
                </Row>
              </div>
            </div>
            <Link to="/thankyou">
              {" "}
              <Button variant="outline-success" onClick={this.submitForm}>Complete Order</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // cart: state.productList.cart,
    products: state.user.currentUser.connect_products,
    user: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ placeOrder }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
