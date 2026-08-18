/* ============================================================
   Birr Watch — app.js
   Data-Driven ETB Exchange Rate Tracker
   Architecture: state → render → events (the one-way loop)
   ============================================================ */

"use strict";

// ── Constants ─────────────────────────────────────────────────────────────────

const API      = "https://open.er-api.com/v6/latest/ETB";
const STORAGE_KEY = "birrwatch_v1";

// Regex: positive number, up to two decimal places
const AMOUNT_RE = /^\d+(\.\d{1,2})?$/;

// ── State ─────────────────────────────────────────────────────────────────────
// Single source of truth — the DOM is always just a picture of this object.

const state = {
  base:      "ETB",
  rates:     {},          // filled by the API: { USD: 0.0177, EUR: 0.0164, … }
  watchlist: [],          // e.g. ["USD", "KES"]
  currency:  "USD",       // last selected currency in the dropdown
  amount:    100,         // last entered amount
  lastUpdated: null,      // ISO timestamp from the API response
};

// ── DOM refs ──────────────────────────────────────────────────────────────────

const statusEl    = document.getElementById("status");
const convertForm = document.getElementById("convert-form");
const amountInput = document.getElementById("amount");
const currencyEl  = document.getElementById("currency");
const amountError = document.getElementById("amount-error");
const resultEl    = document.getElementById("result");
const watchlistEl = document.getElementById("watchlist");
const watchBtn    = document.getElementById("watch-btn");
const refreshBtn  = document.getElementById("refresh-btn");

// ── Persistence ───────────────────────────────────────────────────────────────

/**
 * Serialise the parts of state worth keeping:
 *   watchlist and currency (not rates — those always refetch fresh).
 */
function save() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        watchlist: state.watchlist,
        currency:  state.currency,
        amount:    state.amount,
      })
    );
  } catch (_) {
    // Quota exceeded or private-browsing restrictions — silently ignore.
  }
}

/**
 * Restore saved choices onto state before the first render.
 * Wrapped in try/catch: corrupt or outdated data in storage must not crash.
 */
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    // Merge only the keys we care about
    if (Array.isArray(saved.watchlist)) state.watchlist = saved.watchlist;
    if (saved.currency)                 state.currency  = saved.currency;
    if (typeof saved.amount === "number" && saved.amount > 0) {
      state.amount    = saved.amount;
      amountInput.value = state.amount;
    }
  } catch (_) {
    // Corrupted data — start fresh
    localStorage.removeItem(STORAGE_KEY);
  }
}

// ── Validation ────────────────────────────────────────────────────────────────

/**
 * Returns { valid: true, value: number } or { valid: false, message: string }.
 * Validates with both Number() coercion and the AMOUNT_RE regex.
 */
function validateAmount(raw) {
  const trimmed = String(raw).trim();

  if (trimmed === "" || trimmed === "0") {
    return { valid: false, message: "Please enter an amount." };
  }

  const num = Number(trimmed);

  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, message: "Amount must be a number." };
  }

  if (num <= 0) {
    return { valid: false, message: "Amount must be greater than zero." };
  }

  if (!AMOUNT_RE.test(trimmed)) {
    return { valid: false, message: "Use up to two decimal places only." };
  }

  return { valid: true, value: num };
}

/** Show or clear the inline validation message. */
function setAmountError(message) {
  amountError.textContent = message;
  if (message) {
    amountInput.classList.add("is-invalid");
  } else {
    amountInput.classList.remove("is-invalid");
  }
}

// ── Status helpers ────────────────────────────────────────────────────────────

function setStatus(text, type = "") {
  statusEl.textContent = text;
  statusEl.className   = `status${type ? ` status--${type}` : ""}`;
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

/**
 * Fetch live rates from the API, store them in state, then render.
 * Handles loading, success and error states on the status line.
 */
async function loadRates() {
  setStatus("Loading rates…", "loading");
  refreshBtn.disabled = true;

  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error(`Network error: HTTP ${res.status}`);
    }

    const data = await res.json();

    if (data.result !== "success") {
      throw new Error(`API error: ${data["error-type"] ?? "unknown"}`);
    }

    state.rates       = data.rates;
    state.lastUpdated = data.time_last_update_utc ?? new Date().toUTCString();

    setStatus(
      `Rates updated · ${formatTimestamp(state.lastUpdated)}`,
      "success"
    );
  } catch (err) {
    setStatus(`Could not load rates — ${err.message}`, "error");
    console.error("[Birr Watch] loadRates:", err);
  } finally {
    refreshBtn.disabled = false;
  }
}

