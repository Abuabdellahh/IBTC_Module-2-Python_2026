// Challenge: use map() to extract only product names
const products = [
  { name: "Laptop",     price: 1000 },
  { name: "Phone",      price: 500  },
  { name: "Headphones", price: 100  },
];

const productNames = products.map(({ name }) => name);
console.log(productNames); // ["Laptop", "Phone", "Headphones"]
