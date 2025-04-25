const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Colis = sequelize.define('Colis', {
  idcolis: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'colis',
  timestamps: false
});

module.exports = Colis;