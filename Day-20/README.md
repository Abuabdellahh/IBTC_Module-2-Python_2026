# Day 20 — Async / await, Promises, and Fetch API

This assignment builds a small browser app that demonstrates real async JavaScript using live public APIs.

## Included examples

- Fetch the USD to ETB exchange rate using `async/await`
- Rewrite a fetch → json → render flow with `await` and `try/catch`
- Confirm both network failures and HTTP 404 handling
- Use `Promise.all` to fetch details for the first two items in parallel
- Show loading, success, and error states in a tiny network demo
- Search for country facts from the free Rest Countries API

## APIs used

- Exchange rate API: `https://open.er-api.com/v6/latest/USD`
- JSONPlaceholder API: `https://jsonplaceholder.typicode.com`
- Rest Countries API: `https://restcountries.com/v3.1/name/{country}`

## How to run

1. Open the project folder in a browser, or run a local static server from this folder.
2. For example:

```bash
cd Day-20
python3 -m http.server 8000
```

3. Open `http://localhost:8000` in your browser.

## Files

- `index.html`
- `styles.css`
- `app.js`

## Notes

- The app checks `res.ok` before parsing JSON.
- The page defaults to Ethiopia on first load.
- A friendly error message appears when a country is not found or the network fails.
