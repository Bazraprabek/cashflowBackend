const { Loan } = require("../models/LoanModel");
const CrudOperation = require("../controllers/shared/CrudOperation");

class LoanController {
  createLoan(req, res) {
    CrudOperation.createEntity(req, res, Loan, (data) => {
      const nameValidation =
        !!data.borrower &&
        !!data.amount &&
        !!data.interestRate &&
        !!data.duration;
      const dbValidation = true; // Add more validation logic if needed
      return { nameValidation, dbValidation };
    });
  }

  getAllLoans(req, res) {
    CrudOperation.getAllEntites(req, res, Loan);
  }

  getLoanById(req, res) {
    CrudOperation.getEntityById(req, res, Loan);
  }

  updateLoan(req, res) {
    CrudOperation.updateEntity(req, res, Loan, (updatedValue, currentModel) => {
      Object.assign(currentModel, updatedValue);
      return currentModel;
    });
  }

  deleteLoan(req, res) {
    CrudOperation.deleteEntity(req, res, Loan);
  }
}

module.exports = new LoanController();
