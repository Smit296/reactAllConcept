import React, { Component } from "react";
import { PaymentCard } from "react-ui-cards";
import { Row, Col, Jumbotron } from "react-bootstrap";
import CreditCardForm from "./crediCardForm";
export default class CreditCard extends Component {
  render() {
    return (
      <>
        <Jumbotron className="mb-0 ">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="ml-5">
                <h4>
                  {" "}
                  <span style={{ color: "#28ca2f" }}>
                    Farmer Finance <hr />
                  </span>
                </h4>
                <h6>
                  {" "}
                  <span style={{ color: "#28ca2f" }}>
                    Documents Required
                  </span>{" "}
                </h6>
                <span>
                  You need to submit the following documents while availing the
                  loan:
                </span>
                <ul>
                  <li>Simplified application form</li>
                  <li>KYC Document</li>
                  <li>Land documents</li>
                  <li>Security PDC</li>
                  <li>Any other document, as per sanction condition</li>
                </ul>
                <CreditCardForm />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <PaymentCard
                background="linear-gradient(135deg, #00b4db, #0083b0)"
                issuerIcon="https://bihog-com.exactdn.com/wp/wp-content/uploads/2019/12/Department-of-Agriculture-Cooperation-Farmers-Welfare.png?strip=all&lossy=1&fit=300%2C203&ssl=1"
                number="5458 8074 7691 1254"
                date="05/20"
                name="Kisan Credit Card"
                cvv="714"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} className="mt-5">
              <div className=" d-flex flex-row bd-highlight   justify-content-around">
                <a className="text-center icon">
                  <img
                    src="https://www.icicibank.com/managed-assets/images/bottom-grid/DisplayImage_InternetBanking.png"
                    className="m-0"
                    width="120px"
                  />
                  <h5 style={{ fontWeight: "500" }}>Internet Banking</h5>
                </a>
                <a className="text-center icon">
                  <img
                    src="https://www.icicibank.com/managed-assets/images/bottom-grid/DisplayImage_MobileBanking.png"
                    className="m-0"
                    width="120px"
                  />
                  <h5 style={{ fontWeight: "500" }}>Mobile Banking</h5>
                </a>
                <a className="text-center icon">
                  <img
                    src="https://www.icicibank.com/managed-assets/images/bottom-grid/DisplayImage_Facebook.png"
                    className="m-0"
                    width="120px"
                  />
                  <h5 style={{ fontWeight: "500" }}>
                    Pocekts By Diffrent Bank
                  </h5>
                </a>
                <a className="text-center icon">
                  <img
                    src="https://www.icicibank.com/managed-assets/images/bottom-grid/DisplayImage_AtmBanking.png"
                    className="m-0"
                    width="120px"
                  />
                  <h5 style={{ fontWeight: "500" }}>Across All States</h5>
                </a>
              </div>
            </Col>
          </Row>
        </Jumbotron>
      </>
    );
  }
}
