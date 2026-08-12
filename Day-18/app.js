// app.js — entry point: imports data and logic, prints the report

import { transactions, correctedTx } from "./transactions.js";
import { totalByType, buildReceipts, correctAmount } from "./report.js";

// ── Report Header ────────────────────────────────────────────
console.log("═══════════════════════════════════════");
console.log("     TeleBirr Transaction Report       ");
console.log("═══════════════════════════════════════");

// ── Receipts (map + destructuring) ──────────────────────────
buildReceipts(transactions).forEach((line) => console.log(line));

// ── Totals (filter + reduce) ─────────────────────────────────
console.log("───────────────────────────────────────");
console.log(`Total Credits : ${totalByType(transactions, "credit")} ETB`);
console.log(`Total Debits  : ${totalByType(transactions, "debit")}  ETB`);

// ── Spread demo: corrected transaction ───────────────────────
console.log("───────────────────────────────────────");
console.log("Original tx #3 :", transactions[2]);
console.log("Corrected tx #3:", correctedTx);

// correctAmount used inline — original still unchanged
const fixed = correctAmount(transactions[4], 300);
console.log("Inline fix tx #5:", fixed);
console.log("Original tx #5 :", transactions[4]);
console.log("═══════════════════════════════════════");
