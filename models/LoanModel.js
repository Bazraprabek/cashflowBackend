// models/Loan.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Loan = sequelize.define(
  "Loan",
  {
    principal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    interestRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tenureMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monthlyEMI: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    emiAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    nextPaymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Loan;
