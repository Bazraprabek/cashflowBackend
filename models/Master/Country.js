const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class Country extends Model {}

Country.init(
  {
    countryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Country",
  }
);

module.exports = Country;
