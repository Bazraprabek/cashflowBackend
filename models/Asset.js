const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Asset = sequelize.define("Asset", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Asset;
