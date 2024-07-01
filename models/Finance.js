const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

class Finance extends Model {}

Finance.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
