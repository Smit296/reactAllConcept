import React, { Component } from "react";
import Data from "../../Data/states";
import {
  Row,
  Col,
  Form,
  Table,
  Button,
  Modal,
  Badge,
  Card,
} from "react-bootstrap";
import Chart from "./demochart";
import Ticker from "react-ticker";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
export default class ComodityData extends Component {
  state = {
    statelist: Data.states,
    state: "Choose State....",
    fetchResult: [],
    district: [],
    districtSelect: "Choose District....",
    foundDistrict: false,
    resultToShow: [],
    show: false,
    show1: false,
    itemToShowChart: "",
    itemFetched: false,
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleClose1 = () => {
    this.setState({
      show1: false,
    });
  };
  handleShow1 = () => {
    this.setState({
      show1: true,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  //handle state change
  handleChangeState = (e) => {
    let { state, fetchResult, district } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
      district: [],
    });
    //to filter all district
    var districtFiltered = fetchResult.filter((value) => {
      return value.state === e.target.value;
    });
    //to filter unique distict
    const unique = [...new Set(districtFiltered.map((item) => item.district))];

    this.setState({
      district: unique,
    });
  };

  //handle distict Change
  handleChangeDistrict = (e) => {
    console.log(e.target.value);
    let { state, fetchResult, district } = this.state;
    var result = fetchResult.filter((value) => {
      return value.district === e.target.value;
    });
    this.setState({
      resultToShow: result,
      itemFetched: true,
    });
    this.setState({
      show: false,
    });
  };

  handleChart = (value) => {
    this.setState({
      show1: true,
      itemToShowChart: value,
    });
  };
  handleSeeOther = () => {
    this.setState({
      itemFetched: false,
    });
  };
  componentDidMount = () => {
    var data = fetch(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001967d7349baf94f7d47de66173d39a48e&format=json&offset=0&limit=4000"
    );
    data.then((res) => {
      res.json().then((data) => {
        this.setState({
          fetchResult: data.records,
        });
      });
    });
  };
  render() {
    const shareUrl = window.location.href;
    let {
      state,
      fetchResult,
      district,
      resultToShow,
      itemFetched,
    } = this.state;
    return (
      <>
        <Ticker>
          {({ index }) => (
            <>
              <h2 style={{ padding: "20px", color: "green" }}>
                विभिन्न कमोडिटियों के आज का भाव, मूल्य एक ही स्थान पर जानने के
                लिए अग्रीकम को चुनें!
              </h2>
            </>
          )}
        </Ticker>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Choose State</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChangeState}
                >
                  {this.state.statelist.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>District</Form.Label>
                <Form.Control
                  as="select"
                  name="districtSelect"
                  value={this.state.districtSelect}
                  onChange={this.handleChangeDistrict}
                >
                  {this.state.district.map((option, index) => {
                    return (
                      <option
                        key={option + index}
                        value={option}
                        label={option}
                      >
                        {option}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Row>
          <Col>
            {itemFetched && (
              <>
                <Table striped bordered hover variant="success">
                  <thead>
                    <tr>
                      <th>Market</th>
                      <th>Commodity</th>
                      <th>Variety</th>
                      <th>Arrival date</th>
                      <th>Min Price</th>
                      <th>Max Price</th>
                      <th>Modal Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultToShow.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.market} </td>
                          <td>{item.commodity} </td>
                          <td>{item.variety} </td>
                          <td>{item.arrival_date} </td>
                          <td>{item.min_price} </td>
                          <td>{item.max_price} </td>
                          <td>{item.modal_price} </td>
                          <td>
                            <Badge
                              pill
                              variant="success"
                              onClick={() => {
                                this.handleChart(item);
                              }}
                            >
                              See graph here
                            </Badge>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Button
                  variant="warning"
                  onClick={this.handleSeeOther}
                  className="m-3"
                >
                  {" "}
                  See Other Result
                </Button>
              </>
            )}
            {!itemFetched && (
              <>
                <Row>
                  <Col lg={4} md={4} sm={12}>
                    <img
                      src="https://clipground.com/images/vegetable-market-clipart-13.jpg"
                      alt=""
                      style={{
                        width: "25rem",
                        height: "25rem",
                      }}
                      className="mt-5 ml-2 mr-2 mb-2"
                    />
                  </Col>
                  <Col lg={8} md={8} sm={12} className="mt-5">
                    {" "}
                    <div className="d-flex flex-column justify-content-start">
                      <h3 className="mb-0" style={{ "font-weight": "500" }}>
                        <span style={{ color: "#28ca2f" }}>
                          Current Daily Price of Various Commodities from
                          Various Markets (Mandi) <hr />{" "}
                        </span>
                      </h3>

                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <th></th>
                            <td scope="row">
                              <img
                                className="m-0 rounded-circle p-0  "
                                width="100px"
                                src="https://media.glassdoor.com/sqll/1106550/ministry-of-agriculture-and-farmers-welfare-government-of-india-squarelogo-1521190894069.png"
                                alt="user pic"
                              />
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">Organization - </th>
                            <td>Ministry of Agriculture and Farmers Welfare</td>
                          </tr>

                          <tr>
                            <th scope="row"> Sector </th>
                            <td>Agricultural Marketing</td>
                          </tr>
                          <tr>
                            <th scope="row"> Source </th>
                            <td>data.gov.in</td>
                          </tr>

                          <tr>
                            <th>Share Information:</th>
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
                          <tr>
                            <td>
                              {" "}
                              <Button
                                variant="outline-success"
                                onClick={this.handleShow}
                              >
                                Hit Here to Enter State
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>

        <Modal show={this.state.show1} onHide={this.handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Graph Analyzer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Chart item={this.state.itemToShowChart} />{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose1}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
