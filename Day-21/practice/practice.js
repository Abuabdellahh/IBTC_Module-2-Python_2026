const select = document.querySelector("#lang");
const status = document.querySelector("#status");

// 1. restore the saved choice on load
const saved = localStorage.getItem("lang");
if (saved) {
  select.value = saved;
  status.textContent = `Restored saved language: "${saved}"`;
}

// 2. save whenever it changes
select.addEventListener("change", () => {
  localStorage.setItem("lang", select.value);
  status.textContent = `Saved language: "${select.value}"`;
});




// ── JSON + localStorage ──
const order = { name: "Almaz", total: 360 };
const text = JSON.stringify(order);          // object → string
const back = JSON.parse(text);               // string → object

// ── Cart with localStorage ── // cSpell:ignore Doro Tibs
let cart = ["Doro Wat", "Tibs"]; // default items

function loadCart() {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : cart;     // fallback to default
  } catch (err) {
    return cart;                             // corrupt — start fresh
  }
}

// ── Form + validation ──
const PHONE = /^(?:\+251|0)9\d{8}$/;        // 0912345678 or +251912345678
const EMAIL = /^[\w.]+@[\w.]+\.\w+$/;       // almaz@example.et

function validate({ name, phone }) {
  if (name.trim().length < 2) return "Enter your full name.";
  if (!PHONE.test(phone))     return "Enter a valid phone.";
  return "";                                 // "" means all good
}

const form       = document.querySelector("#signup");
const nameInput  = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const formStatus = document.querySelector("#form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name  = nameInput.value;
  const phone = phoneInput.value;
  const error = validate({ name, phone });
  if (error) {
    formStatus.style.color = "crimson";
    formStatus.textContent = error;
    return;
  }
  formStatus.style.color = "green";
  formStatus.textContent = `Welcome, ${name.trim()}!`;
});