# TeleBirr Transaction Report

A mini-project that processes TeleBirr transactions using modern JavaScript —
`map`, `filter`, `reduce`, destructuring, spread, and ES modules.

## Modules

| File | Responsibility |
|------|---------------|
| `transactions.js` | Exports the raw `transactions` array and a spread-corrected copy (`correctedTx`) |
| `report.js` | Exports pure functions: `totalByType` (filter + reduce), `buildReceipts` (map + destructuring), `correctAmount` (spread) |
| `app.js` | Entry point — imports both modules and prints the formatted report to the console |

## Run

```bash
node app.js
```

> Requires Node.js 14+ (ES module support). Add `"type": "module"` to a `package.json` in this folder, or rename files to `.mjs`.

## Sample Output

```
═══════════════════════════════════════
     TeleBirr Transaction Report
═══════════════════════════════════════
#1 | Almaz    | DEBIT  | 250 ETB
#2 | Dawit    | CREDIT | 600 ETB
#3 | Tigist   | DEBIT  | 180 ETB
#4 | Yonas    | CREDIT | 450 ETB
#5 | Hanna    | DEBIT  | 320 ETB
───────────────────────────────────────
Total Credits : 1050 ETB
Total Debits  : 750  ETB
───────────────────────────────────────
Original tx #3 : { id: 3, customer: 'Tigist', amount: 180, type: 'debit' }
Corrected tx #3: { id: 3, customer: 'Tigist', amount: 200, type: 'debit' }
═══════════════════════════════════════
```

## Checklist

- [x] `filter`, `map`, `reduce` — no manual loops
- [x] Callback destructures `{ customer, amount }` in `buildReceipts`
- [x] Spread produces a new object; original transaction is unchanged
- [x] Logic split across three modules with clear `export`/`import`
- [x] Receipt strings use template literals showing customer and ETB amount
