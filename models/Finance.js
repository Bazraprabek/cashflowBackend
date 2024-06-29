const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Finance extends Model {}

Finance.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
