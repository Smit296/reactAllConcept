const db = require("../../Database/db-connection");
const Sequelize = require("sequelize");

const SupplierInfo = db.define(
  "SupplierInfo",
  {
    supplier_name: {
      type: Sequelize.STRING
    },
    supplier_email: {
      type: Sequelize.STRING
    },
    supplier_mobile: {
      type: Sequelize.BIGINT(10)
    },
    supplier_password: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

db.sync().then(() => console.log(" SupplierInfo DB has created"));

module.exports = SupplierInfo;
