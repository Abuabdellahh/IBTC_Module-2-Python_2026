const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getTeleBirrFee(tipAmount) {
  switch (true) {
    case tipAmount >= 100:
      return 15;
    case tipAmount >= 50:
      return 10;
    case tipAmount >= 20:
      return 5;
    default:
      return 0;
  }
}

function calculateTip(billAmount) {
  return billAmount > 300 ? billAmount * 0.10 : billAmount * 0.05;
}

function processPayment(bill, partySize) {
  const tipAmount = calculateTip(bill);
  const teleBirrFee = getTeleBirrFee(tipAmount);
  const totalAmount = bill + tipAmount + teleBirrFee;
  const perPersonAmount = totalAmount / partySize;

  console.log(`
════════════════════════════════════════
       TeleBirr Tip & Split Calculator
════════════════════════════════════════
Bill Amount:          ${bill.toFixed(2)} ETB
Tip (${bill > 300 ? '10%' : '5%'}):                ${tipAmount.toFixed(2)} ETB
TeleBirr Service Fee: ${teleBirrFee.toFixed(2)} ETB
────────────────────────────────────────
Total Amount:         ${totalAmount.toFixed(2)} ETB
Party Size:           ${partySize} people
Amount Per Person:    ${perPersonAmount.toFixed(2)} ETB
════════════════════════════════════════`);
}

// Sample inputs
const sampleBill = 500;
const samplePartySize = 4;

console.log('Processing sample payment...\n');
processPayment(sampleBill, samplePartySize);
