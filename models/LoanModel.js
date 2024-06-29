const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Loan extends Model {}

Loan.init(
  {
    borrower: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    interestRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Loan",
  }
);

module.exports = Loan;
