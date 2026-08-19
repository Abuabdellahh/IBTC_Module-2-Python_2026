# 🍽️ Addis Eats — Module 2 Capstone Project

A single-page food-ordering app for an Addis Ababa restaurant.  
Built for **Days 23–25, Module 2** — CodeOps Full Stack, IBT College Canada.

## Features

| Feature | Detail |
|---|---|
| Menu from data | 12 Ethiopian dishes loaded via `fetch` from `data/menu.json` |
| Live search | Filters by name and description as you type |
| Category filter | All / Main / Vegetarian / Breakfast / Sides / Drinks |
| Cart | Add, increment, decrement, remove; qty tracked per dish |
| ETB totals | `reduce` computes subtotal; 30 ETB delivery fee waived over 500 ETB |
| Persistence | Cart survives page reload via `localStorage` |
| Checkout | Validated form: name required, Ethiopian phone regex, non-empty cart |
| Confirmation | Order summary shown after successful placement |
| Responsive | Mobile-first CSS Grid; single column → 2-col at 800 px |
| Accessible | Semantic HTML5, `aria-label`, `aria-live`, logical heading order |

## How to run

Open `index.html` via a local server (required for `fetch`):

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## File structure

```
Day-23-25/
├── index.html        # Semantic HTML scaffold
├── styles.css        # CSS variables + mobile-first responsive layout
├── app.js            # State, load, render, events, validation
├── data/
│   └── menu.json     # 12 dish records
└── TEST_PLAN.md      # Manual test checklist
```

## Tech checklist

- [x] Semantic HTML5 (`header`, `main`, `section`, `aside`, `footer`, `article`)
- [x] CSS custom properties (tokens)
- [x] CSS Grid + Flexbox + media query
- [x] `fetch` + `async/await` + error handling
- [x] Single `state` object → `render()` loop
- [x] Event delegation (menu clicks, cart clicks)
- [x] `localStorage` save/load
- [x] Form validation with regex
- [x] XSS-safe HTML rendering (`escHtml`)
