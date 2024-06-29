const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class EMI extends Model {}

EMI.init(
  {
    amount: { type: DataTypes.FLOAT, allowNull: false },
    dueDate: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "EMI",
  }
);

module.exports = EMI;
