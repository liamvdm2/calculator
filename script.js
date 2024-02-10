const display = document.getElementById('display');

let operation = null;
let number1 = '';
let number2 = '';

const historyList = document.getElementById('historyList');
const currentPageSpan = document.getElementById('currentPage');
let currentPage = 1;
const itemsPerPage = 10;
let savedHistory = [];

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

    // Update the memory section to show the new calculation
    loadHistory();

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



function saveHistory(expression, result) {
    // Retrieve the existing history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    
    // Add the new calculation at the beginning of the array
    savedHistory.unshift({ expression, result });
    
    // Save the updated history back to localStorage
    localStorage.setItem('calculatorHistory', JSON.stringify(savedHistory));
}

// Load the latest calculation from localStorage
function loadHistory() {
    const historyList = document.getElementById('historyList');
    // Retrieve the existing history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    
    // Reverse the history array to display the newest calculations first
    const reversedHistory = savedHistory.reverse();
    
    // Clear the current history display
    historyList.innerHTML = '';
    
    // Append each history item to the history list
    reversedHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(li);
    });
}

// Render history for the current page
function renderHistory() {
    historyList.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedHistory = savedHistory.slice(startIndex, endIndex);

    slicedHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(li);
    });

    currentPageSpan.textContent = `Page ${currentPage}`;
}

// Change page
function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) {
        currentPage = 1;
        return;
    }
    if (currentPage > Math.ceil(savedHistory.length / itemsPerPage)) {
        currentPage = Math.ceil(savedHistory.length / itemsPerPage);
        return;
    }
    renderHistory();
}

// Clear all history
function clearAllHistory() {
    localStorage.removeItem('calculatorHistory');
    savedHistory = [];
    historyList.innerHTML = '';
    currentPage = 1;
    currentPageSpan.textContent = `Page ${currentPage}`;
}

function removeFromHistory(expression) {
    // Retrieve the current history from localStorage
    let savedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

    // Filter out the item with the matching expression
    savedHistory = savedHistory.filter(item => item.expression !== expression);

    // Save the updated history back to localStorage
    localStorage.setItem('calculatorHistory', JSON.stringify(savedHistory));

    // Optionally, you can also remove the item from the display
    const historyList = document.getElementById('historyList');
    const liElements = historyList.getElementsByTagName('li');
    for (let i =  0; i < liElements.length; i++) {
        if (liElements[i].textContent === `${expression}`) {
            historyList.removeChild(liElements[i]);
            break;
        }
    }
}

// Call loadHistory on page load
window.onload = loadHistory;