var button = document.getElementById("button");
var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
function add(num1, num2) {
  return num1 + num2;
}
console.log(add(+num1.value, +num2.value));
