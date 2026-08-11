# Day-17: Habesha Eatery Order Module

## Overview
A small module of **pure functions** plus one **closure-based receipt maker**
that prices orders in ETB with VAT, a member discount, and a running order
number. The goal is functional composition: tiny, testable pieces snapped
together.

## The Pieces (`order.js`)

| Function | Kind | Job |
|---|---|---|
| `subtotal(...prices)` | pure | Sums item prices via a `reduce` callback |
| `discountBy(rate)` | factory | Returns an arrow that applies that discount |
| `withVat(amount, rate?)` | pure | Adds VAT (default 15%) on top |
| `toETB(amount)` | pure | Formats a number as `"207.00 ETB"` |
| `makeReceiptMaker()` | closure | Returns a printer with a **private** running order number |
| `priceOrder(...prices)` | composed | `subtotal → member discount → VAT` |

### Why closure?
`makeReceiptMaker()` keeps `orderNumber` private — no caller can read or reset
it. Each call to the returned function increments and prints
`"#n: amount ETB"`.

```js
const printReceipt = makeReceiptMaker();
printReceipt(207);   // "#1: 207.00 ETB"
printReceipt(517.5); // "#2: 517.50 ETB"
```

## Pricing Rules
- **Member discount:** 10% off the subtotal
- **VAT:** 15% added after the discount
- **Format:** two decimal places, suffixed with `ETB`

## Execution
```bash
node run.js
```

## Expected Output
Output must match `expected.txt` exactly:

```
#1: 207.00 ETB
#2: 517.50 ETB
#3: 93.15 ETB
#4: 424.35 ETB
```

Verify:
```bash
node run.js | diff - expected.txt && echo "MATCH"
```

## Self-Check Checklist
- [x] `subtotal(...prices)` uses a `reduce` callback
- [x] `discountBy(rate)` is a factory returning an arrow
- [x] `withVat` and `toETB` are small pure helpers
- [x] `makeReceiptMaker()` holds a private order number in a closure
- [x] Receipts print as `#n: amount ETB`
- [x] `node run.js` matches `expected.txt` character-for-character
- [x] Pure calculation is separated from output/formatting
- [x] Code is clean, self-documenting, 2-space indented
