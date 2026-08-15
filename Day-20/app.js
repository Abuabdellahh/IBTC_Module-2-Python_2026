"use strict";

const rateBtn = document.querySelector("#rate-btn");
const rateOutput = document.querySelector("#rate-output");
const thenBtn = document.querySelector("#then-btn");
const thenOutput = document.querySelector("#then-output");
const errorBtn = document.querySelector("#error-btn");
const errorOutput = document.querySelector("#error-output");
const allBtn = document.querySelector("#all-btn");
const allOutput = document.querySelector("#all-output");
const toggleNetworkBtn = document.querySelector("#toggle-network");
const networkDemo = document.querySelector("#network-demo");
const countryInput = document.querySelector("#country-input");
const searchBtn = document.querySelector("#search-btn");
const factsBox = document.querySelector("#facts");

const ethiopiaFallback = {
  name: { common: "Ethiopia" },
  capital: ["Addis Ababa"],
  population: 126_000_000,
  region: "Africa",
  currencies: {
    ETB: { name: "Ethiopian birr" }
  },
  flags: {
    svg: "https://flagcdn.com/w320/et.png"
  }
};

let networkOnline = true;

async function fetchUsdToEtbRate() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error(`Rate fetch failed with status ${res.status}`);

  const data = await res.json();
  const rate = data.rates?.ETB;

  if (!rate) throw new Error("ETB rate was not returned by the API.");
  return rate;
}

rateBtn.addEventListener("click", async () => {
  rateOutput.classList.remove("error");
  rateOutput.textContent = "Loading...";

  try {
    const rate = await fetchUsdToEtbRate();
    rateOutput.textContent = `1 USD = ${rate.toFixed(2)} ETB`;
  } catch (err) {
    rateOutput.textContent = err.message;
    rateOutput.classList.add("error");
  }
});

async function fetchTodoWithAsyncAwait() {
  thenOutput.classList.remove("error");
  thenOutput.textContent = "Loading...";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) throw new Error(`Status ${res.status}: ${res.statusText}`);

    const data = await res.json();
    thenOutput.innerHTML = `
      <strong>Todo #${data.id}</strong><br>
      ${data.title}<br>
      <span class="${data.completed ? "success" : "warning"}">
        ${data.completed ? "Completed" : "Not completed"}
      </span>
    `;
  } catch (err) {
    thenOutput.textContent = err.message;
    thenOutput.classList.add("error");
  }
}

thenBtn.addEventListener("click", fetchTodoWithAsyncAwait);

async function demoErrorHandling() {
  errorOutput.textContent = "Testing a bad URL...";

  try {
    await fetch("https://this-domain-does-not-exist.invalid/anything");
  } catch (err) {
    errorOutput.innerHTML = `<strong>Bad URL catch:</strong> ${err.message}<br>`;
  }

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/this-route-does-not-exist");
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText || "Not Found"}`);
    }
    await res.json();
  } catch (err) {
    errorOutput.innerHTML += `<strong>404 handling:</strong> ${err.message}<br>`;
    errorOutput.innerHTML += "This shows why checking <code>res.ok</code> is required.";
  }
}

errorBtn.addEventListener("click", demoErrorHandling);

async function fetchFirstTwoDetails() {
  allOutput.classList.remove("error");
  allOutput.innerHTML = "Loading...";

  try {
    const listRes = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=2");
    if (!listRes.ok) throw new Error(`List request failed: ${listRes.status}`);

    const list = await listRes.json();

    const details = await Promise.all(
      list.map((item) =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`).then((res) => {
          if (!res.ok) throw new Error(`Detail request failed for post ${item.id}`);
          return res.json();
        })
      )
    );

    allOutput.innerHTML = "";
    details.forEach((post) => {
      const li = document.createElement("li");
      li.textContent = `${post.id}. ${post.title}`;
      allOutput.append(li);
    });
  } catch (err) {
    allOutput.textContent = err.message;
    allOutput.classList.add("error");
  }
}

allBtn.addEventListener("click", fetchFirstTwoDetails);

async function simulateNetworkRequest() {
  networkDemo.classList.remove("error", "success");
  networkDemo.textContent = "Loading...";

  try {
    const url = networkOnline
      ? "https://jsonplaceholder.typicode.com/todos/1"
      : "https://this-domain-does-not-exist.invalid/network-check";

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText || "Request failed"}`);

    const data = await res.json();
    networkDemo.textContent = `Loaded: ${data.title}`;
    networkDemo.classList.add("success");
  } catch (err) {
    networkDemo.textContent = `Error: ${err.message}`;
    networkDemo.classList.add("error");
  }
}

toggleNetworkBtn.addEventListener("click", () => {
  networkOnline = !networkOnline;
  toggleNetworkBtn.textContent = networkOnline ? "Toggle network: online" : "Toggle network: offline";
  simulateNetworkRequest();
});

function renderFact(container, label, value) {
  const row = document.createElement("div");
  row.className = "fact-row";

  const labelEl = document.createElement("span");
  labelEl.className = "fact-label";
  labelEl.textContent = label;

  const valueEl = document.createElement("span");
  valueEl.className = "fact-value";
  valueEl.textContent = value;

  row.append(labelEl, valueEl);
  container.append(row);
}

async function showCountry(name) {
  const rawName = name.trim();
  const safeName = rawName || "ethiopia";
  const normalizedName = safeName.toLowerCase();

  factsBox.textContent = "Loading...";
  factsBox.classList.remove("error");

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(safeName)}`);
    if (!res.ok) throw new Error("Country not found");

    const data = await res.json();
    let country = Array.isArray(data) ? data[0] : null;

    if (!country && normalizedName === "ethiopia") {
      country = ethiopiaFallback;
    }

    if (!country) throw new Error("Country not found");

    factsBox.innerHTML = "";

    const flagBox = document.createElement("div");
    flagBox.className = "flag-box";

    const flagImg = document.createElement("img");
    flagImg.src = country.flags?.svg || country.flags?.png || "";
    flagImg.alt = `${country.name?.common || "Country"} flag`;

    if (flagImg.src) {
      flagBox.append(flagImg);
      factsBox.append(flagBox);
    }

    renderFact(factsBox, "Capital", country.capital?.[0] || "Unknown");
    renderFact(factsBox, "Population", country.population?.toLocaleString() || "Unknown");
    renderFact(factsBox, "Region", country.region || "Unknown");

    const currencies = country.currencies
      ? Object.values(country.currencies).map((currency) => currency.name).join(", ")
      : "Unknown";
    renderFact(factsBox, "Currencies", currencies);
  } catch (err) {
    if (normalizedName === "ethiopia") {
      factsBox.innerHTML = "";
      const flagBox = document.createElement("div");
      flagBox.className = "flag-box";

      const flagImg = document.createElement("img");
      flagImg.src = ethiopiaFallback.flags.svg;
      flagImg.alt = "Ethiopia flag";
      flagBox.append(flagImg);
      factsBox.append(flagBox);

      renderFact(factsBox, "Capital", ethiopiaFallback.capital[0]);
      renderFact(factsBox, "Population", ethiopiaFallback.population.toLocaleString());
      renderFact(factsBox, "Region", ethiopiaFallback.region);
      renderFact(factsBox, "Currencies", Object.values(ethiopiaFallback.currencies).map((c) => c.name).join(", "));
      return;
    }

    factsBox.textContent = err.message || "Something went wrong.";
    factsBox.classList.add("error");
  }
}

searchBtn.addEventListener("click", () => {
  showCountry(countryInput.value);
});

countryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showCountry(countryInput.value);
  }
});

showCountry("ethiopia");
