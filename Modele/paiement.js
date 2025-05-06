const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Paiement = sequelize.define(
  "Paiement",
  {
    idpaiement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    montant_total: { type: DataTypes.INTEGER, allowNull: false },
    mode_paiment: { type: DataTypes.STRING, allowNull: false },
    statut: { type: DataTypes.STRING, allowNull: false, defaultValue: "Payer" },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "paiement",
    timestamps: false,
  }
);

module.exports = Paiement;
