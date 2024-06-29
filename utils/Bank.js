class Bank {
  constructor() {}

  static getBankTypes = {
    FIXED: "Fixed",
    SAVING: "Saving",
  };

  static useBankTypes() {
    let bankTypes = [];
    let bankAccTypes = [this.getBankTypes.FIXED, this.getBankTypes.SAVING];
    const interestRate = [3.25, 4.15];
    interestRate.map((interest, i) => {
      const newType = {
        rate: interest,
        accountType: bankAccTypes[i],
      };
      bankTypes.push(newType);
    });
    return bankTypes;
  }
}

module.exports = Bank;
