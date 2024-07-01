const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class Investors extends Model {}

Investors.init(
  {
    // userDetails: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
    investmentDetails: {
      type: DataTypes.INTEGER,
      references: {
        model: "investment",
        key: "id",
      },
    },
    purchasedStock: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    returnedValue: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "investor",
    tableName: "investor",
    timestamps: true,
  }
);

module.exports = Investors;
