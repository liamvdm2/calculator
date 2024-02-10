const display = document.getElementById('display');

let operation = null;
let number1 = '';
let number2 = '';

function chooseOperation(op) {
    operation = op;
    number1 = display.value;
    display.value = '';
}

function appendNumber(number) {
    display.value += number;
}

function calculate() {
    number2 = display.value;
    let result = eval(`${number1}${operation}${number2}`);
    display.value = result;
    
    // Save the calculation to history before resetting variables
    saveHistory(`${number1}${operation}${number2}`, result);
    
    operation = null;
    number1 = '';
    number2 = '';
}
function clearDisplay() {
    display.value = '';
    operation = null;
    number1 = '';
    number2 = '';
}

function loadHistory() {
    const historyList = document.getElementById('historyList');
    const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

    savedHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(li);
    });
}

// Save history to localStorage
function saveHistory(expression, result) {
    const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    savedHistory.push({ expression, result });
    localStorage.setItem('calculatorHistory', JSON.stringify(savedHistory));
}

// Modify the compute function to save the history

// Call loadHistory on page load
window.onload = loadHistory;