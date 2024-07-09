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
  },

  {
    sequelize,
    modelName: "UserWallet",
    tableName: "userwallet",
    timestamps: true,
  }
);

module.exports = UserWallet;
