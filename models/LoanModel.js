const pool = require("sequelize");
const sequelize = require("../config/db");

class Loan {
  static async create({ borrower, amount, interestRate, duration }) {
    const result = await pool.query(
      "INSERT INTO loans (borrower, amount, interest_rate, duration) VALUES ($1, $2, $3, $4) RETURNING *",
      [borrower, amount, interestRate, duration]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query("SELECT * FROM loans");
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM loans WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async update(id, { borrower, amount, interestRate, duration }) {
    const result = await pool.query(
      "UPDATE loans SET borrower = $1, amount = $2, interest_rate = $3, duration = $4 WHERE id = $5 RETURNING *",
      [borrower, amount, interestRate, duration, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM loans WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Loan;
