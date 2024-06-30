const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const Investors = require("./Investors");

class Investment extends Model {}

Investment.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    interest: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    currentValue: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    tax: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "investment",
    tableName: "investment",
    timestamps: true,
  }
);

Investment.hasMany(Investors, { foreignKey: "investmentDetails" });
Investors.belongsTo(Investment, {
  foreignKey: "investmentDetails",
});

module.exports = Investment;
