const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Poids = sequelize.define('Poids', {
  idpoids: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  min: { type: DataTypes.INTEGER, allowNull: false },
  max: { type: DataTypes.INTEGER, allowNull: false },
  prix: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'poids',
  timestamps: false
});

module.exports = Poids;