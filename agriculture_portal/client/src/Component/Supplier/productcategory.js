import React from "react";
import ProductRegister from "./productregistration.js";
class Productcategory extends React.Component {
  state = {
    seed: {
      subject: "Seeds and Pestisides",
      type: ["Choose type ", "Seed", "Pesticides"],
      target: ["Choose target Crop", "Rice", "Paddy", "Maize", "Fruits"],
      price: "Price",
      size: "Size i.e 10 ml, 100 ml",
      dosage: "Dosage per hectare",
      description: "Add some description",
    },
    machine: {
      subject: "Machine for Rent",
      type: ["Choose type ", "Tractor", "Pesticider"],
      target: ["Choose target Crop", "Rice", "Paddy", "Maize", "Fruits"],
      price: "Rent Per Hour",
      size: "Power ie. 10Hw",
      dosage: "Max day to Hire",
      description: "Application i.e Picking, Binning",
    },
  };
  render() {
    return (
      <>
        <ProductRegister
          product={this.props.machine ? this.state.machine : this.state.seed}
        />
      </>
    );
  }
}
export default Productcategory;
