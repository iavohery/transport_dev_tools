const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Reserver = sequelize.define(
  "Reserver",
  {
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  {
    tableName: "reserver",
    timestamps: false,
  }
);

module.exports = Reserver;
