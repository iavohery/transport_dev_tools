const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Paiement_salaire = sequelize.define('Paiement_salaire', {
  idpaiment_salaire: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_paiement: { type: DataTypes.STRING, allowNull: false },
  mois_salaire: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: 'paiment_salaire',
  timestamps: false
});

module.exports = Paiement_salaire;