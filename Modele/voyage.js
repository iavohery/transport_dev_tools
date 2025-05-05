const { DataTypes, STRING } = require('sequelize');
const sequelize = require('../db');

const Voyage = sequelize.define('Voyage', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  statut: { type: DataTypes.STRING, allowNull: false, defaultValue: 'en attente' }
}, {
  tableName: 'voyage',
  timestamps: false
});

module.exports = Voyage;
