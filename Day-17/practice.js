

// function showFirstMessage() {
//   console.log("Hello First!");
// }

// function showMessage() {
//   console.log("Hello Second!");
// }

// showMessage(); // Outputs: "Hello Second!"


// function makeGreeter(city) {
// // inner function "closes over" city
// return function (name) {
// return `Selam ${name}, from ${city}`;
// };
// }



// const addis = makeGreeter("Addis Ababa");
// console.log(addis)
// addis("Almaz"); // "Selam Almaz, from..."

// console.log(addis)




// normal expression
// const vat = function (n) { 
//     let result = n * 0.15;
//     console.log(result)
//     return result;    
// };
// vat(480); // 72
// // arrow — same thing, shorter
// const vat = (n) => { return n * 0.15; };
// // one expression → implicit return
// const vat = n => n * 0.15;
// vat(480); // 72


function makeGreeter(city) {
// inner function "closes over" city
return function (name) {
    let result=  `Selam ${name}, from ${city}`;
    console.log(result)
return result
};
}
const addis = makeGreeter("Addis Ababa");
console.log(addis)
addis("Almaz"); // "Selam Almaz, from..."

console.log(addis)

