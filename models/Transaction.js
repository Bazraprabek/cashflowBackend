const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Finance = require("./Finance");

class Transaction extends Model {}

Transaction.init(
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);

Transaction.belongsTo(User, { foreignKey: "userId" });
Transaction.belongsTo(Finance, { foreignKey: "financeId" });

module.exports = Transaction;
