# Day-21 Project — Validated, Persistent Signup Form

A signup form that validates a name and an Ethiopian phone number, shows clear error messages, and saves valid entries to `localStorage` as JSON — restored on every reload.

## What it does

- Validates name (min 2 characters) and phone against the Ethiopian regex `/^(?:\+251|0)9\d{8}$/`
- Shows a specific, plain-text error for the first problem found
- Saves valid entries to `localStorage` as JSON
- Restores and displays all saved entries on page load
- Handles `null` and corrupt storage safely with `try / catch`

## How to open

Double-click `index.html` — no server or install needed.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Structure — form, error area, entries list |
| `styles.css` | Styles |
| `app.js` | Validation, localStorage helpers, render logic |

## Skills covered

`localStorage` · `JSON.stringify / parse` · form `preventDefault` · regex · `textContent`
