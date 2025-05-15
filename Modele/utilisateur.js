const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Utilisateur = sequelize.define(
  "Utilisateur",
  {
    iduser: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numcin: { type: DataTypes.STRING, allowNull: false },
    nom: { type: DataTypes.STRING, allowNull: false },
    numtel: { type: DataTypes.STRING, allowNull: false },
    mot_passe: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "utilisateur",
    timestamps: false,
  }
);

module.exports = Utilisateur;
