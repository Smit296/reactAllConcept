const db = require("../../Database/db-connection");
const Sequelize = require("sequelize");

const Menu = db.define(
  "menu",
  {
    item_name: {
      type: Sequelize.STRING
    },
    cuisine_name: {
      type: Sequelize.STRING
    },
    type_name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

db.sync().then(() => console.log(" Menu DB has created"));

module.exports = Menu;
