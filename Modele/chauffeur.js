const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Chauffeur = sequelize.define('Chauffeur', {
  idchauffeur: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numcin: { type: DataTypes.STRING, allowNull: false },
  nom: { type: DataTypes.STRING, allowNull: false },
  numtel: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'chauffeur',
  timestamps: false
});

module.exports = Chauffeur;