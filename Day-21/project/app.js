// ── Regex ──
const PHONE = /^(?:\+251|0)9\d{8}$/;

// ── localStorage helpers ──
function save(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // corrupt data — start fresh
  }
}

// ── Validate ──
function validate(name, phone) {
  if (name.trim().length < 2) return "Enter your full name.";
  if (!PHONE.test(phone))     return "Enter a valid Ethiopian phone (e.g. 0912345678).";
  return "";
}

// ── Selectors ──
const form       = document.querySelector("#signup");
const nameInput  = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorEl    = document.querySelector("#error");
const countEl    = document.querySelector("#signup-count");
const entriesEl  = document.querySelector("#entries");

// ── Render saved entries ──
function render() {
  const entries = load("signups");

  countEl.textContent = entries.length
    ? `${entries.length} ${entries.length === 1 ? "person" : "people"} signed up`
    : "";

  if (!entries.length) { entriesEl.innerHTML = ""; return; }

  const ul = document.createElement("ul");
  entries.forEach(({ name, phone }) => {
    const li   = document.createElement("li");
    const n    = document.createElement("span");
    const p    = document.createElement("span");
    n.textContent = name;          // textContent — never innerHTML for user data
    p.textContent = phone;
    p.className   = "phone";
    li.append(n, p);
    ul.append(li);
  });

  entriesEl.innerHTML = "";
  const h2 = document.createElement("h2");
  h2.textContent = "Signed up";
  entriesEl.append(h2, ul);
}

// ── Submit ──
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name  = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const error = validate(name, phone);

  if (error) {
    errorEl.textContent = error;   // specific, plain-text error
    return;
  }

  errorEl.textContent = "";

  const entries = load("signups");
  entries.push({ name, phone });
  save("signups", entries);        // persist as JSON

  nameInput.value  = "";
  phoneInput.value = "";
  render();
});

// ── Restore on load ──
render();
