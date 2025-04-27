export const calculateCompoundInterest = (principal, rate, time, frequency = 12) => {
  if (rate === 0) return principal; // If rate is 0, interest is not applied
  return principal * Math.pow(1 + (rate / 100) / frequency, frequency * time);
};

export const calculateSIP = (investment, rate, time) => {
  if (rate === 0) return investment * time * 12; // If rate is 0, simple sum of investments
  
  const monthlyRate = rate / 12 / 100;
  const months = time * 12;
  return investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
};

export const calculateLoanEMI = (principal, rate, time) => {
  if (rate === 0) return principal / (time * 12); // If rate is 0, simple division
  
  const monthlyRate = rate / 12 / 100;
  const months = time * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};