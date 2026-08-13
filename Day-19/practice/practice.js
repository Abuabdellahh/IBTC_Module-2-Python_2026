/* ── 1. SELECTING ELEMENTS ── */

// by id — one element
const list  = document.getElementById("list");

// CSS selector — FIRST match
const title = document.querySelector("h1");
const first = document.querySelector(".item");
const second = document.querySelector(".item.item2");
second.textContent = "Injera (updated)";
second.style.color = "green";




// CSS selector — ALL matches (NodeList)
const items = document.querySelectorAll(".item");
// get elements by tag name (HTMLCollection)
const lis = document.getElementsByTagName("li");

// get elements by class name (HTMLCollection)
const itemEls = document.getElementsByClassName("item");
// get elements by name (NodeList)
const namedEls = document.getElementsByName("qty");

/* ── 2. READING VALUES ── */

const log = document.getElementById("log");

function print(label, value) {
  log.textContent += `${label}: ${JSON.stringify(value)}\n`;
}

print("items.length",             items.length);           // 2
print("h1.textContent",           title.textContent);      // "Addis Market"

const input = document.querySelector("#qty");
print("input.value (string)",     input.value);            // "3"
print("Number(input.value)",      Number(input.value));    // 3

const li = document.querySelector(".item");
print("li.getAttribute('class')", li.getAttribute("class")); // "item"
print("li.dataset.id",            li.dataset.id);             // "7"

/* ── 3. CHANGING TEXT & STYLES  (change.js) ── */

const originalText = title.textContent;

document.getElementById("btn-change").addEventListener("click", () => {
  // safest: set plain text (never innerHTML for user data — XSS risk)
  title.textContent = "Addis Market — Bole";

  // classes — prefer over inline styles; CSS stays source of truth
  title.classList.add("active");
  title.classList.remove("hidden");
  title.classList.toggle("done");

  // direct style only when necessary
  title.style.color = "crimson";

  log.textContent += "\n[change.js demo ran — see the <h1> above]\n";
});

document.getElementById("btn-reset").addEventListener("click", () => {
  title.textContent = originalText;
  title.classList.remove("active", "done");
  title.style.color = "";
  log.textContent += "\n[reset]\n";
});
