const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Poste = sequelize.define('Poste', {
  idposte: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom_poste: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'poste',
  timestamps: false
});

module.exports = Poste;