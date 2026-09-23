// // Excercise #1
// const greeter = (myArray, counter) => {
//   const greetText = "Hello";

//   for (const name of myArray) {
//     console.log(`${greetText} ${name}`);
//   }
// };

// greeter(["Randy Savage", "Ric Flair", "Hulk Hogan"], 3);


// Excercise #2

// function capitalize([firstLetter, ...rest]) {
//   return firstLetter.toUpperCase() + rest.join("");
// }

// console.log(capitalize("fooBar"));
// console.log(capitalize("nodeJs"));

// // Excercise #3
// const colors = ["red", "green", "blue"];

// const capitalizedColors = colors.map(color =>
//   color.charAt(0).toUpperCase() + color.slice(1)
// );

// console.log(capitalizedColors);

// // Excercise #4

// const values = [1, 60, 34, 30, 20, 5];

// const filterLessThan20 = values.filter(value => value < 20);

// console.log(filterLessThan20);

// // Excercise #5
// const array = [1, 2, 3, 4];

// const calculateSum = array.reduce((total, number) => {
//   return total + number;
// }, 0);

// const calculateProduct = array.reduce((total, number) => {
//   return total * number;
// }, 1);

// console.log(calculateSum);
// console.log(calculateProduct);


// // Excercise 6

class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  details() {
    return `Model: ${this.model} Engine ${this.year}`;
  }
}

class Sedan extends Car {
  constructor(name, model, year, balance) {
    super(model, year);
    this.name = name;
    this.balance = balance;
  }

  info() {
    return `${this.name} has a balance of $${this.balance.toFixed(2)}`;
  }
}

const car2 = new Car("Pontiac Firebird", 1976);
console.log(car2.details());

const sedan = new Sedan("Volvo SD", "Volvo", 2018, 30000);
console.log(sedan.info());