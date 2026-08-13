"use strict";

/* Day 19 — DOM warm-up exercises. Warm-ups for the Week-2 project. */

/* ── 1. Select an <h1>, change its text, toggle a CSS class ── */
const ex1Heading = document.querySelector("#ex1-heading");
document.querySelector("#ex1-btn").addEventListener("click", () => {
  ex1Heading.textContent = "Text changed with textContent!";
  ex1Heading.classList.toggle("highlight");   // class defined in exercises.css
});

/* ── 2. Array of Ethiopian cities → an <li> for each via createElement ── */
const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];
const citiesUl = document.querySelector("#ex2-cities");
cities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  citiesUl.append(li);
});

/* ── 3. Click listener that logs event.target, plus bubbling from the wrapper ── */
const ex3Btn = document.querySelector("#ex3-btn");
const ex3Wrapper = document.querySelector("#ex3-wrapper");

ex3Btn.addEventListener("click", (e) => {
  console.log("button listener  → event.target:", e.target);
});

// The wrapper's listener also fires when the button is clicked: the event
// bubbles up from the button to the surrounding div (child → parent).
ex3Wrapper.addEventListener("click", (e) => {
  console.log("wrapper listener → event.target:", e.target, "(bubbled up)");
});

/* ── 4. Delete list items with ONE delegated listener on the parent ── */
const ex4List = document.querySelector("#ex4-list");
ex4List.addEventListener("click", (e) => {
  if (e.target.matches(".del")) {
    e.target.closest("li").remove();
  }
});

/* ── 5. Form: preventDefault, read value, append it, clear the field ── */
const ex5Form  = document.querySelector("#ex5-form");
const ex5Input = document.querySelector("#ex5-input");
const ex5List  = document.querySelector("#ex5-list");

ex5Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = ex5Input.value.trim();
  if (!value) return;                 // ignore empty submissions

  const li = document.createElement("li");
  li.textContent = value;
  ex5List.append(li);

  ex5Input.value = "";                // clear the field
  ex5Input.focus();
});
