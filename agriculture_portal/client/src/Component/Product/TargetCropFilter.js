import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";

class TargetCrop extends React.Component {
  //function to pass value as props
  handleCheck = (value) => {
    //filter if machine
    if (this.props.type === "machine")
      this.props.dispatch({
        type: "filter_machine_targetplant",
        payload: value,
      });
    //filter if seed and pesticides
    else if (this.props.type === "seed_pestiside") {
      this.props.dispatch({
        type: "filter_product_targetplant",
        payload: value,
      });
    }
    //filter if seed and pesticides
    else if (this.props.type === "grain") {
      this.props.dispatch({
        type: "filter_grain_targetplant",
        payload: value,
      });
    }
  };
  render() {
    return (
      <>
        <Row>
          <Col lg={8} md={8} sm={12}>
            <h6 className="mt-5 border-bottom">CropWise Filter</h6>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <fieldset>
              <Form.Group as={Row}>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="Paddy"
                    name="formHorizontalRadios"
                    id="Paddy"
                    onChange={(e) => {
                      this.handleCheck(e.target.id);
                    }}
                  />
                  <Form.Check
                    type="radio"
                    label="Rice"
                    name="formHorizontalRadios"
                    id="Rice"
                    onChange={(e) => {
                      this.handleCheck(e.target.id);
                    }}
                  />
                  <Form.Check
                    type="radio"
                    label="Maize"
                    name="formHorizontalRadios"
                    id="Maize"
                    onChange={(e) => {
                      this.handleCheck(e.target.id);
                    }}
                  />
                  <Form.Check
                    type="radio"
                    label="Fruits"
                    name="formHorizontalRadios"
                    id="Fruits"
                    onChange={(e) => {
                      this.handleCheck(e.target.id);
                    }}
                  />
                </Col>
              </Form.Group>
            </fieldset>
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

export default connect(null, mapDispatchToProps)(TargetCrop);
