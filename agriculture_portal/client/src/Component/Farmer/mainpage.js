import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Container } from "react-bootstrap";
import "./../../Css/farmer.css";
import image1 from "../../Image/machine1.jpg";
import image2 from "../../Image/oldmachine.jpg";
import image3 from "../../Image/pesisides.jpg";
import image4 from "../../Image/maize.jpg";

import { Link, Route } from "react-router-dom";
class FarmerHomePage extends React.Component {
  state = {
    topic: [
      {
        name: " Purchase Seeds, Pesticides &  Fertilizer",
        url: image3,
        category: "product_seed",
      },
      {
        name: "Sell Your Producing Material through Us",
        url: image4,
        category: "sell_grain",
      },
      {
        name: "Lend All of Heavy Machine And Tractros",
        url: image1,
        category: "lend_machine",
      },
      {
        name: "Current Daily Price of Various Commodities",
        url: image2,
        category: "comodity",
      },
    ],
  };

  render() {
    return (
      <>
        <div className="background">
          <Container>
            <Row className="boxhome1">
              {this.state.topic &&
                this.state.topic.map((item, index) => {
                  return (
                    <Col
                      className="col-lg-6 col-md-6 col-sm-12 mt-4 mb-5 "
                      key={index}
                    >
                      <div
                        class="styl_box1"
                        style={{ backgroundImage: `url(${item.url})` }}
                      >
                        <div class="single_analize__block1 text-center ">
                          <h2>{item.name}</h2>
                          <Link to={`/${item.category}`}>
                            {" "}
                            <Button className="btn-success mt-4">
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
        </div>
      </>
    );
  }
}

export default FarmerHomePage;
