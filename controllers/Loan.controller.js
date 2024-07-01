// controllers/loanController.js
const Loan = require("../models/LoanModel");
const CrudOperation = require("../controllers/shared/CrudOperation");

// Validation callback function
const validateLoan = (data) => {
  const nameValidation =
    data.principal && data.interestRate && data.tenureMonths;
  const dbValidation = true; // Add more validations as necessary
  return { nameValidation, dbValidation };
};

// Calculate EMI callback function
const calculateEMIAndUpdate = (updatedValue, currentModel) => {
  const { principal, interestRate, tenureMonths } = updatedValue;
  const monthlyInterestRate = interestRate / (12 * 100);
  const monthlyEMI =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

  currentModel.principal = principal;
  currentModel.interestRate = interestRate;
  currentModel.tenureMonths = tenureMonths;
  currentModel.monthlyEMI = monthlyEMI;

  return currentModel;
};

exports.createLoan = (req, res) => {
  CrudOperation.createEntity(req, res, Loan, validateLoan);
};

exports.getAllLoans = (req, res) => {
  CrudOperation.getAllEntities(req, res, Loan);
};

exports.getLoanById = (req, res) => {
  CrudOperation.getEntityById(req, res, Loan);
};

exports.updateLoan = (req, res) => {
  CrudOperation.updateEntity(req, res, Loan, calculateEMIAndUpdate);
};

exports.deleteLoan = (req, res) => {
  CrudOperation.deleteEntity(req, res, Loan);
};
