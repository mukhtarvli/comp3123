// Exercise #01


let txts  = "the quickk brown fox"
let capitalizedWords = txts.split(" ").map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
).join(" ")

console.log(capitalizedWords)

// Exercise #02


function max(num1, num2, num3) {
  return Math.max(num1, num2, num3);
}

console.log(max (1,0,1));
console.log(max (0,-10,-20));
console.log(max (1000,510,440));

// Exercise #03

function right(word){
    if(word.length < 3){
        return word
    }

    let lastThree = word.slice(-3)
    let remaining  = word.slice(0 , -3)

    return lastThree + remaining
}

console.log(right("Python"));
console.log(right("JavaScript"));
console.log(right("Hi"));


// Exercise #04

function angle_Type(angle) {
  if (angle > 0 && angle < 90) {
    return "Acute angle";
  } else if (angle === 90) {
    return "Right angle";
  } else if (angle > 90 && angle < 180) {
    return "Obtuse angle";
  } else if (angle === 180) {
    return "Straight angle";
  }
}

console.log(angle_Type(47))
console.log(angle_Type(90))
console.log(angle_Type(145))
console.log(angle_Type(180))

// Exercise #05

function array_max_sum(array, k) {
  let maxSum = 0;

  for (let i = 0; i <= array.length - k; i++) {
    let currentSum = 0;

    for (let j = i; j < i + k; j++) {
      currentSum += array[j];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
}

console.log(array_max_sum([1, 2, 3, 14, 5], 2));
