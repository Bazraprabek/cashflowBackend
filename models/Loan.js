const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Loan extends Model {}

Loan.init(
  {
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    principal: { type: DataTypes.FLOAT, allowNull: false },
    interestRate: { type: DataTypes.FLOAT, allowNull: false },
    tenureMonths: { type: DataTypes.INTEGER, allowNull: false },
    startDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    remainingBalance: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: "Loan",
  }
);

module.exports = Loan;
