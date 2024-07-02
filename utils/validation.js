const AppError = require("../middleware/AppError");
const Finance = require("../models/Finance");

async function validateTransaction(req, next, body) {
  let {
    type,
    amount,
    issuedAt,
    cashType,
    toAccountId,
    fromAccountId,
    remarks,
  } = body;

  // Check for essential fields
  if (!type || !amount || !issuedAt) {
    return next(new AppError("Please provide all the required fields", 400));
  }

  // Validate transaction type and corresponding account IDs
  const typeRequirements = {
    deposit: {
      required: "toAccountId",
      missingMsg: "toAccountId for deposit transactions",
    },
    withdraw: {
      required: "fromAccountId",
      missingMsg: "fromAccountId for withdraw transactions",
    },
    transfer: {
      required: ["toAccountId", "fromAccountId"],
      missingMsg:
        "both toAccountId and fromAccountId for transfer transactions",
    },
  };

  const requirement = typeRequirements[type];
  if (!requirement) {
    return next(
      new AppError(
        "Invalid transaction type. Allowed types are: deposit, withdraw, transfer",
        400
      )
    );
  }

  const requiredFields = Array.isArray(requirement.required)
    ? requirement.required
    : [requirement.required];
  for (const field of requiredFields) {
    if (!body[field]) {
      return next(
        new AppError(`Please provide ${requirement.missingMsg}`, 400)
      );
    }
  }

  // Set account IDs to null if not needed
  if (type === "deposit") {
    fromAccountId = null;
  } else if (type === "withdraw") {
    toAccountId = null;
  }

  // Validate that both accounts are not the same for transfer transactions
  if (type === "transfer" && toAccountId === fromAccountId) {
    return next(
      new AppError(
        "Both accounts cannot be the same for transfer transactions",
        404
      )
    );
  }

  // Validate account existence
  const accountIds = [];
  if (toAccountId) accountIds.push(toAccountId);
  if (fromAccountId) accountIds.push(fromAccountId);

  for (const accountId of accountIds) {
    const account = await Finance.findByPk(accountId);
    if (!account) {
      return next(new AppError("Account does not exist.", 404));
    }
    if (account.userId !== req.userId) {
      return next(new AppError("Unauthorized User.", 401));
    }
  }

  console.log("Validation passed");
  return {
    type,
    amount,
    issuedAt,
    cashType,
    toAccountId,
    fromAccountId,
    remarks,
  };
}

module.exports = { validateTransaction };
