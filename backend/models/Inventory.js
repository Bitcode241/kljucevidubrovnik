// backend/models/Inventory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define('Inventory', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  entryDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  exitDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Na Skladištu', 'Prodan', 'Reserviran'),
    defaultValue: 'Na Skladištu'
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  salePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
});

module.exports = Inventory;