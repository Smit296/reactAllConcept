import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../Css/machinelist.css";
import Slider from "./CategorySlider";
import MyComponent from "./PriceRangeFilter";
import TargetCrop from "./TargetCropFilter";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

class MachineList extends React.Component {
  state = {
    page: 0
  };

  //product data fetch all types of machine
  componentDidMount = () => {
    var data = fetch(`/product/selectmachine/${this.state.page}`);
    data.then((res) => {
      res.json().then((data) => {
        this.setState({
          page: this.state.page + 3,
        });
        //props to add machine list in redux state
        this.props.dispatch({
          type: "add_machine",
          payload: data,
        });
      });
    });
  };

  loadMore = () => {
    var data = fetch(`/product/selectmachine/${this.state.page}`);
    data.then((res) => {
      res.json().then((data) => {
        //props to add machine list in redux state
        this.setState({
          page: this.state.page + 3,
        });
        this.props.dispatch({
          type: "load_machine",
          payload: data,
        });
      });
    });
  }

  //clear filter
  clearFilter = () => {
    this.props.dispatch({
      type: "clearFilter",
      payload: "machine",
    });
  };

  render() {
    return (
      <>
        <div className="container-fluid mt-3 listbackground ">
          <Row>
            <Col lg={3} md={3} sm={12} className="border-right">
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <h3>
                    <span style={{ color: "#28ca2f" }}>Apply</span> Filter Here
                    <hr></hr>
                  </h3>
                  <Button
                    className="btn btn-warning"
                    onClick={() => {
                      this.clearFilter();
                    }}
                  >
                    <FaFilter /> Clear Filter
                  </Button>
                  <Slider type={["Tractor", "Pesticider"]} />
                </Col>
              </Row>
              <MyComponent type="machine" />
              <TargetCrop type="machine" />
            </Col>
            <Col lg={9} md={9} sm={12}>
              <Row id="ads">
                {this.props.machine &&
                  this.props.machine.map((item, index) => {
                    return (
                      <Col lg={4} md={4} sm={12} key={index}>
                        <div class="card rounded mt-5">
                          <div class="card-image p-0">
                            <span class="card-notify-year">
                              {item.productSize}
                            </span>
                            <img
                              class="img-fluid"
                              src={item.imageurl}
                              alt="Alternate Text"
                              style={{ width: "18.2rem", height: "12rem" }}
                            />
                          </div>
                          <div class="card-image-overlay m-auto">
                            <span class="card-detail-badge mr-3">
                              {item.price}
                            </span>
                            <span class="card-detail-badge">
                              Target Crop- {item.targetplant}
                            </span>
                          </div>
                          <div class="card-body text-center">
                            <div class="ad-title m-auto">
                              <h5>{item.productName}</h5>
                            </div>
                            <Link
                              to={{
                                pathname: "/single-product",
                                aboutProps: { item: item, type: "machine" },
                              }}
                            >
                              <Button
                                className="text-white"
                                variant={""}
                                style={{ backgroundColor: "#28ca2f" }}
                              >
                                Preview Here
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
              </Row>
              <div className="d-flex justify-content-center">
                <Button type="button" className="m-5" variant="success" onClick={() => this.loadMore()}>Load More</Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    machine: state.productList.machineListCopy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineList);
