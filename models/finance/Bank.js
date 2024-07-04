const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class Bank extends Model {}

Bank.init(
  {
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    swiftcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbr: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accountAvailable: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    interestRate: {
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Bank",
    tableName: "bank",
    timestamps: true,
  }
);

module.exports = Bank;
