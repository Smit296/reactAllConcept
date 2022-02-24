import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { UserCard } from "react-ui-cards";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "../Product/CategorySlider";
import MyComponent from "../Product/PriceRangeFilter";
import TargetCrop from "../Product/TargetCropFilter";
import { FaFilter } from "react-icons/fa";

class FarmerGrain extends React.Component {
  state = {
    page: 0
  };

  //product data fetch all types of machine
  componentDidMount = () => {
    var data = fetch(`/product/grain/${this.state.page}`);
    data.then((res) => {
      res.json().then((data) => {
        this.setState({
          page: this.state.page + 3,
        });
        //props to add machine list in redux state
        this.props.dispatch({
          type: "add_grain",
          payload: data,
        });
      });
    });
  };

  loadMore = () => {
    var data = fetch(`/product/grain/${this.state.page}`);
    data.then((res) => {
      res.json().then((data) => {
        //props to add machine list in redux state
        this.setState({
          page: this.state.page + 3,
        });
        this.props.dispatch({
          type: "load_grain",
          payload: data,
        });
      });
    });
  }

  //clear filter
  clearFilter = () => {
    this.props.dispatch({
      type: "clearFilter",
      payload: "grain",
    });
  };

  render() {
    return (
      <>
        <div className="container-fluid mt-3 listbackground ">
          <Row>
            <Col lg={3} md={3} sm={12} className="border-right">
              <Row>
                <Col lg={12} md={12} sm={12} className="mt-3">
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
                  <Slider type={["Grain", "Fruits"]} />
                </Col>
              </Row>
              <MyComponent type="grain" />
              <TargetCrop type="grain" />
            </Col>
            <Col lg={9} md={9} sm={12}>
              <Row id="ads">
                {this.props.grain &&
                  this.props.grain.map((item, index) => {
                    var url = item.imageurl;
                    let price = item.price;
                    let size = item.productSize;
                    let location = item.productDosage;
                    return (
                      <Col lg={4} md={4} sm={12} key={index}>
                        <Link
                          to={{
                            pathname: "/single_grain",
                            aboutProps: { item: item },
                          }}
                        >
                          {" "}
                          <UserCard
                            className="mx-auto"
                            float
                            header={url}
                            avatar="https://p.kindpng.com/picc/s/628-6286677_thumb-image-certified-organic-products-logo-hd-png.png"
                            name={item.productName}
                            stats={[
                              {
                                name: "Price",
                                value: price,
                              },
                              {
                                name: "Product Size",
                                value: size,
                              },
                              {
                                name: "Location",
                                value: location,
                              },
                            ]}
                          />
                        </Link>
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
    grain: state.productList.grainListCopy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmerGrain);
