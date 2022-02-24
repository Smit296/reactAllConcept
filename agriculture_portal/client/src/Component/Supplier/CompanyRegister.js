import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Container } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";
import { Redirect } from "react-router";
import Data from '../../Data/states'

const { companyRegister } = Action;

class CompanyRegister extends React.Component {
  constructor() {
    super();
    this.state = {
      company_name: "",
      GST_number: "",
      company_type: "",
      company_address: "",
      company_city: "",
      company_state: "Choose State....",
      company_district: "",
      company_pincode: "",
      statelist: Data.states,
      result: [],
      cityfetch: [],
      districtfetch: [],
      todashboardredirect: false,
    };
    this.handleChange = this.handleChange.bind();
    this.onSubmit = this.onSubmit.bind();
    this.handlestate = this.handlestate.bind();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let {
      company_name,
      company_type,
      GST_number,
      company_address,
      company_state,
      company_city,
      company_district,
      company_pincode,
    } = this.state;
    this.props.companyRegister({
      company_name,
      company_type,
      GST_number,
      company_address,
      company_state,
      company_city,
      company_district,
      company_pincode,
    }, this.props.id);

    setTimeout(() => {
      this.setState(() => ({ todashboardredirect: true }));
    }, 1000);
  };

  //state update
  handlestate = (e) => {
    const value = e.target.value;
    this.setState({
      cityfetch: [],
      districtfetch: [],
    });
    var url = `https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${value.toString()}`;
    var citylist = fetch(url);
    citylist.then((res) => {
      res.json().then((res) => {
        this.setState({
          result: res,
        });
        var array1 = [];
        var array2 = [];
        for (var i = 0; i < res.length; i++) {
          if (res[i].State === value.toString()) {
            array1.push(res[i].City);
            array2.push(res[i].District);
          }
        }
        this.setState({
          cityfetch: array1,
          districtfetch: array2,
          company_city: array1[0],
          company_district: array2[0],
        });
      });
    });

    this.handleChange(e);
  };

  render() {
    if (this.state.todashboardredirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <>
        <Container>
          <Row>
            <Col lg={3} md={3} sm={12}>
              <img
                className="mt-3"
                src="https://pngimg.com/uploads/farmer/farmer_PNG52.png"
                style={{ width: "22rem", float: "right" }}
                alt="ss"
              ></img>
            </Col>
            <Col lg={9} md={9} sm={12} className="mt-3 mb-3">
              <div className="    shadow-lg  ">
                <div className="card-body">
                  <h2 className="text-center mb-3">
                    Add <span style={{ color: "#28ca2f" }}>Company</span>
                  </h2>
                  <Form>
                    <Form.Group as={Row}>
                      <Form.Label column lg="3" sm="3">
                        Company Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          placeholder="Enter Company Name"
                          name="company_name"
                          value={this.state.company_name}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        GST Number
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          placeholder="Enter GST Number"
                          name="GST_number"
                          value={this.state.GST_number}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Company Type
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          placeholder="Private , Semi-Private"
                          name="company_type"
                          value={this.state.company_type}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <div>
                      <span>
                        Add Address Detail <FaHome />
                        <hr></hr>
                      </span>
                      <Form.Group as={Row}>
                        <Form.Label column sm="3">
                          Address
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="text"
                            placeholder="1234 Main St"
                            name="company_address"
                            value={this.state.company_address}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            as="select"
                            name="company_state"
                            value={this.state.state}
                            onChange={this.handlestate}
                          >
                            {this.state.statelist.map((option) => {
                              if (option === "Choose State here....")
                                return (
                                  <option
                                    className="dropdown-item disabled"
                                    key={option}
                                    value={option}
                                  >
                                    {option}
                                  </option>
                                );
                              return (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>City </Form.Label>
                          <Form.Control
                            as="select"
                            name="company_city"
                            value={this.state.company_city}
                            onChange={this.handleChange}
                          >
                            {this.state.cityfetch.map((option, index) => {
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

                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>District</Form.Label>
                          <Form.Control
                            as="select"
                            name="company_district"
                            value={this.state.company_district}
                            onChange={this.handleChange}
                          >
                            {this.state.districtfetch.map((option, index) => {
                              return (
                                <option key={option + index} value={option}>
                                  {option}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>Zip</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="400008"
                            name="company_pincode"
                            value={this.state.company_pincode}
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                      </Form.Row>
                    </div>
                    <div class="text-center">
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={this.onSubmit}
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const take = (state) => {
  const { id } = state.user.currentUser
  return {
    id
  };
};

const change = (dispatch) => {
  return bindActionCreators({ companyRegister }, dispatch);
};

export default connect(take, change)(CompanyRegister);
