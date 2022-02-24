import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
class BlogForm extends React.Component {
  state = {
    show: false,
    blogTitle: "",
    sourceName: "",
    imageurl: "",
    descirption: "",
    like: 0,
    dislike: 0,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  //to create bolg action
  hanldeSubmit = async (event) => {
    event.preventDefault();
    let {
      blogTitle,
      sourceName,
      imageurl,
      descirption,
      like,
      dislike,
    } = this.state;
    await axios({
      method: "post",
      url: "/blog_create",
      data: {
        blogTitle,
        sourceName,
        imageurl,
        descirption,
        like,
        dislike,
      },
    }).then(function (response) {});

    await fetch("/blog_get").then((res) => {
      res.json().then((data) => {
        this.props.dispatch({
          type: "bloglist",
          payload: data,
        });
      });
    });
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <>
        <Button variant="outline-warning" onClick={this.handleShow}>
          Add Article Here
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Enter Article Heading</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Heading"
                  name="blogTitle"
                  value={this.state.blogTitle}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Article Source</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Source Name"
                  name="sourceName"
                  value={this.state.sourceName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Url"
                  name="imageurl"
                  value={this.state.imageurl}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Breif Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="descirption"
                  value={this.state.descirption}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={this.hanldeSubmit}>
              Add Here
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogState.blogList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm);
