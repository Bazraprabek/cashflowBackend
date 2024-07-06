class Bank {
  constructor() {}

  static getBankTypes = {
    FIXED: "Fixed",
    SAVING: "Saving",
  };

  static bankData = [
    {
      bankName: "Nepal Investment Bank Limited",
      address: "Durbar Marg, Kathmandu",
      email: "info@nibl.com.np",
      contact: "01-4228229",
      website: "https://www.nibl.com.np",
      swiftcode: "NIBLNPKT",
      abbr: "NIBL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [5.0, 3.5, 7.5],
    },
    {
      bankName: "Nabil Bank Limited",
      address: "Kamaladi, Kathmandu",
      email: "nabilbank@nabilbank.com",
      contact: "01-4227181",
      website: "https://www.nabilbank.com",
      swiftcode: "NARBNPKA",
      abbr: "NABIL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [4.5, 3.0, 7.0],
    },
    {
      bankName: "Standard Chartered Bank Nepal Limited",
      address: "New Baneshwor, Kathmandu",
      email: "info.nepal@sc.com",
      contact: "01-4782333",
      website: "https://www.sc.com/np",
      swiftcode: "SCBLNPKA",
      abbr: "SCB",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [4.75, 3.25, 7.25],
    },
    {
      bankName: "Himalayan Bank Limited",
      address: "Thamel, Kathmandu",
      email: "info@himalayanbank.com",
      contact: "01-4250200",
      website: "https://www.himalayanbank.com",
      swiftcode: "HIMANPKA",
      abbr: "HBL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [5.1, 3.6, 7.6],
    },
    {
      bankName: "Nepal SBI Bank Limited",
      address: "Hattisar, Kathmandu",
      email: "info@nsbl.com.np",
      contact: "01-4435610",
      website: "https://www.nepalsbi.com.np",
      swiftcode: "NSBINPKA",
      abbr: "NSBL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [4.8, 3.4, 7.3],
    },
    {
      bankName: "Everest Bank Limited",
      address: "Lazimpat, Kathmandu",
      email: "info@everestbank.com",
      contact: "01-4443377",
      website: "https://www.everestbankltd.com",
      swiftcode: "EVBLNPKA",
      abbr: "EBL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [5.2, 3.7, 7.7],
    },
    {
      bankName: "Prabhu Bank Limited",
      address: "Babar Mahal, Kathmandu",
      email: "info@prabhubank.com",
      contact: "01-4788500",
      website: "https://www.prabhubank.com",
      swiftcode: "PRBLNPKA",
      abbr: "PRBL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [5.0, 3.5, 7.5],
    },
    {
      bankName: "Citizens Bank International Limited",
      address: "Narayanhiti Path, Kathmandu",
      email: "info@ctznbank.com",
      contact: "01-4445885",
      website: "https://www.ctznbank.com",
      swiftcode: "CTZBNPKA",
      abbr: "CTZB",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [5.1, 3.6, 7.6],
    },
    {
      bankName: "Machhapuchchhre Bank Limited",
      address: "Lazimpat, Kathmandu",
      email: "info@machbank.com",
      contact: "01-4444455",
      website: "https://www.machbank.com",
      swiftcode: "MBLNNPKA",
      abbr: "MBL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [5.3, 3.8, 7.8],
    },
    {
      bankName: "Sunrise Bank Limited",
      address: "Gairidhara, Kathmandu",
      email: "info@sunrisebank.com.np",
      contact: "01-4441978",
      website: "https://www.sunrisebank.com.np",
      swiftcode: "SRBLNPKA",
      abbr: "SRBL",
      accountAvailable: ["Savings", "Current", "Fixed Deposit"],
      interestRate: [5.4, 3.9, 7.9],
    },
  ];

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
