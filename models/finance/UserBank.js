const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const Transaction = require("../Transaction");
const Bank = require("./Bank");
const User = require("../User");

class UserBank extends Model {}

UserBank.init(
  {
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    bankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bank,
        key: "id",
      },
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentAmount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    transactionHistory: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Transaction,
        key: "id",
      },
    },
  },

  {
    sequelize,

    modelName: "UserBank",
    tableName: "userbank",
    timestamps: true,
  }
);

module.exports = UserBank;
