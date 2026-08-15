"use strict";

/* ──────────────────────────────────────────────────────────
   Addis Market — Shopping List
   Week-2 project · Day 19 · pure DOM + events, no framework.

   Today's building blocks:
   selection · createElement/append · event delegation · a live total.
   Browser storage and a live API come later this week.
   ────────────────────────────────────────────────────────── */

/* ── 1. Cache element references ONCE (not on every action) ── */
const form    = document.querySelector("#add-form");
const nameEl  = document.querySelector("#name");
const priceEl = document.querySelector("#price");
const list    = document.querySelector("#list");
const totalEl = document.querySelector("#total");
const emptyEl = document.querySelector("#empty");

/* ── 2. Add an item from the form ── */
form.addEventListener("submit", (e) => {
  e.preventDefault();                 // stop the page from reloading

  const name  = nameEl.value.trim();
  const price = Number(priceEl.value);

  // Validate: name must be present, price must be a real number > 0.
  const nameOk  = name.length > 0;
  const priceOk = Number.isFinite(price) && price > 0;

  nameEl.classList.toggle("invalid", !nameOk);
  priceEl.classList.toggle("invalid", !priceOk);
  if (!nameOk || !priceOk) return;    // bail out — nothing added

  addRow(name, price);
  form.reset();
  nameEl.focus();                     // ready for the next item
  updateTotal();
});

/* ── 3. Build one row with createElement + append (never innerHTML) ── */
function addRow(name, price) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.price = price;           // store the number for totalling

  const nameSpan = document.createElement("span");
  nameSpan.className = "item__name";
  nameSpan.textContent = name;        // textContent, so user input can't inject HTML

  const priceSpan = document.createElement("span");
  priceSpan.className = "item__price";
  priceSpan.textContent = `ETB ${price.toFixed(2)}`;

  const delBtn = document.createElement("button");
  delBtn.className = "del";
  delBtn.type = "button";
  delBtn.setAttribute("aria-label", `Remove ${name}`);
  delBtn.textContent = "×";

  li.append(nameSpan, priceSpan, delBtn);
  list.append(li);
}

/* ── 4. ONE delegated listener on the parent — handles every row ── */
list.addEventListener("click", (e) => {
  if (e.target.matches(".del")) {
    // Delete: walk up to the row and remove it.
    e.target.closest(".item").remove();
    updateTotal();
  } else {
    // Toggle "bought" by flipping a CSS class (styling lives in styles.css).
    e.target.closest(".item")?.classList.toggle("bought");
  }
});

/* ── 5. Live running total — recompute from the rows in the DOM ── */
function updateTotal() {
  const rows = list.querySelectorAll(".item");

  let total = 0;
  rows.forEach((row) => { total += Number(row.dataset.price); });

  totalEl.textContent = total.toFixed(2);
  emptyEl.classList.toggle("hidden", rows.length > 0);  // hide hint once list has items
}

/* Set the initial empty-state hint correctly on load. */
updateTotal();
