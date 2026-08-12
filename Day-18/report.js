// report.js — pure summary functions for TeleBirr transactions

// Total ETB for a given type ("credit" | "debit")
export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

// Formatted receipt string per transaction (destructures callback param)
export const buildReceipts = (txns) =>
  txns.map(
    ({ id, customer, amount, type }) =>
      `#${id} | ${customer.padEnd(8)} | ${type.toUpperCase().padEnd(6)} | ${amount} ETB`
  );

// Spread: return a corrected copy without mutating the original
export const correctAmount = (tx, newAmount) => ({ ...tx, amount: newAmount });
