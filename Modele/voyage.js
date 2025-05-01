const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Voyage = sequelize.define('Voyage', {
  
}, {
  tableName: 'voyage',
  timestamps: false
});

module.exports = Voyage;
