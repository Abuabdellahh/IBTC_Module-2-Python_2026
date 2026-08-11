'use strict';

const { priceOrder, makeReceiptMaker } = require('./order');

// One receipt maker => one shared, private running order number.
const printReceipt = makeReceiptMaker();

// Each order is a list of item prices in ETB.
const orders = [
  [120, 80],        // firfir + tea
  [250, 150, 100],  // doro wat + tibs + injera
  [90],             // macchiato
  [175, 175, 60],   // kitfo + gomen + bread
];

orders
  .map((prices) => priceOrder(...prices))
  .forEach((amount) => console.log(printReceipt(amount)));
