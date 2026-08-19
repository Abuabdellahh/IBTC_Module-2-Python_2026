/* ── Constants ──────────────────────────────────────── */
const STORAGE_KEY        = "addiseats_cart";
const FREE_DELIVERY_OVER = 500;
const DELIVERY_FEE       = 30;
const PHONE_RE           = /^(?:\+251|0)9\d{8}$/;
const EMAIL_RE           = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POPULAR_IDS        = [1, 3, 5, 2];   // Doro Wat, Tibs, Kitfo, Shiro

/* ── State ──────────────────────────────────────────── */
const state = {
  dishes:   [],
  cart:     [],
  search:   "",
  category: "All",
};

/* ── DOM refs ───────────────────────────────────────── */
const menuEl      = document.querySelector("#menu");
const cartListEl  = document.querySelector("#cart-list");
const cartTotalEl = document.querySelector("#cart-total");
const cartBadge   = document.querySelector("#cart-badge");
const searchEl    = document.querySelector("#search");
const formEl      = document.querySelector("#checkout");
const nameEl      = document.querySelector("#cust-name");
const phoneEl     = document.querySelector("#cust-phone");
const areaEl      = document.querySelector("#cust-area");
const errEl       = document.querySelector("#form-error");
const confirmEl   = document.querySelector("#confirmation");
const confirmMsg  = document.querySelector("#confirm-msg");
const popularGrid = document.querySelector("#popular-grid");

/* ════════════════════════════════════════════════════ */
/*  ROUTER — show / hide pages                         */
/* ════════════════════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));

  const page = document.querySelector(`#page-${name}`);
  if (page) page.classList.remove("hidden");

  document.querySelectorAll(`[data-page="${name}"]`).forEach(a => {
    if (a.classList.contains("nav-link")) a.classList.add("active");
  });

  // Close mobile nav
  document.querySelector(".nav-links").classList.remove("open");
  document.querySelector(".nav-toggle").setAttribute("aria-expanded", "false");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Render popular dishes when landing on home
  if (name === "home") renderPopular();
}

/* ── Delegate all [data-page] clicks ────────────────── */
document.addEventListener("click", e => {
  const target = e.target.closest("[data-page]");
  if (!target) return;
  e.preventDefault();
  showPage(target.dataset.page);
});

/* ── Mobile nav toggle ──────────────────────────────── */
document.querySelector(".nav-toggle").addEventListener("click", function () {
  const links   = document.querySelector(".nav-links");
  const isOpen  = links.classList.toggle("open");
  this.setAttribute("aria-expanded", String(isOpen));
});

/* ════════════════════════════════════════════════════ */
/*  MENU RENDER                                        */
/* ════════════════════════════════════════════════════ */
function render() {
  renderMenu();
  renderCart();
}

function renderMenu() {
  const term  = state.search.toLowerCase();
  const shown = state.dishes.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(term) ||
                        d.desc.toLowerCase().includes(term);
    const matchCat    = state.category === "All" || d.category === state.category;
    return matchSearch && matchCat;
  });

  if (shown.length === 0) {
    menuEl.innerHTML = `<p class="status-msg">No dishes found for "<strong>${escHtml(state.search || state.category)}</strong>".</p>`;
    return;
  }

  menuEl.innerHTML = shown.map(dishCard).join("");
}

function dishCard(d) {
  return `
    <article class="dish" data-id="${d.id}">
      <div class="dish-emoji" aria-hidden="true">${d.emoji}</div>
      <h3>${escHtml(d.name)}</h3>
      <p class="dish-desc">${escHtml(d.desc)}</p>
      <div class="dish-meta">
        <span class="price">${d.price} ETB</span>
        ${d.spicy ? '<span class="spicy-tag">🌶️ Spicy</span>' : ""}
      </div>
      <button class="add-btn" data-id="${d.id}" aria-label="Add ${escHtml(d.name)} to cart">+ Add</button>
    </article>`;
}

function renderPopular() {
  if (!state.dishes.length || !popularGrid) return;
  const picks = POPULAR_IDS.map(id => state.dishes.find(d => d.id === id)).filter(Boolean);
  popularGrid.innerHTML = picks.map(dishCard).join("");
}

/* ── Cart render ────────────────────────────────────── */
function renderCart() {
  updateBadge();

  if (state.cart.length === 0) {
    cartListEl.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
    cartTotalEl.textContent = "0 ETB";
    return;
  }

  cartListEl.innerHTML = state.cart.map(item => `
    <li class="cart-item" data-id="${item.id}">
      <span class="cart-item-name">${escHtml(item.name)}</span>
      <button class="qty-btn dec-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
      <span class="qty-num" aria-label="Quantity">${item.qty}</span>
      <button class="qty-btn inc-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
      <span class="cart-item-price">${item.price * item.qty} ETB</span>
      <button class="rm-btn" data-id="${item.id}" aria-label="Remove ${escHtml(item.name)}">✕</button>
    </li>`).join("");

  const total = calcTotal();
  const fee   = total >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  cartTotalEl.textContent = fee > 0
    ? `${total} + ${fee} ETB delivery = ${total + fee} ETB`
    : `${total} ETB (free delivery)`;
}

