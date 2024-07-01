// controllers/paymentController.js
const EMIPayment = require("../models/EmiPayment");
const CrudOperation = require("../controllers/shared/CrudOperation");

// Validation callback function
const validatePayment = (data) => {
  const nameValidation = data.loanId && data.paymentDate && data.amountPaid;
  const dbValidation = true; // Add more validations as necessary
  return { nameValidation, dbValidation };
};

// Create a new payment
exports.createPayment = (req, res) => {
  CrudOperation.createEntity(req, res, EMIPayment, validatePayment);
};

// Get all payments
exports.getAllPayments = (req, res) => {
  CrudOperation.getAllEntities(req, res, EMIPayment);
};

// Get payment by ID
exports.getPaymentById = (req, res) => {
  CrudOperation.getEntityById(req, res, EMIPayment);
};

// Update a payment
exports.updatePayment = (req, res) => {
  CrudOperation.updateEntity(
    req,
    res,
    EMIPayment,
    (updatedValue, currentModel) => {
      currentModel.loanId = updatedValue.loanId;
      currentModel.paymentDate = updatedValue.paymentDate;
      currentModel.amountPaid = updatedValue.amountPaid;
      return currentModel;
    }
  );
};

// Delete a payment
exports.deletePayment = (req, res) => {
  CrudOperation.deleteEntity(req, res, EMIPayment);
};
