const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Trajet = sequelize.define('Trajet', {
  idtrajet: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  point_depart: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  heure_depart: { type: DataTypes.STRING, allowNull: false },
  tarif: { type: DataTypes.INTEGER, allowNull: false}
}, {
  tableName: 'trajet',
  timestamps: false
});

module.exports = Trajet;