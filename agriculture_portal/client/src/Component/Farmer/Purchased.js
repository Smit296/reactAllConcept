import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import Action from "../../ActionCreater/notification";
// import { Link } from "react-router-dom";

function Purchase(props) {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Price</th>
            <th>No. of time purchased</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.products && props.products.map((item, index) => {
            if (item.connectType === "booked") {
              let product = item.product
              return (<tr key={index}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.productType}</td>
                <td>₹{product.price}</td>
                <td>{item.count}</td>
                <td>₹{parseInt(product.price) * parseInt(item.count)}</td>
              </tr>)
            }
          })}
          <tr>
            <td colSpan="4"></td>
            <th>Total Revenue:</th>
            <td>₹{props.products && props.products.reduce((total, item) => {
              if (item.connectType === "booked")
                return (
                  total += parseInt(item.product.price) * parseInt(item.count)
                )
              else return total
            }, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.user.currentUser.connect_products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
