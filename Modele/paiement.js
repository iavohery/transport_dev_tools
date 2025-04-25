const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Paiement = sequelize.define('Paiement', {
  idpaiement: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  montant_total: { type: DataTypes.INTEGER, allowNull: false },
  mode_paiment: { type: DataTypes.INTEGER, allowNull: false },
  statut: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'paiement',
  timestamps: false
});

module.exports = Paiement;