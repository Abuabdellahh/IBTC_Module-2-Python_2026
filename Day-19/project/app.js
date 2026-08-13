/* ── STATE ── */
let items = []; // source of truth

/* ── SELECTORS ── */
const form  = document.querySelector("#add-form");
const nameIn = document.querySelector("#name");
const list  = document.querySelector("#list");
const count = document.querySelector("#count");

/* ── ADD ── */
form.addEventListener("submit", (e) => {
  e.preventDefault();                        // stop page reload
  const name = nameIn.value.trim();
  if (!name) return;                         // ignore empty input

  items.push({ id: Date.now(), name, done: false }); // Date.now() = unique ms id
  nameIn.value = "";
  render();
});

/* ── RENDER ── */
function render() {
  list.innerHTML = "";                       // wipe old rows

  items.forEach((it) => {
    const li = document.createElement("li");
    li.textContent = it.name;
    li.dataset.id  = it.id;
    if (it.done) li.classList.add("done");   // CSS handles the look

    const x = document.createElement("button");
    x.textContent = "×";
    x.className   = "del";
    li.append(x);
    list.append(li);
  });

  count.textContent = items.length + " items";
}

/* ── DELEGATION — one listener, two actions ── */
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.matches(".del")) {
    // remove
    items = items.filter((i) => i.id !== id);
  } else {
    // toggle bought
    const it = items.find((i) => i.id === id);
    it.done = !it.done;
  }

  render();
});
