# Addis Market — Shopping List

An interactive single-page shopping list, built as the **Week-2 project** for
**CodeOps · Full Stack Software Development** at IBT College Canada (Module 2, Day 19).

You add items with an ETB price, tick them off as "bought", remove them, and watch a
live running total update — all with vanilla DOM and events. **No framework.**

## What it does

- **Add an item** — enter a name and an ETB price, then submit. The form uses
  `preventDefault` (no page reload) and validates that both fields are filled and the
  price is a positive number.
- **Render rows** — each item is built with `createElement` + `append`. The list is
  never rebuilt from an HTML string.
- **Delete an item** — a single **delegated** click listener on the `<ul>` handles the
  delete button for every row (one listener, not one per row).
- **Toggle "bought"** — clicking a row toggles a `.bought` CSS class; all of its
  styling lives in `styles.css`, not inline.
- **Live total** — the ETB total recomputes whenever items are added or removed.

## How it's wired (today's tools)

| Requirement | Where |
|---|---|
| Cache elements once | top of `app.js` |
| `preventDefault` + validation | `submit` handler |
| `createElement` / `append` | `addRow()` |
| One delegated listener | `list.addEventListener("click", …)` |
| Toggle class for "bought" | `classList.toggle("bought")` + `.item.bought` in CSS |
| Live running total | `updateTotal()` |

Prices are stored on each row via `data-price` and text is set with `textContent`
(so a user's item name can never inject HTML).

## Run it

Open `index.html` directly in any modern browser — no build step, no server required.

## Project structure

```
Week_2_Project/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Coming later this week

This is the foundation the rest of the week extends:

- **Browser storage** — persist the list across reloads (`localStorage`).
- **Live API** — pull real data over the network.
