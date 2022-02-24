const db = require('../Database/db-connection');
const Sequelize = require('sequelize');

const Address = db.define('address', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  locality: {
    type: Sequelize.STRING,
  },
  district: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pincode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false
});

db.sync()
  .then(() => console.log('Address DB has created'))

module.exports = Address;