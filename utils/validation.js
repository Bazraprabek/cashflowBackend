const AppError = require("../middleware/AppError");
// const Bank = require("../models/finance/Bank");
const UserBank = require("../models/finance/UserBank");
const UserWallet = require("../models/finance/UserWallet");
// const Wallet = require("../models/finance/Wallet");

const isValidDate = (dateString) => {
  console.log("frontend", dateString);
  const date = new Date(dateString);
  console.log("backend", date);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
};

async function validateTransaction(req, next, body) {
  let {
    type,
    amount,
    issuedAt,
    cashType,
    fromBankAccountId,
    toBankAccountId,
    fromWalletAccountId,
    toWalletAccountId,
    source,
    chequeIssueDate,
    chequeCashoutDate,
    chequeCashoutAvailableData,
    alert,
    userId,
  } = body;

  if (
    (chequeIssueDate && !isValidDate(chequeIssueDate)) ||
    (chequeCashoutAvailableData && !isValidDate(chequeCashoutAvailableData)) ||
    (chequeCashoutDate && !isValidDate(chequeCashoutDate))
  ) {
    return next(new AppError("Invalid format"), 400);
  }

  // Check for essential fields
  if (!type || !amount) {
    return next(new AppError("Please provide all the required fields", 400));
  }

  // Validate transaction type and corresponding account IDs
  const typeRequirements = {
    deposit: {
      required: "toBankAccountId",
      missingMsg: "toAccountId for deposit transactions",
    },
    withdraw: {
      required: "fromBankAccountId",
      missingMsg: "fromAccountId for withdraw transactions",
    },
    transfer: {
      required: ["toBankAccountId", "fromBankAccountId"],
      missingMsg:
        "both toAccountId and fromAccountId for transfer transactions",
    },
  };

  let requirement = typeRequirements[type];
  if (!requirement) {
    return next(
      new AppError(
        "Invalid transaction type. Allowed types are: deposit, withdraw, transfer",
        400
      )
    );
  }

  let requiredFields = Array.isArray(requirement.required)
    ? requirement.required
    : [requirement.required];
  for (let field of requiredFields) {
    if (!body[field]) {
      return next(
        new AppError(`Please provide ${requirement.missingMsg}`, 400)
      );
    }
  }

  // Set account IDs to null if not needed
  if (type === "deposit") {
    fromBankAccountId = null;
    fromWalletAccountId = null;
  } else if (type === "withdraw") {
    toBankAccountId = null;
    toWalletAccountId = null;
  }

  // Validate that both accounts are not the same for transfer transactions
  if (
    (type === "transfer" && toBankAccountId === fromBankAccountId) ||
    toWalletAccountId === fromWalletAccountId
  ) {
    return next(
      new AppError(
        "Both accounts cannot be the same for transfer transactions",
        404
      )
    );
  }

  // Validate account existence
  let bankaccountIds = [];
  if (toBankAccountId) bankaccountIds.push(toBankAccountId);
  if (fromBankAccountId) bankaccountIds.push(fromBankAccountId);

  for (const accountId of bankaccountIds) {
    const account = await UserBank.findByPk(accountId);
    if (!account) {
      return next(new AppError("Account does not exist.", 404));
    }
    if (userId !== req.userId) {
      return next(new AppError("Unauthorized User.", 401));
    }
  }

  let walletaccountIds = [];
  if (toWalletAccountId) walletaccountIds.push(toWalletAccountId);
  if (fromWalletAccountId) walletaccountIds.push(fromWalletAccountId);

  for (const accountId of walletaccountIds) {
    const account = await UserWallet.findByPk(accountId);
    if (!account) {
      return next(new AppError("Account does not exist.", 404));
    }
    if (userId !== req.userId) {
      return next(new AppError("Unauthorized User.", 401));
    }
  }

  console.log("Validation passed");
  return {
    type,
    amount,
    issuedAt,
    cashType,
    fromBankAccountId,
    toBankAccountId,
    fromWalletAccountId,
    toWalletAccountId,
    source,
    chequeIssueDate,
    chequeCashoutDate,
    chequeCashoutAvailableData,
    alert,
    userId,
  };
}

module.exports = { validateTransaction };
