// models/EMIPayment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EMIPayment = sequelize.define(
  "EMIPayment",
  {
    loanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amountPaid: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = EMIPayment;
