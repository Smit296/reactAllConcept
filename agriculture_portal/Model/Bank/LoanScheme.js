const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LoanSchema = new mongoose.Schema(
  {
    schemeName: {
      type: String,
    },
    interestRate: {
      type: Number,
    },
    maxLimit: {
      type: Number,
    },
    documentRequired: {
      type: String,
    },
    description: {
      type: String,
    },
    bankName: {
      type: String,
    },
  },

  {
    collection: "LoanScheme",
  }
);

const LoanScheme = mongoose.model("LoanScheme", LoanSchema);
module.exports = LoanScheme;
