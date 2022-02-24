import React, { Component } from "react";
import { Button, Card, Jumbotron } from "react-bootstrap";
import "./../../Css/homepage1.css";
import image1 from "../../Image/blog1.jpg";
import image2 from "../../Image/blog2.jpg";
import image3 from "../../Image/blog3.jpg";
import image4 from "../../Image/blog4.png";
import { Link } from "react-router-dom";
class Blog extends Component {
  state = {
    topic: [
      {
        name: "Bascis Step of Organic Farming",
        url: image1,
        subject:
          "Organic farming refers agricultural system  reliant on green manure, compost ,biological pest contol and crop rotation and livestock production....",
      },
      {
        name: "Mustard Cultivation Income",
        url: image2,
        subject:
          " Musturd is very popular oil seed crop, higly cultivated seeds crop among all the crops in india. Due to easy management practice and contestant price goverment is issuing .......",
      },
      {
        name: "Farm Mechnization",
        url: image3,
        subject:
          "Mechanised agriculture is the process of using agricultural machinery to mechanise the work of agriculture, greatly increasing farm worker productivity. In modern times....",
      },
      {
        name: "Food Subsidiary",
        url: image4,
        subject:
          "NABARD Loan for food Processing Industry in India. The NABARD loan was announced by the Indian Government, which offers 2000 crore funds for entrepreneurs to set up food.... ",
      },
    ],
  };
  render() {
    return (
      <>
        <Jumbotron className="Blog text-center mb-0 mt-2">
          <h1 className="">
            Our <span style={{ color: "#28ca2f" }}>Blog</span>
          </h1>
          <div className="d-flex flex-row justify-content-sm-around align-item-strech flex-wrap bd-highlight">
            {this.state.topic &&
              this.state.topic.map((item, index) => {
                return (
                  <Card
                    key={index}
                    style={{ width: "18rem" }}
                    className="blogcard mx-auto m-3"
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: "10rem" }}
                      src={item.url}
                      className="blogimage"
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.subject}</Card.Text>
                      <Link to="/blog">
                        {" "}
                        <Button className="btn-success">Read More</Button>{" "}
                      </Link>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </Jumbotron>
      </>
    );
  }
}

export default Blog;
