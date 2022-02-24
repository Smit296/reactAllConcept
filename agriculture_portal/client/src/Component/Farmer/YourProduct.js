import React, { Component } from "react";
import { CardDeck, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";

const { deleteProduct, join } = Action;

class YourProduct extends Component {

  componentDidMount() {
    this.props.join(this.props.id);
  }
  deleteProduct = (id, conId) => {
    this.props.deleteProduct(id, conId, this.props.id);
  }
  render() {
    return (
      <>
        {(this.props.type === "Seller") ?
          <>
            <Link to="/machine-register" className="d-flex justify-content-center">
              <Button
                as="input"
                className=" mt-4 w-md-25"
                type="button"
                value="Add Machine"
                size="sm"
              />
            </Link>
            <Link to="/seed-register" className="d-flex justify-content-center">
              <Button
                as="input"
                className=" mt-4 w-md-25"
                type="button"
                value="Add Material"
                size="sm"
              />
            </Link></> :
          <Link to="/sell_grain" className="d-flex justify-content-center">
            <Button
              as="input"
              className=" mt-4 w-md-25"
              type="button"
              value="Add Material"
              size="sm"
            />
          </Link>}

        <CardDeck className="m-4 d-flex flex-wrap justify-content-center flex-row">
          {this.props.products && this.props.products.map((info, index) => {
            if (info.connectType === "myproduct") {
              let product = info.product
              return (
                <Card key={index} className="box4 m-3 shadow">
                  <Card.Img variant="top" src={product.imageurl} />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>
                      <table class="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <th scope="row">Price:</th>
                            <td>₹{product.price} per kg</td>
                          </tr>
                          {/* <tr>
                            <th scope="row">Quantiy: </th>
                            <td>product size kg</td>
                          </tr> */}
                          {/* <tr>
                            <th scope="row">Min Order: </th>
                            <td>{product.productDosage}kg</td>
                          </tr> */}
                        </tbody>
                      </table>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex flex-row justify-content-around">
                    <Button className="btn-1" variant="danger" size="sm" onClick={() => { this.deleteProduct(product.id, info.id) }}>
                      Delete
              </Button>
                  </Card.Footer>
                </Card>
              )
            }
          })}
        </CardDeck>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.user.currentUser.connect_products,
    type: state.user.currentUser.type,
    id: state.user.currentUser.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteProduct, join }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(YourProduct);
