const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class Currency extends Model {}

Currency.init(
  {
    currencyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Countries', // Name of the table in the database
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Currency",
  }
);

module.exports = Currency;
