const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let expression = "";
let currentNumber = "";

function updateDisplay() {
  display.textContent = expression || "0";
}

function clearAll() {
  expression = "";
  currentNumber = "";
  updateDisplay();
}

function appendNumber(num) {
  expression += num;
  currentNumber += num;
  updateDisplay();
}

function appendDoubleZero() {
  expression += "00";
  currentNumber += "00";
  updateDisplay();
}

function appendDecimal() {
  if (!currentNumber.includes(".")) {
    expression += ".";
    currentNumber += ".";
    updateDisplay();
  }
}

function applyOperator(op) {
  if (expression === "") return;
  expression += op;
  currentNumber = "";
  updateDisplay();
}

function percent() {
  if (currentNumber) {
    const value = parseFloat(currentNumber) / 100;
    expression = expression.slice(0, -currentNumber.length) + value;
    currentNumber = value.toString();
    updateDisplay();
  }
}

function evaluateExpression() {
  try {
    const result = Function(`return ${expression.replace(/×/g, '*').replace(/÷/g, '/')}`)();
    expression = result.toString();
    updateDisplay();
  } catch {
    display.textContent = "Error";
  }
}

keys.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const number = btn.dataset.number;
  const value = btn.dataset.value;

  if (number) appendNumber(number);
  else if (action === "clear") clearAll();
  else if (action === "00") appendDoubleZero();
  else if (action === "decimal") appendDecimal();
  else if (action === "operator") applyOperator(value);
  else if (action === "percent") percent();
  else if (action === "equals") evaluateExpression();
});

updateDisplay();
