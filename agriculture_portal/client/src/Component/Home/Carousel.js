import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Button, Row, Col, Container, Card } from "react-bootstrap";
import "./../../Css/homepage1.css";
import image1 from "../../Image/caosal1.jpg";
import image2 from "../../Image/carosal2.jpg";
import image3 from "../../Image/carosal3.png";
import image4 from "../../Image/work1.jpg";
import image5 from "../../Image/work2.jpg";
import image6 from "../../Image/work3.jpg";

import { Link } from "react-router-dom";

class CarouselHome extends React.Component {
  state = {
    topic: [
      {
        name: "Farmer",
        url: image4,
        link: "farmer",
        subject:
          "If you are a farmer then you are at perfect platfrom from where you can order all of your farming related products and you can sell your production also.",
      },
      {
        name: "Supplier",
        url: image5,
        link: "profile",
        subject:
          "Sell your wide variety of products related to farming, through our platform. We have millions of farmers connected from all parts of country. ",
      },
      {
        name: "Consumer",
        url: image6,
        link: "consumer",
        subject:
          "No need to visit field to get grains!!! Just order here and and get all kinds of garins deliverd at your doorstep. Why to wait? Go and order.",
      },
    ],
  };

  render() {
    return (
      <>
        <Carousel>
          <Carousel.Item>
            <img style={{ width: "100%" }} src={image1} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ width: "100%" }} src={image2} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ width: "100%" }} src={image3} alt="First slide" />
          </Carousel.Item>
        </Carousel>

        <Container>
          <Row className="boxhome">
            {this.state.topic &&
              this.state.topic.map((item, index) => {
                return (
                  <Col key={index}>
                    <div
                      className="styl_box"
                      style={{ backgroundImage: `url(${item.url})` }}
                    >
                      <div className="single_analize__block text-center ">
                        <h2>{item.name}</h2>
                        <p>{item.subject}</p>
                        <Link to={`/${item.link}`}>
                          {" "}
                          <Button className="btn-text btn_new btn-success">
                            Explore More
                          </Button>{" "}
                        </Link>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </>
    );
  }
}

export default CarouselHome;
