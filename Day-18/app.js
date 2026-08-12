import { transactions } from "./transactions.js";
import { totalByType, netBalance, buildReceipts, correctAmount } from "./report.js";

const LINE  = "───────────────────────────────────────";
const THICK = "═══════════════════════════════════════";

console.log(THICK);
console.log("     TeleBirr Transaction Report       ");
console.log(THICK);

// map + destructuring: one receipt per transaction
buildReceipts(transactions).forEach((line) => console.log(line));

// filter + reduce: totals
console.log(LINE);
console.log(`Credits : ${totalByType(transactions, "credit")} ETB`);
console.log(`Debits  : ${totalByType(transactions, "debit")} ETB`);
console.log(`Net     : ${netBalance(transactions)} ETB`);

// spread: corrected copy — original unchanged
console.log(LINE);
const original  = transactions[2];
const corrected = correctAmount(original, 200);
console.log("Original :", original);
console.log("Corrected:", corrected);
console.log(THICK);
