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
  },

  {
    sequelize,

    modelName: "UserBank",
    tableName: "userbank",
    timestamps: true,
  }
);

// UserBank.associate = (models) => {
//   UserBank.hasMany(models.Transaction, {
//     foreignKey: "toBankAccountId",
//   });
// };

// UserBank.associate = (models) => {
//   UserBank.hasMany(models.Transaction, {
//     foreignKey: "fromBankAccountId",
//   });
// };

module.exports = UserBank;
