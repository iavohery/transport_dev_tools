const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Depense = sequelize.define('Depense', {
  iddepense: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  montant: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
}, {
  tableName: 'depense',
  timestamps: false
});

module.exports = Depense;