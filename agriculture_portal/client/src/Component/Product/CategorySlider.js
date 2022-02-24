import React from "react";
import "../../Css/machinelist.css";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

class Slider extends React.Component {
  handleChange = (value) => {
    //filter if machine
    if (this.props.type[0] === "Tractor") {
      this.props.dispatch({
        type: "filter_machine_category",
        payload: value,
      });
    }
    //filter if seed and pesticides
    else if (this.props.type[0] === "Seed") {
      this.props.dispatch({
        type: "filter_product_category",
        payload: value,
      });
    } else if (this.props.type[0] === "Grain") {
      this.props.dispatch({
        type: "filter_grain_category",
        payload: value,
      });
    }
  };

  render() {
    return (
      <>
        <Row>
          <Col lg={8} md={8} sm={12}>
            <h6 className="mt-4 border-bottom">Category Filter</h6>
          </Col>
        </Row>

        <div class="wrapper">
          <div class="toggle_radio">
            <input
              type="radio"
              class="toggle_option"
              id="first_toggle"
              name="toggle_option"
              value={this.props.type[0]}
              onClick={(e) => {
                this.handleChange(e.target.value);
              }}
            ></input>

            <input
              type="radio"
              checked
              class="toggle_option"
              id="second_toggle"
              name="toggle_option"
              value={this.props.type[1]}
              onClick={(e) => {
                this.handleChange(e.target.value);
              }}
            ></input>

            <label for="first_toggle">
              <p>{this.props.type[0]}</p>
            </label>
            <label for="second_toggle">
              <p>{this.props.type[1]}</p>
            </label>

            <div class="toggle_option_slider"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(null, mapDispatchToProps)(Slider);
