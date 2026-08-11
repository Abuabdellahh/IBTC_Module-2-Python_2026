'use strict';

// Habesha Eatery order module.
// A set of small, pure pricing functions plus one closure-based receipt maker.

const VAT_RATE = 0.15;      // Ethiopian VAT
const MEMBER_RATE = 0.10;   // loyalty member discount

// Sum any number of item prices with a reduce callback.
const subtotal = (...prices) => prices.reduce((sum, price) => sum + price, 0);

// Factory: given a rate, return an arrow that applies that discount.
const discountBy = (rate) => (amount) => amount - amount * rate;

// Add VAT on top of an amount.
const withVat = (amount, rate = VAT_RATE) => amount + amount * rate;

// Format a number as an ETB money string.
const toETB = (amount) => `${amount.toFixed(2)} ETB`;

// Closure: hands back a receipt maker with a private, running order number.
const makeReceiptMaker = () => {
  let orderNumber = 0;
  return (amount) => `#${(orderNumber += 1)}: ${toETB(amount)}`;
};

// Compose the pieces: subtotal -> member discount -> VAT.
const memberDiscount = discountBy(MEMBER_RATE);
const priceOrder = (...prices) => withVat(memberDiscount(subtotal(...prices)));

module.exports = {
  VAT_RATE,
  MEMBER_RATE,
  subtotal,
  discountBy,
  withVat,
  toETB,
  makeReceiptMaker,
  memberDiscount,
  priceOrder,
};
