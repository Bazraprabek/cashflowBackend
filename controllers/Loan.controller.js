const Loan = require("../models/LoanModel");

class LoanController {
  async createLoan(req, res) {
    try {
      const loan = await Loan.create(req.body);
      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllLoans(req, res) {
    try {
      const loans = await Loan.findAll();
      res.json(loans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLoanById(req, res) {
    try {
      const loan = await Loan.findByPk(req.params.id);
      if (loan) {
        res.json(loan);
      } else {
        res.status(404).json({ message: "Loan not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateLoan(req, res) {
    try {
      const loan = await Loan.findByPk(req.params.id);
      if (loan) {
        await loan.update(req.body);
        res.json(loan);
      } else {
        res.status(404).json({ message: "Loan not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteLoan(req, res) {
    try {
      const loan = await Loan.findByPk(req.params.id);
      if (loan) {
        await loan.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Loan not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LoanController();
