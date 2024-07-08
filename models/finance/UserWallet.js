const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const Transaction = require("../Transaction");
const User = require("../User");

class UserWallet extends Model {}

UserWallet.init(
  {
    walletName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },

    currentAmount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    transactionHistroy: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      references: {
        model: Transaction,
        key: "id",
      },
    },
  },

  {
    sequelize,
    modelName: "UserWallet",
    tableName: "userwallet",
    timestamps: true,
  }
);

module.exports = UserWallet;
