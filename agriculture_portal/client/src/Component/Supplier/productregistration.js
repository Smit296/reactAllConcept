import React from "react";
import "../../Css/supplierproduct.css";
import { Form, Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import Action from "../../ActionCreater/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import bsCustomFileInput from 'bs-custom-file-input'
// import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const { productregister } = Action;

class ProductRegister extends React.Component {
  constructor() {
    super();
    this.state = {
      productType: "",
      productName: "",
      price: "",
      productSize: "",
      productDosage: "",
      targetplant: "",
      description: "",
      imageurl: "",
      todashboardredirect: false,
      upload: true
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
  //form on submit event
  onSubmit = (event) => {
    event.preventDefault();
    let {
      productType,
      productName,
      price,
      productSize,
      productDosage,
      targetplant,
      description,
      imageurl,
    } = this.state;

    if (!productType || !productName || !price || !productSize || !productDosage || !targetplant || !description || !imageurl) {
      NotificationManager.warning("All field required*");
    }
    else {
      this.props.productregister(
        {
          productType,
          productName,
          price,
          productSize,
          productDosage,
          targetplant,
          description,
          imageurl,
        },
        this.props.id
      );
      // axios({
      //   method: "post",
      //   url: "http://localhost:5000/product/",
      //   data: {
      //     productType,
      //     productName,
      //     price,
      //     productSize,
      //     productDosage,
      //     targetplant,
      //     description,
      //     imageurl
      //   },
      // }).then(function (response) {
      //   console.log(response);
      // });

      setTimeout(() => {
        this.setState(() => ({ todashboardredirect: true }));
      }, 1000);
    }
  };

  render() {
    if (this.state.todashboardredirect) {
      return <Redirect to="/profile" />;
    }

    return (
      <>
        <div>
          <div class="container register mb-3">
            <div class="row">
              <div class="col-md-3 register-left">
                <h4 className="mt-5">
                  Now add your product in some of simple steps
                </h4>

                <br />
              </div>
              <div class="col-md-9 register-right">
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <h3 class="register-heading">
                      Add
                      <span style={{ color: "#28ca2f" }}>
                        {this.props.product.subject}
                      </span>
                    </h3>
                    <div class="row register-form">
                      <div class="col-md-6">
                        <div class="form-group">
                          <Form.Control
                            as="select"
                            name="productType"
                            value={this.state.productType}
                            onChange={this.handleChange}
                          >
                            {this.props.product.type.map((option) => {
                              return (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Product Name"
                            name="productName"
                            value={this.state.productName}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="number"
                            class="form-control"
                            placeholder={this.props.product.price}
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder={this.props.product.size}
                            name="productSize"
                            value={this.state.productSize}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder={this.props.product.dosage}
                            name="productDosage"
                            value={this.state.productDosage}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            name="txtEmpPhone"
                            class="form-control"
                            placeholder={this.props.product.description}
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="form-group">
                          <Form.Control
                            as="select"
                            name="targetplant"
                            value={this.state.targetplant}
                            onChange={this.handleChange}
                          >
                            {this.props.product.target.map((option) => {
                              if (option === "Choose Target Plant....")
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
                        </div>
                        <div class="form-group">
                          <Form.File
                            type="file"
                            label="Upload Product Image"
                            custom
                            onChange={this.uploadImage}
                          />
                        </div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(take, change)(ProductRegister);
