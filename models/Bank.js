const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const BankUtil = require("../utils/Bank");

class Bank extends Model {}

Bank.init(
  {
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbr: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accountAvailable: {
      type: DataTypes.STRING,
      defaultValue: BankUtil.getBankTypes.SAVING,
      allowNull: true,
    },
    interestRate: {
      type: DataTypes.STRING,
      //   defaultValue: BankUtil.useBankTypes()[1].rate,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Bank",
  }
);

module.exports = Bank;
