const sequelize = require("../config/db");
const Bank = require("../models/finance/Bank");
const { bankData } = require("./Bank");
const db = require("././../config/db");

const insertBanks = async (req, res, next) => {
  try {
    await Bank.bulkCreate(bankData);
    res.status(200).send("Success");
    console.log("Banks inserted successfully!");
  } catch (error) {
    console.error("Error inserting banks: ", error);
  } finally {
    await db.close();
  }
};
module.exports = insertBanks;