function updateBadge() {
  const count = state.cart.reduce((n, i) => n + i.qty, 0);
  cartBadge.textContent = count;
  cartBadge.classList.toggle("hidden", count === 0);
}

/* ════════════════════════════════════════════════════ */
/*  CART LOGIC                                         */
/* ════════════════════════════════════════════════════ */
function addToCart(id) {
  const dish = state.dishes.find(d => d.id === id);
  if (!dish) return;
  const line = state.cart.find(i => i.id === id);
  if (line) line.qty++;
  else state.cart.push({ ...dish, qty: 1 });
  save();
  render();
}

function changeQty(id, delta) {
  const line = state.cart.find(i => i.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) state.cart = state.cart.filter(i => i.id !== id);
  save();
  render();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  save();
  render();
}

function calcTotal() {
  return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

/* ════════════════════════════════════════════════════ */
/*  PERSISTENCE                                        */
/* ════════════════════════════════════════════════════ */
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { state.cart = JSON.parse(raw); }
    catch { state.cart = []; }
  }
}

/* ════════════════════════════════════════════════════ */
/*  CHECKOUT VALIDATION & ORDER                        */
/* ════════════════════════════════════════════════════ */
function validateOrder(name, phone) {
  if (!name.trim())            return "Please enter your name.";
  if (!PHONE_RE.test(phone))   return "Enter a valid Ethiopian phone (09xxxxxxxx or +2519xxxxxxxx).";
  if (state.cart.length === 0) return "Your cart is empty — add a dish first.";
  return "";
}

function placeOrder(name, phone, area) {
  const total = calcTotal();
  const fee   = total >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const order = {
    name, phone, area,
    items:    state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
    subtotal: total,
    delivery: fee,
    total:    total + fee,
    placedAt: new Date().toISOString(),
  };
  console.log("Order placed:", order);

  state.cart = [];
  save();
  render();

  confirmMsg.textContent =
    `Thank you, ${name}! Your order of ${order.total} ETB is on its way to ${area}. ` +
    `We'll call ${phone} when it arrives.`;
  confirmEl.classList.remove("hidden");
}

/* ════════════════════════════════════════════════════ */
/*  CONTACT FORM                                       */
/* ════════════════════════════════════════════════════ */
function validateContact(name, email, subject, message) {
  if (!name.trim())              return "Please enter your name.";
  if (!EMAIL_RE.test(email))     return "Please enter a valid email address.";
  if (!subject)                  return "Please select a subject.";
  if (message.trim().length < 10) return "Message must be at least 10 characters.";
  return "";
}

document.querySelector("#contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const cfErr     = document.querySelector("#cf-error");
  const cfSuccess = document.querySelector("#cf-success");
  const name      = document.querySelector("#cf-name").value;
  const email     = document.querySelector("#cf-email").value.trim();
  const subject   = document.querySelector("#cf-subject").value;
  const message   = document.querySelector("#cf-message").value;

  const msg = validateContact(name, email, subject, message);
  cfErr.textContent = msg;
  cfSuccess.classList.add("hidden");
  if (msg) return;

  console.log("Contact message:", { name, email, subject, message });
  e.target.reset();
  cfSuccess.classList.remove("hidden");
});

/* ════════════════════════════════════════════════════ */
/*  DATA LOADING                                       */
/* ════════════════════════════════════════════════════ */
async function loadMenu() {
  menuEl.innerHTML = `<p class="status-msg">Loading menu…</p>`;
  try {
    const res = await fetch("data/menu.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.dishes = await res.json();
    render();
    renderPopular();
  } catch (err) {
    menuEl.innerHTML = `<p class="status-msg error">Could not load the menu. Please refresh.</p>`;
    console.error("loadMenu:", err);
  }
}

/* ════════════════════════════════════════════════════ */
/*  EVENTS                                             */
/* ════════════════════════════════════════════════════ */

// Search
searchEl.addEventListener("input", e => {
  state.search = e.target.value;
  render();
});

// Category filters
document.querySelector(".filters").addEventListener("click", e => {
  if (!e.target.matches(".filter-btn")) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  state.category = e.target.dataset.cat;
  render();
});

// Add to cart — menu page AND popular grid on home
document.addEventListener("click", e => {
  if (!e.target.matches(".add-btn")) return;
  const id = Number(e.target.dataset.id);
  addToCart(id);
  // If clicking from home page, jump to menu so user sees their cart
  if (document.querySelector("#page-home") &&
      !document.querySelector("#page-home").classList.contains("hidden")) {
    showPage("menu");
  }
});

// Cart interactions
cartListEl.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);
  if (!id) return;
  if (e.target.matches(".inc-btn"))      changeQty(id, +1);
  else if (e.target.matches(".dec-btn")) changeQty(id, -1);
  else if (e.target.matches(".rm-btn"))  removeFromCart(id);
});

