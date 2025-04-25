const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Posseder = sequelize.define('Posseder', {
}, {
  tableName: 'posseder',
  timestamps: false
});

module.exports = Posseder;