/** Format the API's UTC timestamp into a readable local string. */
function formatTimestamp(utcString) {
  try {
    return new Date(utcString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch (_) {
    return utcString;
  }
}

// ── Render ────────────────────────────────────────────────────────────────────

/**
 * Full re-render of the converter dropdown and watchlist from state.
 * Called once after init, and again after a refresh.
 */
function render() {
  renderDropdown();
  renderWatchlist();
}

/** Rebuild the currency <select> from state.rates. */
function renderDropdown() {
  const codes = Object.keys(state.rates).sort();

  // Build all <option> elements
  currencyEl.innerHTML = codes
    .map(
      (c) =>
        `<option value="${c}"${c === state.currency ? " selected" : ""}>${c}</option>`
    )
    .join("");

  // If the saved currency is not in the new rates list, fall back to the first
  if (!codes.includes(state.currency) && codes.length > 0) {
    state.currency     = codes[0];
    currencyEl.value   = state.currency;
  }
}

/**
 * Rebuild the watchlist <ul> from state.watchlist.
 * Uses event delegation on the parent — one listener for all rows.
 */
function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchlistEl.innerHTML =
      '<li class="watchlist__empty">No currencies yet — add one above.</li>';
    return;
  }

  watchlistEl.innerHTML = state.watchlist
    .map((code) => {
      const rate = state.rates[code];
      const rateDisplay =
        rate !== undefined
          ? `1 ETB = <strong>${rate.toFixed(6)}</strong> ${code}`
          : "Rate unavailable";

      return `
        <li class="watchlist__item" data-c="${code}">
          <span class="watchlist__code">${code}</span>
          <span class="watchlist__rate">${rateDisplay}</span>
          <button class="watchlist__rm rm-btn" aria-label="Remove ${code} from watchlist">×</button>
        </li>
      `;
    })
    .join("");
}

// ── Convert ───────────────────────────────────────────────────────────────────

/** Perform the conversion calculation and display the result. */
function doConvert() {
  const validation = validateAmount(amountInput.value);

  if (!validation.valid) {
    setAmountError(validation.message);
    resultEl.textContent = "";
    resultEl.className   = "result";
    return;
  }

  setAmountError("");

  const amt      = validation.value;
  const currency = currencyEl.value;
  const rate     = state.rates[currency];

  // Update state
  state.amount   = amt;
  state.currency = currency;
  save();

  if (rate === undefined) {
    resultEl.textContent = "Rate not available for this currency.";
    resultEl.className   = "result result--error";
    return;
  }

  const converted  = (amt * rate).toFixed(2);
  const reverseAmt = (amt / rate).toFixed(2); // stretch: reverse conversion

  resultEl.innerHTML = `
    <div>${amt.toLocaleString()} ETB → <strong>${converted} ${currency}</strong></div>
    <div style="font-size:0.82rem;opacity:0.7;margin-top:0.25rem;">
      ${reverseAmt} ${currency} → 1 ETB
    </div>
  `;
  resultEl.className = "result";
}

// ── Watchlist actions ─────────────────────────────────────────────────────────

/** Add the currently selected currency to the watchlist (no duplicates). */
function addToWatchlist() {
  const code = currencyEl.value;

  if (!code) return;

  if (state.watchlist.includes(code)) {
    // Silently ignore — no duplicate
    return;
  }

  state.watchlist.push(code);
  save();
  renderWatchlist();
}

/** Remove a currency from the watchlist by code. */
function removeFromWatchlist(code) {
  state.watchlist = state.watchlist.filter((c) => c !== code);
  save();
  renderWatchlist();
}

// ── Events ────────────────────────────────────────────────────────────────────

// Convert on form submit
convertForm.addEventListener("submit", (e) => {
  e.preventDefault();
  doConvert();
});

// Clear error as the user types a new value
amountInput.addEventListener("input", () => {
  if (amountError.textContent) setAmountError("");
  if (resultEl.classList.contains("result--error")) {
    resultEl.textContent = "";
    resultEl.className   = "result";
  }
});

// Keep state.currency in sync with the dropdown without re-rendering
currencyEl.addEventListener("change", () => {
  state.currency = currencyEl.value;
  save();
});

// Add to watchlist
watchBtn.addEventListener("click", addToWatchlist);

// Remove from watchlist — event delegation on the <ul>
watchlistEl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm-btn")) return;
  const li   = e.target.closest("li[data-c]");
  const code = li?.dataset.c;
  if (code) removeFromWatchlist(code);
});

// Refresh button — refetch rates and re-render
refreshBtn.addEventListener("click", async () => {
  await loadRates();
  render();
});

// ── Init ──────────────────────────────────────────────────────────────────────

/**
 * App startup:
 *  1. Load saved preferences (watchlist, currency, amount).
 *  2. Fetch live rates.
 *  3. Render everything once all data is ready.
 */
async function init() {
  load();           // restore user's preferences before any render
  await loadRates(); // fetch live rates into state
  render();         // draw the full UI from state
}

init();