// Checkout form
formEl.addEventListener("submit", e => {
  e.preventDefault();
  const name  = nameEl.value;
  const phone = phoneEl.value.trim();
  const area  = areaEl.value;
  const msg   = validateOrder(name, phone);
  errEl.textContent = msg;
  if (msg) return;
  placeOrder(name, phone, area);
  formEl.reset();
});

// Confirmation close
document.querySelector("#confirm-close").addEventListener("click", () => {
  confirmEl.classList.add("hidden");
});

/* ════════════════════════════════════════════════════ */
/*  UTILITY                                            */
/* ════════════════════════════════════════════════════ */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ════════════════════════════════════════════════════ */
/*  HERO SLIDER                                        */
/* ════════════════════════════════════════════════════ */
const SLIDE_INTERVAL = 5000; // ms between auto-advances

const slider = {
  current:  0,
  total:    0,
  timer:    null,
  animating: false,
  slides:   null,
  dots:     null,
};

function sliderInit() {
  slider.slides = document.querySelectorAll(".slide");
  slider.dots   = document.querySelectorAll(".slider-dot");
  slider.total  = slider.slides.length;
  if (slider.total === 0) return;

  document.querySelector(".slider-prev").addEventListener("click", () => sliderGo(slider.current - 1));
  document.querySelector(".slider-next").addEventListener("click", () => sliderGo(slider.current + 1));

  document.querySelector(".slider-dots").addEventListener("click", e => {
    const dot = e.target.closest(".slider-dot");
    if (dot) sliderGo(Number(dot.dataset.dot));
  });

  // Pause on hover / touch
  const section = document.querySelector(".hero-slider");
  section.addEventListener("mouseenter", sliderPause);
  section.addEventListener("mouseleave", sliderPlay);
  section.addEventListener("touchstart", sliderPause, { passive: true });
  section.addEventListener("touchend",   sliderPlay,  { passive: true });

  // Keyboard: left/right arrows when slider is focused
  section.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft")  sliderGo(slider.current - 1);
    if (e.key === "ArrowRight") sliderGo(slider.current + 1);
  });

  sliderPlay();
}

function sliderGo(index, direction) {
  if (slider.animating) return;
  const next = ((index % slider.total) + slider.total) % slider.total;
  if (next === slider.current) return;

  // Determine direction if not supplied
  const goingForward = direction !== undefined
    ? direction === "forward"
    : next > slider.current || (slider.current === slider.total - 1 && next === 0);

  const enterClass = goingForward ? "slide--enter-right" : "slide--enter-left";
  const exitClass  = goingForward ? "slide--exit-left"   : "slide--exit-right";

  const outgoing = slider.slides[slider.current];
  const incoming = slider.slides[next];

  slider.animating = true;

  // Kick off animations
  outgoing.classList.add(exitClass);
  incoming.classList.remove("slide--active");
  incoming.classList.add(enterClass);

  // After animation ends, clean up classes
  const DURATION = 560; // slightly longer than CSS 550ms
  setTimeout(() => {
    outgoing.classList.remove("slide--active", exitClass);
    incoming.classList.remove(enterClass);
    incoming.classList.add("slide--active");

    slider.current  = next;
    slider.animating = false;
    sliderUpdateDots();
    sliderRestart();
  }, DURATION);
}

function sliderUpdateDots() {
  slider.dots.forEach((d, i) => {
    d.classList.toggle("active", i === slider.current);
    d.setAttribute("aria-selected", String(i === slider.current));
  });
}

function sliderPlay() {
  sliderPause();
  slider.timer = setInterval(() => sliderGo(slider.current + 1, "forward"), SLIDE_INTERVAL);
}
function sliderPause()   { clearInterval(slider.timer); }
function sliderRestart() { sliderPause(); sliderPlay(); }

/* ════════════════════════════════════════════════════ */
/*  INIT                                               */
/* ════════════════════════════════════════════════════ */
async function init() {
  load();
  updateBadge();
  showPage("home");
  sliderInit();
  await loadMenu();
}

init();
