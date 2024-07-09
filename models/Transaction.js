const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Bank = require("./finance/Bank");
const UserWallet = require("./finance/UserWallet");
const UserBank = require("./finance/UserBank");

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
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fromBankAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserBank, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },
    toBankAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserBank, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },

    fromWalletAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserWallet, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },
    toWalletAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserWallet, // References the Finance model
        key: "id", // Assumes the primary key of Finance model is 'id'
      },
    },
    issuedAt: {
      type: DataTypes.DATEONLY,
    },

    chequeIssueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    chequeCashoutDate: { type: DataTypes.DATEONLY, allowNull: true },

    chequeCashoutAvailableData: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    source: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    alert: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "Transaction",
    timestamps: true,
  }
);
// Transaction.associate = (models) => {
//   Transaction.belongsTo(models.UserBank, {
//     foreignKey: "toBankAccountId",
//     as: "userbank",
//   });
// };

// Transaction.associate = (models) => {
//   Transaction.belongsTo(models.UserBank, {
//     foreignKey: "fromBankAccountId",
//     as: "userbank",
//   });
// };

// // Transaction.belongsTo(User, { foreignKey: "userId" });
// // Transaction.associate = (models) => {
// //   Transaction.belongsTo(models.Finance, {
// //     as: "fromAccount",
// //     foreignKey: "fromAccountId",
// //   });
// //   Transaction.belongsTo(models.Finance, {
// //     as: "toAccount",
// //     foreignKey: "toAccountId",
// //   });
// // };

module.exports = Transaction;
