# 🇪🇹 Birr Watch

A single-page, data-driven web app that tracks **live Ethiopian Birr (ETB) exchange rates**, converts amounts, and remembers your personal watchlist across reloads.

Built as the **Day 22 project** for CodeOps · Full Stack Software Development at IBT College Canada.

---

## What it does

| Feature | Detail |
|---|---|
| Live rates | Fetches real ETB exchange rates from a free public API on every load |
| Converter | Enter any ETB amount, pick a target currency, and see the result instantly |
| Reverse rate | Each conversion also shows the reverse (e.g. X USD → 1 ETB) |
| Watchlist | Save currencies you care about; each row shows the live rate |
| Persistence | Watchlist, selected currency, and last amount survive a page reload |
| Error handling | Loading, success, and error states are all shown to the user |
| Input validation | Rejects empty, zero, negative, non-numeric, and malformed decimal input |
| Refresh | A ↻ button refetches live rates on demand without reloading the page |

---

## The API

```
GET https://open.er-api.com/v6/latest/ETB
```

Provider: **[ExchangeRate API](https://open.er-api.com)** — free, no API key required.

Response shape:

```json
{
  "result": "success",
  "base_code": "ETB",
  "rates": {
    "USD": 0.0177,
    "EUR": 0.0164,
    "KES": 2.29,
    "GBP": 0.0139
  }
}
```

With ETB as the base, each rate is how much 1 Birr is worth in that currency.  
`500 ETB → USD = 500 × rates.USD`

---

## Project structure

```
day-22/
├── index.html   — semantic HTML skeleton; empty containers filled by JS
├── styles.css   — Ethiopian-themed layout (green / yellow / red palette)
├── app.js       — all logic: state, fetch, render, events, persistence
└── README.md    — this file
```

---

## How to run

No build step, no dependencies, no server needed.

**Option 1 — open directly in the browser**

```bash
# from the day-22 directory
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

**Option 2 — VS Code Live Server**

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Right-click `index.html` → **Open with Live Server**.
3. The app opens at `http://127.0.0.1:5500/day-22/index.html`.

**Option 3 — Python quick server**

```bash
# from the day-22 directory
python3 -m http.server 8080
# then visit http://localhost:8080
```

> The fetch call goes to an external API, so the file must be served over HTTP (not opened as `file://`) for CORS to work in all browsers.

---

## Architecture

The app follows the classic **state → render → events** data-driven loop:

```
load()          restore saved preferences
    ↓
loadRates()     fetch live rates into state
    ↓
render()        draw the full UI from state
    ↓
[user acts]     convert / add / remove
    ↓
update state    change the single truth object
    ↓
save()          persist to localStorage
    ↓
render()        redraw from state  ← repeat
```

State rules:
- `state` is the only truth — DOM is output only.
- Events edit `state`, never the DOM directly.
- `render()` always reads from `state`.
- Persist after every change.

---

## Key skills demonstrated

| Skill | Where |
|---|---|
| `async / await` + `fetch` | `loadRates()` |
| `res.ok` + error handling | `loadRates()` try/catch |
| DOM render loop | `render()`, `renderDropdown()`, `renderWatchlist()` |
| Event delegation | single listener on `#watchlist` ul |
| `localStorage` persistence | `save()` / `load()` |
| Input validation (regex + Number) | `validateAmount()` |
| Duplicate guard | `state.watchlist.includes(code)` in `addToWatchlist()` |
| Stretch — reverse convert | shown below each result |
| Stretch — refresh button | `#refresh-btn` → `loadRates()` + `render()` |
| Stretch — last-updated time | `state.lastUpdated` displayed in status |

---

## Self-check

- [x] Loads live rates; shows loading and error states
- [x] Converts a valid amount correctly
- [x] Add / remove watchlist works
- [x] Survives a page reload (localStorage)
- [x] Rejects bad input cleanly (empty, zero, negative, non-numeric)
- [x] No console errors on happy path
- [x] Reverse conversion shown
- [x] Refresh button refetches without reload
- [x] Last-updated timestamp displayed

---

## Author

IBT College Canada — CodeOps Full Stack, Module 2, Day 22  
Designed by Mehran Dasgar
