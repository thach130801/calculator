// Your calculator is going to contain functions for all of the basic math operators you typically find on calculators, 
// so start by creating functions for the following items and testing them in your browser’s console.

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
// Create three variables for each of the parts of a calculator operation.
// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

let num1, num2, operator;

const operate = (operator, num1, num2) => operator(num1, num2)

// Create the functions that populate the display when you click the number buttons.
// You should be storing the ‘display value’ in a variable somewhere for use in the next step.

let displayValue = undefined;

/// Add number function
document.querySelectorAll('.digit-button').forEach((button) => {
    button.addEventListener('click', () => {
        const digit = button.textContent;
        if (displayValue === undefined) {
            displayValue = digit;
        } else {
            displayValue += digit;
        }
        updateDisplay();    
    })
})

// Make the calculator work! You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.
// You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘result’ to the operation.
// This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

// Your calculator should not evaluate more than a single pair of numbers at a time.
// Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-).
// Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).

/// Add equals, clear function
document.getElementById('clear').addEventListener('click', () => {
    num1 = undefined; num2 = undefined;
    displayValue = undefined;
    updateDisplay();
    clearPastDisplay();
})  
document.getElementById('equals').addEventListener('click', () => {
    num2 = +displayValue;
    evaluation();  
})

/// Add operation
document.querySelectorAll('.operator-button').forEach((button) => {
    button.addEventListener('click', () => {
        // handle that case
        if (num1 !== undefined && displayValue !== undefined) {
            num2 = +displayValue;
            evaluation();
        }
        num1 = +displayValue;
        document.getElementById('past-display').textContent = `${num1} ${button.textContent}`;
        
        displayValue = undefined;

        switch(button.textContent) {
            case '+':
                operator = calculator.add;
                break;
            case '-':
                operator = calculator.subtract;
                break;
            case 'x':
                operator = calculator.multiply;
                break;
            case '/':
                operator = calculator.divide;
                break;
        }
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
    Number.isInteger(displayValue) ? displayValue : displayValue.toFixed(3);
    updateDisplay();
    clearPastDisplay();
}