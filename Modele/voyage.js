const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../db");

const Voyage = sequelize.define(
  "Voyage",
  {
    idvoyage: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en attente",
    },
    heure_depart: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "voyage",
    timestamps: false,
  }
);

module.exports = Voyage;
