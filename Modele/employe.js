const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employe = sequelize.define('Employe', {
  idemploye: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  salaire: { type: DataTypes.INTEGER, allowNull: false },
  date_embauche: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: 'employe',
  timestamps: false
});

module.exports = Employe;