import React, { useState } from "react";
import { Popover, Image, Spinner, Button } from "react-bootstrap";
import LoanForm from "./applyLoanForm";
import { connect } from "react-redux";

import axios from "axios";

class Applyloan extends React.Component {
  state = {
    loading: false,
    show: false,
  };

  componentDidMount = async () => {
    await fetch("/loan_get").then((res) => {
      res.json().then((data) => {
        this.props.dispatch({
          type: "add_loanlist",
          payload: data,
        });
        this.setState({
          loading: true,
        });
      });
    });
  };
  render() {
    let { loanslist } = this.props;

    return (
      <>
        {this.state.loading && (
          <>
            <div class="d-flex  flex-wrap  justify-content-around mt-1 mb-3">
              {loanslist &&
                loanslist.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <div
                        style={{
                          width: "22rem",
                          height: "23rem",
                          boxShadow: "green  0px 5px 7px 3px",
                        }}
                        className="border border-ligh p-3 m-5"
                      >
                        <h4>
                          <span style={{ color: "#28ca2f" }}>
                            {item.schemeName}
                          </span>{" "}
                          <hr />
                        </h4>
                        <h6>
                          <span style={{ color: "#28ca2f" }}>
                            <b> Interest Rate-</b>
                          </span>
                          {item.interestRate} %{" "}
                        </h6>
                        <h6>
                          <span style={{ color: "#28ca2f" }}>
                            <b> Maximun Loan Amount-</b>
                          </span>
                          {item.maxLimit} L{" "}
                        </h6>
                        <h6>
                          <span style={{ color: "#28ca2f" }}>
                            <b> Documents Needed-</b>
                          </span>
                          {item.documentRequired}{" "}
                        </h6>
                        <h6>
                          <span style={{ color: "#28ca2f" }}>
                            <b>Providing Bank-</b>
                          </span>
                          {item.bankName}{" "}
                        </h6>
                        <span>{item.description}</span>
                        <br />
                        <LoanForm item={item} />
                        {item.bankName == "axis" ? (
                          <Image
                            src="https://www.freshersvoice.com/wp-content/uploads/2017/03/Axis-Bank-Recruitment.png"
                            roundedCircle
                            style={{
                              width: "4rem",
                              height: "4rem",
                              marginLeft: "3rem",
                            }}
                          />
                        ) : null}
                        {item.bankName == "icici" ? (
                          <Image
                            src="https://rozgarpatrika.com/wp-content/uploads/2019/06/icici-bank-logo.jpg"
                            roundedCircle
                            style={{
                              width: "4rem",
                              height: "4rem",
                              marginLeft: "3rem",
                            }}
                          />
                        ) : null}
                        {item.bankName == "SBI" ? (
                          <Image
                            src="https://www.wordzz.com/wp-content/uploads/2016/10/sbi.jpg"
                            roundedCircle
                            style={{
                              width: "4rem",
                              height: "4rem",
                              marginLeft: "3rem",
                            }}
                          />
                        ) : null}
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}
        {!this.state.loading && (
          <>
            <Spinner animation="grow" variant="success" />
            <h3>Loading.........</h3>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.bankState.loanList.data);
  return {
    loanslist: state.bankState.loanList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applyloan);
