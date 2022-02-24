import React from "react";
import "../../Css/profile.css";
import PageDescription from "../Home/PageDescription";
import Blog from "../Home/Blog";
import { connect } from "react-redux";
import { Image, Button } from "react-bootstrap";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";
import Notify from "../../ActionCreater/notification";
import { Redirect } from "react-router";

const { addCart, join, minusCount } = Action;
const { notify } = Notify;

class Content extends React.Component {
  //state to check if the proucts is seed or pesticides

  constructor(props) {
    super(props);
    if (this.props.location.aboutProps)
      this.state = {
        type: this.props.location.aboutProps.type,
        item: this.props.location.aboutProps.item,
        rerender: 0
      };
    this.addToCart = this.addToCart.bind();
    this.countMinus = this.countMinus.bind();
    this.buyNow = this.buyNow.bind();
  }

  componentDidMount() {
    this.props.join(this.props.userInfo.id);
  }

  countMinus = (n) => {
    if (n == 0) return
    if (this.props.userInfo.id) {
      this.props.minusCount(this.props.userInfo.id, this.props.location.aboutProps.item.id)
    }
  }

  addToCart = () => {
    if (this.props.userInfo.id) {
      this.props.addCart(this.props.userInfo.id, this.props.location.aboutProps.item.id)
    }
    else
      this.props.notify({
        type: "info",
        msg: "Loggin First",
      });
  };

  buyNow = () => {
    if (this.props.userInfo.id) {
      this.props.addCart(this.props.userInfo.id, this.props.location.aboutProps.item.id);
      this.props.history.push("/cart");
    }
    else
      this.props.notify({
        type: "info",
        msg: "Loggin First",
      });
  };

  render() {
    //product size for seed and machine power for all machines
    if (!this.props.location.aboutProps) {
      return <Redirect to="/farmer" />
    }
    let productSize;
    if (this.state.type === "seed") {
      productSize = <p> Product Size </p>;
    } else {
      productSize = <p> Machine Power </p>;
    }
    const shareUrl = window.location.href;
    return (
      <>
        <div className="d-flex flex-column">
          <div className="d-flex flex-fill justify-content-around flex-wrap m-5  flex-row">
            <Image
              className="shadow content"
              src={this.state.item.imageurl}
              rounded
            />
            <div className="text-center"></div>
            <div className="d-flex flex-column justify-content-start">
              <h1 className="mb-0" style={{ "font-weight": "500" }}>
                {this.state.item.productName}
              </h1>
              {/* <p className="pl-2">Seller Amitabh Kumar</p> */}
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">Qunatity Available:</th>
                    <td>1500 kg</td>
                  </tr>
                  <tr>
                    <th scope="row">Price: </th>
                    <td>₹ {this.state.item.price}</td>
                  </tr>
                  <tr>
                    <th scope="row">Target Plant: </th>
                    <td>{this.state.item.targetplant}</td>
                  </tr>
                  <tr>
                    <th scope="row">{productSize} </th>
                    <td>{this.state.item.productSize}</td>
                  </tr>
                  <tr>
                    <th>Quantity (kg)</th>
                    <td>
                      {this.props.products.map((items) => {
                        if (items.productId === this.state.item.id)
                          return (<>
                            <Button className="mr-3" variant="secondary" onClick={() => this.countMinus(items.cart)}>
                              -
                            </Button>
                            {items.cart}
                            <Button className="ml-3" variant="secondary" onClick={this.addToCart}>
                              +
                            </Button>
                          </>
                          )
                      })}

                    </td>
                  </tr>
                  <tr>
                    <th>Total:</th>
                    <td>₹{this.props.products.map((items) => {
                      if (items.productId === this.state.item.id)
                        return items.cart * this.state.item.price
                    })}</td>
                  </tr>
                  <tr>
                    <th>Product Description:</th>
                    <td>{this.state.item.description}</td>
                  </tr>
                  <tr>
                    <th>Share Product:</th>
                    <td>
                      <WhatsappShareButton
                        url={shareUrl}
                        className="Demo__some-network__share-button"
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <FacebookShareButton
                        url={shareUrl}
                        className="Demo__some-network__share-button ml-1"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-around">
                <Button
                  className="btn-2"
                  variant="dark"
                  onClick={this.addToCart}
                >
                  Add To Cart
                </Button>

                <Button className="btn-2" variant="success" onClick={this.buyNow}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <PageDescription />
        <Blog />
        {/* <div className="d-flex flex-column ">
        <div className="d-flex flex-fill justify-content-around flex-wrap m-5 flex-row">
          <div >
            <Image className='shadow content' src={img2} rounded fluid />
            <div className='d-flex mt-3'>
              <Button className='flex-fill mr-2' variant="dark" size="lg">
                Add To Cart
          </Button>
              <Button className='flex-fill ml-2' variant="success" size="lg">
                Rent Now
          </Button>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-start">
            <h1 className='mb-0' style={{ 'font-weight': '500' }}>Picking Machine</h1>
            <p className='pl-2'>Seller Abhishek Gautam</p>
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <th scope="row">Max Rent Time:</th>
                  <td>16 Days</td>
                </tr>
                <tr>
                  <th scope="row">Price: </th>
                  <td>₹6000 per day</td>
                </tr>
                <tr>
                  <th scope="row">Usage/Application: </th>
                  <td>Picking & sorting of crops</td>
                </tr>
                <tr>
                  <th scope="row">Available Location: </th>
                  <td>Punjab</td>
                </tr>
                <tr>
                  <th>Quantity (days)</th>
                  <td>
                    <Button className='mr-3' variant="secondary">
                      -
                    </Button>
                    1
                    <Button className='ml-3' variant="secondary">
                      +
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>₹1750</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> 
      </div>*/}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { connect_products } = state.user.currentUser
  let products = [];
  if (connect_products) {
    products = connect_products
  }
  return {
    machine: state.productList, userInfo: state.user.currentUser, products
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addCart, notify, join, minusCount }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
