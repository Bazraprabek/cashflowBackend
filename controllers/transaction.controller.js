const Finance = require("../models/Finance");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

class transactionController {
  static async index(req, res) {
    try {
      const transaction = await Transaction.findAll();
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createTransaction(req, res) {
    const {
      userId,
      fullname,
      financeId,
      accountNumber,
      status,
      type,
      amount,
      remarks,
    } = req.body;

    try {
      // Ensure the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Ensure the bank exists or create it
      let financeRecord = await Finance.findOne({
        where: { id: financeId, accountNumber },
      });
      if (!financeRecord) {
        financeRecord = await Finance.create({ name: "Prabhu", accountNumber });
      }

      // Create the transaction
      const transaction = await Transaction.create({
        userId: user.id,
        fullname,
        financeId: financeRecord.id,
        status,
        type,
        amount,
        remarks,
      });

      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateTransaction(req, res) {
    const { id } = req.params;
    const { status, type, amount, remarks } = req.body;

    try {
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      transaction.status = status;
      transaction.type = type;
      transaction.amount = amount;
      transaction.remarks = remarks;
      await transaction.save();

      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteTransaction(req, res) {
    const { id } = req.params;

    try {
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      await transaction.destroy();
      res.status(200).json({ id: id, msg: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = transactionController;
