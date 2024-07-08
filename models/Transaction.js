const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Finance = require("./Finance");

class Transaction extends Model {}

Transaction.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["deposit", "withdraw", "transfer"]],
      },
    },
    cashType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["cash", "cheque"]],
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fromAccountId: {
      type: DataTypes.INTEGER,
      references: {
        model: Finance, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },
    toAccountId: {
      type: DataTypes.INTEGER,
      references: {
        model: Finance, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },
    issuedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);

// Transaction.belongsTo(User, { foreignKey: "userId" });
// Transaction.associate = (models) => {
//   Transaction.belongsTo(models.Finance, {
//     as: "fromAccount",
//     foreignKey: "fromAccountId",
//   });
//   Transaction.belongsTo(models.Finance, {
//     as: "toAccount",
//     foreignKey: "toAccountId",
//   });
// };

module.exports = Transaction;
