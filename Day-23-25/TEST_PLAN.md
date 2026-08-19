# Addis Eats — Manual Test Plan

## Happy Path
- [ ] Page loads → menu shows 12 dishes
- [ ] Search "doro" → only Doro Wat shows
- [ ] Search cleared → all dishes return
- [ ] Filter "Vegetarian" → only vegetarian dishes show
- [ ] Filter "All" → all dishes return
- [ ] Click "+ Add" → item appears in cart with qty 1
- [ ] Click "+ Add" again → qty increments to 2
- [ ] Click "+" in cart → qty increases
- [ ] Click "−" in cart → qty decreases
- [ ] Click "−" when qty is 1 → item removed from cart
- [ ] Click "✕" → item removed from cart
- [ ] Total updates correctly (price × qty, delivery fee logic)
- [ ] Reload page → cart is restored from localStorage
- [ ] Fill valid name + 09xxxxxxxx phone → order placed, confirmation shown
- [ ] Fill valid name + +2519xxxxxxxx phone → order placed
- [ ] Confirmation shows name, total, area, phone
- [ ] "Back to Menu" closes confirmation, cart is empty

## Validation
- [ ] Submit with empty name → "Please enter your name."
- [ ] Submit with bad phone (e.g. 07123) → phone error shown
- [ ] Submit with empty cart → "Your cart is empty" error
- [ ] Error clears on next valid submit

## Edge Cases
- [ ] Search with no matches → "No dishes found" message
- [ ] Filter with no matches → "No dishes found" message
- [ ] Break data URL (rename menu.json) → error message shown, no crash
- [ ] Delivery fee: total < 500 ETB → 30 ETB fee shown
- [ ] Delivery fee: total ≥ 500 ETB → "free delivery" shown

## Responsive
- [ ] Mobile (< 800px): single column, cart below menu
- [ ] Desktop (≥ 800px): menu left (2fr), cart right (1fr)
- [ ] Filter buttons wrap on small screens
- [ ] All tap targets usable on mobile

## Accessibility
- [ ] Tab through all interactive elements in logical order
- [ ] Form error announced by screen reader (aria-live)
- [ ] All buttons have aria-label where needed
- [ ] Heading order: h1 → h2 → h3
