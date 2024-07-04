const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Bank = require("../models/finance/Bank");
const Wallet = require("../models/finance/Wallet");

class Finance extends Model {}

Finance.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("bank", "wallet"),
      allowNull: false,
      defaultValue: "bank",
    },
  },
  {
    sequelize,
    modelName: "Finance",
  }
);

module.exports = Finance;
