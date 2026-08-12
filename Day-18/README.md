# Day-18 — TeleBirr Transaction Report

Processes TeleBirr transactions with `map`, `filter`, `reduce`, destructuring, spread, and ES modules.

## Modules

| File | Responsibility |
|------|----------------|
| `transactions.js` | Raw data — exports the `transactions` array |
| `report.js` | Pure functions — `totalByType`, `netBalance`, `buildReceipts`, `correctAmount` |
| `app.js` | Entry point — imports both modules and prints the report |
| `practice.js` | Day-18 challenge — `map` with destructuring on a products array |

## Run

```bash
node app.js
```

> Requires Node.js 14+. `"type": "module"` is set in `package.json`.

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
Credits : 1050 ETB
Debits  : 750 ETB
Net     : 300 ETB
───────────────────────────────────────
Original : { id: 3, customer: 'Tigist', amount: 180, type: 'debit' }
Corrected: { id: 3, customer: 'Tigist', amount: 200, type: 'debit' }
═══════════════════════════════════════
```

## Checklist

- [x] `filter`, `map`, `reduce` — no manual loops
- [x] Callback destructures `{ id, customer, amount, type }` in `buildReceipts`
- [x] Spread produces a new object; original transaction is unchanged
- [x] Logic split across three modules with clear `export` / `import`
- [x] Receipt strings use template literals showing customer and ETB amount
- [x] `transactions.js` is pure data — no logic or derived values
- [x] `report.js` is pure functions — no side effects
