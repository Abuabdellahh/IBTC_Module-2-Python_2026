// transactions.js — source data for the TeleBirr report

export const transactions = [
  { id: 1, customer: "Almaz",   amount: 250, type: "debit"  },
  { id: 2, customer: "Dawit",   amount: 600, type: "credit" },
  { id: 3, customer: "Tigist",  amount: 180, type: "debit"  },
  { id: 4, customer: "Yonas",   amount: 450, type: "credit" },
  { id: 5, customer: "Hanna",   amount: 320, type: "debit"  },
];

// Spread: corrected copy of transaction #3 — original is NOT mutated
export const correctedTx = { ...transactions[2], amount: 200 };
