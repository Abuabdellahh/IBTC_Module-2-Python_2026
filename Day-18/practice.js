// //

// const prices = [120, 200, 160]; // ETB
// // add 15% VAT to each — returns a NEW array
// const withVat = prices.map((p) => p * 1.15);
// // [138, 230, 184]
// // build labels for the screen
// const labels = menu.map((d) => ` ${d}`);

// const dishes = [
//   { name: 'Tibs', price: 200, veg: false },
//   { name: 'Shiro', price: 120, veg: true },
//   { name: 'Misir', price: 110, veg: true },
// ];
// // keep items where the test is true
// dishes.filter((d) => d.veg); // 2 items
// dishes.filter((d) => d.price < 150);
// // first match only
// dishes.find((d) => d.name === 'Shiro');

// const customer = {
//   name: 'Almaz Bekele',
//   phone: '+251911234567',
//   city: 'Addis Ababa',
//   member: true,
// };
// customer.name; // dot access
// customer['phone']; // bracket access
// customer.member = false; // update
// customer.email = 'a@x.et'; // add key

// const order = {
//   id: 1042,
//   customer: 'Tigist Mengistu',
//   items: [
//     { name: 'Tibs', qty: 2, price: 200 },
//     { name: 'Shiro', qty: 1, price: 120 },
//   ],
// };
// order.items[0].name; // "Tibs"
// order.items.length; // 2
// order.items.reduce((s, i) => s + i.qty * i.price, 0);
// // 520 ETB

// const user = { name: 'Hanna', city: 'Bole' };
// // pull keys into variables by name
// const { name, city } = user;
// name; // "Hanna" city; // "Bole"
// // rename + default
// const { name: who, member = false } = user;
// // arrays destructure by POSITION
// const [first, second] = ['Tibs', 'Shiro'];

// // copy an array (not a reference)
// const menu = ['Tibs', 'Shiro'];
// const copy = [...menu];
// // merge arrays
// const full = [...menu, 'Firfir', 'Buna'];
// // copy + override object keys
// const user = { name: 'Eyob', city: 'Piassa' };
// const updated = { ...user, city: 'Kazanchis' };

// // named exports
// export const VAT = 0.15;
// export const withVat = (n) => n * (1 + VAT);
// // default export (one per file)
// export default function format(n) {
//   return `${n.toFixed(2)} ETB`;
// }

// app.js;

// import format, { withVat, VAT } from './pricing.js';
// format(withVat(480)); // "552.00 ETB"

// const orders = [
// { id: 1, items: [{ p: 200, q: 2 }], vip: true },
// { id: 2, items: [{ p: 120, q: 1 }], vip: false },
// ];
// const total = ({ items }) => // destructure
// items.reduce((s, { p, q }) => s + p * q, 0);
// const report = orders
// .filter(o => o.vip) // select
// .map(o => ({ ...o, total: total(o) })) // add
// .map(o => `#${o.id}: ${o.total}

const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 100 },
];
// Challenge
// Use map() to create a new array containing only the product names.
const productNames = products.map((p) => p.name);
console.log(productNames); // ["Laptop", "Phone", "Headphones"]
