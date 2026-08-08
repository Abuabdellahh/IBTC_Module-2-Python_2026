# Day-16: TeleBirr Tip & Split Calculator

## Overview
Build a Node.js script that calculates a tiered tip, adds a TeleBirr service fee, and splits the total bill evenly among a party.

## Requirements

### Input
- **bill**: The original bill amount in ETB (converted via `Number()`)
- **partySize**: The number of people splitting the bill

### Tip Calculation
- If bill > 300 ETB: add 10% tip
- Otherwise: add 5% tip

### TeleBirr Service Fee (via switch statement)
Apply based on tip amount:
- Tip ≥ 100 ETB: 15 ETB fee
- Tip ≥ 50 ETB: 10 ETB fee
- Tip ≥ 20 ETB: 5 ETB fee
- Otherwise: 0 ETB fee

### Output
Print a formatted receipt showing:
- Original bill amount
- Tip percentage and amount
- TeleBirr service fee
- Total amount (bill + tip + fee)
- Party size
- Amount per person

Use template literals for clear formatting.

## Execution
```bash
node tip.js
```

## Expected Output
The output must match `expected.txt` exactly, character-for-character.

## Self-Check Checklist

- [ ] tip.js reads and processes sample inputs correctly
- [ ] Tip calculation is 10% for bills > 300 ETB, else 5%
- [ ] TeleBirr fee calculation uses a switch statement
- [ ] Total is calculated as: bill + tip + fee
- [ ] Per-person amount is: total / partySize
- [ ] All currency amounts are formatted to 2 decimal places
- [ ] Output is formatted using template literals
- [ ] Console output matches expected.txt exactly
- [ ] Code is clean, readable, and well-organized
- [ ] No console.log statements left for debugging
- [ ] Script runs without errors: `node tip.js`

## Code Quality Standards
- Use meaningful variable names (no single letters except in loops)
- Separate concerns: pure calculation functions vs. output formatting
- No unnecessary comments; code is self-documenting
- Proper spacing and consistent indentation (2 spaces)
- Early return patterns where applicable
