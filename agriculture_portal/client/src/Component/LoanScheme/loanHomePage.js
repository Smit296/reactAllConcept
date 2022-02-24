import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Row, Col, Nav, Carousel } from "react-bootstrap";
import CreditCard from "./creditCard";
import Applyloan from "./SchemeList";
import BankSection from "./bankpage";
class Bankhomepage extends Component {
  render() {
    return (
      <>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.icicibank.com/managed-assets/images/personal/agri-and-rural/banner/desktop/ATL_D.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.icicibank.com/managed-assets/images/personal/agri-and-rural/banner/desktop/KCC_D.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row style={{ marginTop: "-2rem" }}>
          <Col lg={12} md={12} sm={12}>
            <Nav variant="tabs" className="justify-content-center">
              <Link to="/bank/home">
                <Nav.Item>
                  <Nav.Link href="/bank/home">Loan Scheme</Nav.Link>
                </Nav.Item>
              </Link>

              <Link to="/bank/banksection">
                <Nav.Item>
                  <Nav.Link href="/bank/banksection">Bank Section</Nav.Link>
                </Nav.Item>
              </Link>
              <Link to="/bank/Kisancard">
                <Nav.Item>
                  <Nav.Link href="/bank/Kisancard">Kisan Card</Nav.Link>
                </Nav.Item>
              </Link>
            </Nav>
          </Col>
        </Row>
        <Route exact path="/bank/home">
          <Applyloan />
        </Route>
        <Route path="/bank/banksection">
          <BankSection />
        </Route>
        <Route path="/bank/Kisancard">
          <CreditCard />
        </Route>
      </>
    );
  }
}

export default Bankhomepage;
