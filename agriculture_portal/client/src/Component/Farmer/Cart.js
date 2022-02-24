import React from "react";
import "../../Css/profile.css";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/notification";
import { Link } from "react-router-dom";
import User from "../../ActionCreater/user";

const { notify } = Action;
const { join, addCart, minusCount, removeCart } = User;

class Profile extends React.Component {

  constructor() {
    super();
    this.addToCart = this.addToCart.bind();
    this.countMinus = this.countMinus.bind();
    this.removeCart = this.removeCart.bind();
  }

  componentDidMount() {
    this.props.join(this.props.id);
  }

  countMinus = (productId) => {
    if (this.props.id) {
      this.props.minusCount(this.props.id, productId)
    }
  }

  addToCart = (productId) => {
    if (this.props.id) {
      this.props.addCart(this.props.id, productId)
    }
  };

  removeCart = (productId) => {
    if (this.props.id) {
      this.props.removeCart(this.props.id, productId)
    }
  };
  // increaseProduct = () => {
  //   this.setState({
  //     productCount: this.state.productCount + 1,
  //   });
  // };
  render() {
    const { notify, Authenticated, products } = this.props;
    let flag = false
    products.forEach((item) => { if (item.connectType === "booked" && (item.status === false && item.cart > 0)) flag = true })
    return (
      <>
        {flag && (
          <div class="d-flex flex-wrap justify-content-between flex-row m-5 cart-box">
            <h1 className=" d-inline flex-fill m-3 mb-2">Shopping Cart</h1>
            <div className="mx-auto m-3 mb-5">
              <Link to="/checkout">
                <Button
                  className="ml-auto"
                  variant="success"
                  size="lg"
                  onClick={() =>
                    notify({
                      type: "success",
                      msg: "About to Place Order",
                    })
                  }
                >
                  Checkout
                </Button>
              </Link>
            </div>

            <Table borderless responsive>
              <tbody className="text-center">
                {products.map((item, index) => {
                  if (item.connectType === "booked" && (item.status === false && item.cart > 0)) {
                    let product = item.product
                    return (
                      <>
                        <tr key={index}>
                          <td scope="row">
                            <img
                              className="m-0 rounded p-0 "
                              width="100px"
                              src={product.imageurl}
                              alt="user pic"
                            />
                          </td>
                          <td>
                            <h4 className="m-0 p-0">{product.productName}</h4>
                            {/* <br />
                            Seller Amitabh Kumar */}
                          </td>
                          <td className="cart-btn">
                            <Button
                              variant="secondary"
                              onClick={() => this.countMinus(product.id)}
                            >
                              -
                            </Button>
                            <span className="mr-3 ml-3">
                              {item.cart} Quantity
                            </span>
                            <Button
                              variant="secondary"
                              onClick={() => this.addToCart(product.id)}
                            >
                              +
                            </Button>
                          </td>
                          <td>
                            <h4>
                              <sup>₹</sup>
                              {parseInt(product.price) * item.cart}
                            </h4>
                          </td>
                          <td>
                            <i
                              class="fa fa-trash fa-2x text-danger"
                              onClick={() => this.removeCart(product.id)}
                            ></i>
                          </td>
                        </tr>
                        <td colSpan="5">
                          <hr />
                        </td>
                      </>
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
        )}

        {!flag && (
          <div className="m-5 d-flex flex-column align-items-center justify-content-center">
            <h1>
              <span style={{ color: "#28ca2f" }}>Ooops!!! </span> Your Cart is
              Empty.
            </h1>
            <img className="content" src="https://cdn.dribbble.com/users/4131769/screenshots/7237700/media/4e397c44a240131ae063251dae9d33be.jpg"></img>
          </div>
        )}
      </>
    );
  }
}

const take = (state) => {
  // const cart = state.productList.cart;
  const { Authenticated } = state.user;
  const { connect_products } = state.user.currentUser
  let products = [];
  if (connect_products) {
    products = connect_products
  }
  return {
    Authenticated,
    products,
    id: state.user.currentUser.id
    // cart,
  };
};

const change = (dispatch) => {
  return bindActionCreators({ notify, join, addCart, minusCount, removeCart }, dispatch);
};

export default connect(take, change)(Profile);
