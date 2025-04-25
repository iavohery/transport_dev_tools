const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Voyage = sequelize.define('Voyage', {
  date: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: 'voyage',
  timestamps: false
});

module.exports = Voyage;
