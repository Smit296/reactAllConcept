import React, { Component } from "react";
import { Spinner, Row, Col, Image, Form, Button } from "react-bootstrap";
import BlogForm from "./blogform";
import { connect } from "react-redux";
import ClapButton from "react-clap-button";
import axios from "axios";
import Adminlogin from "./adminlogin";

class Bloglist extends Component {
  state = {
    loading: false,
    count: 0,
  };
  //to fetch blog data
  componentDidMount = () => {
    var blogs = fetch("/blog_get");
    blogs.then((res) => {
      res.json().then((data) => {
        this.props.dispatch({
          type: "bloglist",
          payload: data,
        });
        this.setState({
          loading: true,
        });
      });
    });
  };

  onCountChange = (item) => {
    item.like += 1;
    axios({
      method: "post",
      url: "/blog_update",
      data: {
        _id: item._id,
        like: item.like,
      },
    }).then(function (response) {
      console.log(response);
    });
  };
  //funtion to handle delete
  handleDelete = (value) => {
    this.props.dispatch({
      type: "blogdelete",
      payload: value,
    });
    axios({
      method: "post",
      url: "/blog_delete",
      data: {
        _id: value._id,
      },
    }).then(function (response) {
      console.log(response);
    });
  };

  render() {
    let btn;
    let del;
    if (this.props.isadminlogin) btn = <BlogForm />;
    else btn = <Adminlogin />;

    return (
      <>
        {this.state.loading && (
          <>
            <Row>
              <Col lg={9} md={9} sm={12}>
                {this.props.blogs &&
                  this.props.blogs.map((item, index) => {
                    return (
                      <Row
                        className="  border border-success mt-3 mb-3 ml-3 "
                        style={{ borderRadius: "2rem", width: "100%" }}
                        key={index}
                      >
                        <Col lg={4} md={4} sm={12}>
                          <Image
                            src={item.imageurl}
                            rounded
                            className="m-2"
                            style={{ width: "20rem", height: "16rem" }}
                          />
                        </Col>
                        <Col lg={8} md={8} sm={12} className="mt-2 mb-2">
                          <a href={item.sourceName}>
                            {" "}
                            <h4>
                              {item.blogTitle}
                              <hr />
                            </h4>
                          </a>
                          <span>{item.descirption}</span>
                          <br /> <br />
                          <ClapButton
                            count={item.like}
                            countTotal={item.like}
                            maxCount={100}
                            isClicked={false}
                            onCountChange={() => this.onCountChange(item)}
                          />
                          {this.props.isadminlogin && (
                            <i
                              className="fa fa-2x fa-trash float-right mt-5 "
                              onClick={() => {
                                this.handleDelete(item);
                              }}
                            ></i>
                          )}
                        </Col>
                      </Row>
                    );
                  })}
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Row>
                  <div className="mt-3 border-bottom">
                    <h5 class="card-header">Susbsribe Here For Latest News</h5>
                    <div class="card-body">
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Email Here" />
                      </Form.Group>
                      <Button variant="outline-success">Subscribe Here</Button>
                    </div>
                  </div>
                </Row>
                <Row className="mt-3 " style={{ marginLeft: "5rem" }}>
                  {btn}
                </Row>
              </Col>
            </Row>
          </>
        )}
        {!this.state.loading && (
          <>
            <Spinner animation="border" variant="warning" />
            <h3>Loading.........</h3>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogState.blogList.data,
    isadminlogin: state.blogState.adminlogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bloglist);
