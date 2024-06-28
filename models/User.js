const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "superadmin"), // Example enum values
      allowNull: false,
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
