const AppError = require("../middleware/AppError");
const EMI = require("../models/Emi");
const Loan = require("../models/Loan");
const { calculateEMI } = require("../utils/emiCalculator");
const { CrudOperation } = require("./shared/CrudOperation");

class loanController {
  static async index(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, Loan);
  }

  static async getLoanById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, Loan);
  }

  static async createLoan(req, res, next) {
    try {
      const { accountId, principal, interestRate, tenureMonths } = req.body;

      if (!accountId || !principal || !interestRate || !tenureMonths) {
        return next(
          new AppError("Please provide all the required fields", 400)
        );
      }

      const loan = await Loan.create({
        accountId,
        principal,
        interestRate,
        tenureMonths,
        remainingBalance: principal,
      });

      const emiAmount = calculateEMI(principal, interestRate, tenureMonths);
      const today = new Date();

      // Schedule EMIs
      for (let i = 1; i <= tenureMonths; i++) {
        const dueDate = new Date(
          today.getFullYear(),
          today.getMonth() + i,
          today.getDate()
        );
        await EMI.create({
          loanId: loan.id,
          amount: emiAmount,
          dueDate,
        });
      }

      res.status(201).json(loan);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteLoan(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, Loan);
  }
}

module.exports = loanController;
