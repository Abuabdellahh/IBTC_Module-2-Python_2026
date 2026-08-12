// Total ETB for a given type ("credit" | "debit")
export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

// Net balance: credits − debits
export const netBalance = (txns) =>
  totalByType(txns, "credit") - totalByType(txns, "debit");

// Formatted receipt string per transaction
export const buildReceipts = (txns) =>
  txns.map(
    ({ id, customer, amount, type }) =>
      `#${id} | ${customer.padEnd(8)} | ${type.toUpperCase().padEnd(6)} | ${amount} ETB`
  );

// Returns a corrected copy — original is never mutated
export const correctAmount = (tx, newAmount) => ({ ...tx, amount: newAmount });
