import React from "react";
import { Doughnut } from "react-chartjs-2";
class Chart extends React.Component {
  state = {
    labels: ["Min Price", "Max Price", "Modal Price"],
    datasets: [
      {
        data: [
          this.props.item.min_price,
          this.props.item.max_price,
          this.props.item.modal_price,
        ],
        backgroundColor: ["#28ca2f", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#28ca2f", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  render() {
    return (
      <>
        <div>
          <h4>
            {" "}
            <span style={{ color: "#28ca2f" }}>Commodity Name-</span>
            {this.props.item.commodity}
          </h4>
          <h4>
            {" "}
            <span style={{ color: "#28ca2f" }}>Variety Name-</span>
            {this.props.item.variety}
          </h4>
          <Doughnut data={this.state} />
        </div>
      </>
    );
  }
}

export default Chart;
