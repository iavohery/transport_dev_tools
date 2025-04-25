const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Place = sequelize.define('Place', {
  idplace: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numplace: { type: DataTypes.STRING, allowNull: false },
  statut: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'place',
  timestamps: false
});

module.exports = Place;
