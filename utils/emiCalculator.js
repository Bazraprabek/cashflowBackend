const calculateEMI = (principal, interestRate, tenureMonths) => {
  const monthlyInterestRate = interestRate / 12 / 100;
  return (
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1)
  );
};

module.exports = { calculateEMI };
