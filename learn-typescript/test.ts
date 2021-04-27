const button = document.getElementById("button");
const num1 = document.getElementById("num1")! as HTMLInputElement;
const num2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

console.log(add(+num1.value, +num2.value));
