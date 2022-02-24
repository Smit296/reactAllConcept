import React, { Component } from "react";
import { Row, Col, Table, Badge } from "react-bootstrap";
import { UserCard } from "react-ui-cards";
import AddLoanScheme from "./addLoanScheme";
import axios from "axios";
export default class BankDashboard extends Component {
  state = {
    farmer: [],
    count: 1,
  };
  componentDidMount = async () => {
    await fetch("/farmer_get").then((res) => {
      res.json().then((data) => {
        var farmerFiltered = data.data.filter((value) => {
          return value.bankName === this.props.user.bankName;
        });
        this.setState({
          farmer: farmerFiltered,
        });
      });
    });
  };

  //funtion to handle delete
  handleDelete = async (value) => {
    await axios({
      method: "post",
      url: "/farmer_delete",
      data: {
        _id: value._id,
      },
    }).then((response) => {});
    await fetch("/farmer_get").then((res) => {
      res.json().then((data) => {
        var farmerFiltered = data.data.filter((value) => {
          return value.bankName === this.props.user.bankName;
        });
        this.setState({
          farmer: farmerFiltered,
        });
      });
    });
  };
  render() {
    let { bankName, registrationNumber, emailid, number } = this.props.user;
    var header;
    if (bankName === "axis")
      header =
        "https://www.searchpng.com/wp-content/uploads/2019/01/Axis-Bank-PNG-Logo--715x715.png";
    else if (bankName === "icici")
      header =
        "https://educationpostonline.in/wp-content/uploads/2018/09/ii.jpg";
    else if (bankName === "SBI")
      header =
        "https://www.logo-designer.co/wp-content/uploads/2017/04/2017-Design-Stack-new-logo-design-State-Bank-of-India.png";
    return (
      <>
        <div class="d-inline-flex flex-wrap">
          <div>
            <UserCard
              float
              header={header}
              name={emailid}
              stats={[
                {
                  name: "Bank",
                  value: bankName,
                },
                {
                  name: "Contact Number",
                  value: number,
                },
                {
                  name: "Registration Number",
                  value: registrationNumber,
                },
              ]}
            />
          </div>
          <div class="  flex-grow-1">
            {this.state.farmer && (
              <>
                <h4>
                  {" "}
                  <span style={{ color: "#28ca2f" }}>
                    Farmer Applied For Loan in Your Bank <hr />
                  </span>
                </h4>
                <Table striped bordered hover responsive="sm" variant="success">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Addhar</th>
                      <th>Place</th>
                      <th>Appointment Date</th>
                      <th>Loan Scheme</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.farmer.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name} </td>
                          <td>{item.emailid} </td>
                          <td>{item.addhar} </td>
                          <td>{item.place} </td>
                          <td>{item.date} </td>
                          <td>{item.schemeName} </td>

                          <td>
                            <Badge
                              pill
                              variant="warning"
                              onClick={() => {
                                this.handleDelete(item);
                              }}
                            >
                              Delete Record
                            </Badge>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <AddLoanScheme bankName={bankName} className="m-3" />
                </Table>
              </>
            )}
            {!this.state.farmer && <h1>No One farmer Applied</h1>}
          </div>
        </div>
      </>
    );
  }
}
