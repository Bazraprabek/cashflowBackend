const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class Wallet extends Model {}

Wallet.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Wallet",
    tableName: "wallet",
    timestamps: true,
  }
);

module.exports = Wallet;
