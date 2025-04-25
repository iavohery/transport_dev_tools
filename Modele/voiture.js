const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Voiture = sequelize.define('Voiture', {
  idvoiture: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numero_matricule: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.STRING, allowNull: false },
  marque: { type: DataTypes.STRING, allowNull: false },
  capacite: { type: DataTypes.INTEGER, allowNull: false}
}, {
  tableName: 'voiture',
  timestamps: false
});

module.exports = Voiture;