import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Container, Spinner, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";
import bsCustomFileInput from 'bs-custom-file-input'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const { productregister } = Action;
class Addgrain extends React.Component {
  constructor() {
    super();
    this.state = {
      grain_name: "",
      quantity: "",
      location: "",
      graintype: "",
      imageurl: "",
      price: "",
      type: ["Rice", "Maize", "Fruits", "Mustuard", "Pulsed"],
      todashboardredirect: false,
      upload: true,
    };
    this.handleChange = this.handleChange.bind();
    this.onSubmit = this.onSubmit.bind();
    this.uploadImage = this.uploadImage.bind();
  }

  componentDidMount() {
    bsCustomFileInput.init();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let {
      grain_name,
      quantity,
      location,
      graintype,
      imageurl,
      price,
    } = this.state;
    if (!grain_name || !quantity || !location || !graintype || !imageurl || !price) {
      NotificationManager.error("All field required*");
    }
    else {
      this.props.productregister(
        {
          productType: "grain",
          productName: grain_name,
          price: price,
          productSize: quantity,
          productDosage: location,
          targetplant: graintype,
          imageurl: imageurl,
        },
        this.props.id
      );
      setTimeout(() => {
        this.setState(() => ({ todashboardredirect: true }));
      }, 1000);
    }
  };
  // For image upload on clodinary
  uploadImage = async (e) => {
    this.setState({
      upload: false
    })
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sitanshu");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drr1rnoxf/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    if (file) {
      this.setState({
        imageurl: file.secure_url,
        upload: true
      })
      console.log(file.secure_url)
    }
  };

  render() {
    if (this.state.todashboardredirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <>
        <Container>
          <Row>
            <Col lg={2} md={2} sm={12}></Col>
            <Col lg={8} md={8} sm={12} className="mt-3 mb-3  ">
              <div className=" shadow-lg  ">
                <div className="card-body border border-success">
                  <h2 className="text-center mb-3">
                    Sell <span style={{ color: "#28ca2f" }}>Grain Here</span>
                  </h2>
                  <Form className="text-success  ">
                    <Form.Group as={Row}>
                      <Form.Label column lg="3" sm="3">
                        Grain Name
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="text-success"
                          type="text"
                          placeholder="Enter Grain Name"
                          name="grain_name"
                          value={this.state.grain_name}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Grain Available Quanyity
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="text-success"
                          type="text"
                          placeholder="Quantity"
                          name="quantity"
                          value={this.state.quantity}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Price
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="text-success"
                          type="number"
                          placeholder="Enter Price"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Available location
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="text-success"
                          type="text"
                          placeholder="location"
                          name="location"
                          value={this.state.location}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Grain Type
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="graintype"
                          className="text-success"
                          value={this.state.graintype}
                          onChange={this.handleChange}
                        >
                          <option value="Rice" selected>
                            Rice
                          </option>
                          <option value="Maize">Maize</option>
                          <option value="Pulse">Pulse</option>
                          <option value="Wheat">Wheat</option>
                          <option value="Fruit">Fruit</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Upload Image
                      </Form.Label>
                      <Col sm="8">
                        <Form.File
                          type="file"
                          label="Upload Product Image"
                          custom
                          onChange={this.uploadImage}
                        />
                      </Col>
                    </Form.Group>
                    <div class="text-center">
                      {(this.state.upload) ?
                        <Button
                          variant="outline-success"
                          onClick={this.onSubmit}
                        > Add Product
                          </Button> :
                        <Button variant="outline-success" disabled>
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                            Loading...
                          </Button>}
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
            <Col lg={2} md={2} sm={12}></Col>
          </Row>
        </Container>
      </>
    );
  }
}

const take = (state) => {
  const { id } = state.user.currentUser;
  return {
    id,
  };
};

const change = (dispatch) => {
  return bindActionCreators({ productregister }, dispatch);
};

export default connect(take, change)(Addgrain);
