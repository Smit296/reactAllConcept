const db = require("../Database/db-connection");
const Sequelize = require("sequelize");

const Company = db.define(
  "company",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company_name: {
      type: Sequelize.STRING,
    },
    GST_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    company_type: {
      type: Sequelize.STRING,
    },
    company_address: {
      type: Sequelize.STRING,
    },
    company_city: {
      type: Sequelize.STRING,
    },
    company_district: {
      type: Sequelize.STRING,
    },
    company_state: {
      type: Sequelize.STRING,
    },
    company_pincode: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

db.sync().then(() => console.log(" Company DB has created"));

module.exports = Company;
