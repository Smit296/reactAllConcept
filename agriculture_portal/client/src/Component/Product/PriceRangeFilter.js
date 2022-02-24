import React, { useState } from "react";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";

class MyComponent extends React.Component {
  state = {
    value: 10,
  };
  handleRange = (value) => {
    this.setState({
      value: value,
    });
  };
  //props passes to redux state to filte on price
  applyFilter = () => {
    if (this.props.type === "machine") {
      this.props.dispatch({
        type: "filter_machine_price",
        payload: this.state.value,
      });
    }
    //filter if seed and pesticides
    else if (this.props.type === "seed_pestiside") {
      this.props.dispatch({
        type: "filter_product_price",
        payload: this.state.value,
      });
    }
    //filter if fruits and grain
    else if (this.props.type === "grain") {
      this.props.dispatch({
        type: "filter_grain_price",
        payload: this.state.value,
      });
    }
  };
  render() {
    return (
      <>
        <Row>
          <Col lg={8} md={8} sm={12}>
            <h6 className="mt-5 border-bottom">Price (Min to Max)</h6>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={3} md={3} sm={3}>
            <span style={{ color: "#28ca2f" }}>₹10</span>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <RangeSlider
              sm={12}
              value={this.state.value}
              variant="success"
              min={10}
              max={500}
              tooltipLabel={(value) => ` ₹${value}`}
              onChange={(changeEvent) =>
                this.handleRange(changeEvent.target.value)
              }
            />
            <Button
              variant="outline-success"
              className="  ml-5"
              onClick={() => {
                this.applyFilter();
              }}
            >
              Filter
            </Button>
          </Col>
          <Col lg={3} md={3} sm={3} style={{ marginRight: "-2px" }}>
            <span style={{ color: "#28ca2f" }}>₹ 500</span>
          </Col>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(null, mapDispatchToProps)(MyComponent);
