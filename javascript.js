const calculator = {
    add: (a,b) => a+b,
    subtract: (a,b) => a-b,
    multiply: (a,b) => a*b,
    divide: (a,b) => {
        if (b === 0) {
            return "Division by zero is not allowed!";
        } else {
            return a/b;
        }
    }
}

// A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5.

let num1, num2, operator;
const operate = (operator, num1, num2) => operator(num1, num2)

let displayValue = '0';

/// Add number input
document.querySelectorAll('.digit-button').forEach((button) => {
    button.addEventListener('click', () => inputDigit(button.textContent));
})

function inputDigit(digit) {
    if (displayValue === '0') {
        displayValue = digit;
    } else {
        displayValue += digit;
    }
    updateDisplay();    
}

// Your calculator should not evaluate more than a single pair of numbers at a time.
// Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-).
// Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).

/// Add equals, clear function
document.getElementById('clear').addEventListener('click', () => CLEAR());
function CLEAR() {
    num1 = undefined; num2 = undefined; operator = undefined;
    displayValue = '0';
    updateDisplay();
    clearPastDisplay();
}

document.getElementById('equals').addEventListener('click', () => EQUALS());
function EQUALS() {
    if (operator === undefined) {
        document.getElementById('past-display').textContent = `${displayValue} = `;
    } else {   
    num2 = +displayValue;
    evaluation();
    operator = undefined;
    }
}

/// Add operation
document.querySelectorAll('.operator-button').forEach((button) => {
    button.addEventListener('click', () => {
        // handle that case
        if (num1 !== undefined && displayValue !== '0') {
            num2 = +displayValue;
            evaluation();
        }
        num1 = +displayValue;
        document.getElementById('past-display').textContent = `${num1} ${button.textContent}`;
        displayValue = '0';

        operator = whichOperation(button.textContent);
    });
});

function updateDisplay() {
    document.getElementById('current-display').textContent = displayValue;
}
function clearPastDisplay() {
    document.getElementById('past-display').textContent = '';
}
function evaluation() {
    displayValue = operate(operator, num1, num2);
    // case divide by 0
    if (typeof displayValue === 'number' && !Number.isInteger(displayValue)) {
            displayValue = Math.round(displayValue*1000)/1000;
        }
    updateDisplay();
    clearPastDisplay();
}

// backspace, dot, negate
document.getElementById('back').addEventListener('click', () => BACK());
document.getElementById('dot').addEventListener('click', () => DOT());
document.getElementById('neg').addEventListener('click', () => NEG());

function BACK() {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}
function DOT() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}
function NEG() {
    displayValue *= -1;
    updateDisplay();
}


// add keyboard support
const digitKeys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ];

const operatorKeys = [
    '+', '-', '*', '/',
]

const specialKeys = [
    'Enter', 'Delete', 'Backspace', '.', '`',
]

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const keyPressed = event.key;

    if (digitKeys.includes(keyPressed)) {
        inputDigit(keyPressed);
    }
    else if (operatorKeys.includes(keyPressed)) {
        if (num1 !== undefined && displayValue !== '0') {
            num2 = +displayValue;
            evaluation();
        }
        num1 = +displayValue;
        document.getElementById('past-display').textContent = `${num1} ${keyPressed}`;
        displayValue = '0';

        operator = whichOperation(keyPressed);
    }
    else if (specialKeys.includes(keyPressed)) {
        switch(keyPressed) {
            case 'Enter':
                EQUALS();
                break;
            case 'Delete':
                CLEAR();
                break;
            case 'Backspace':
                BACK();
                break;
            case '.':
                DOT();
                break;
            case '`':
                NEG();
                break;
        }
    }
}

function whichOperation(key) {
    switch(key) {
        case '+':
            return calculator.add;
        case '-':
            return calculator.subtract;
        case '*':
            return calculator.multiply;
        case '/':
            return calculator.divide;
    }
}
  