// Get the display element
const display = document.getElementById('display');

// Append numbers to the display
function appendNumber(number) {
    display.value += number;
}

// Append operators to the display
function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    
    // Prevent multiple consecutive operators
    if (['+', '-', '*', '/', '%', '**'].includes(lastChar) && operator !== '**') {
        if (['+', '-', '*', '/', '%', '**'].includes(operator)) {
            // Replace the last operator if a new one is entered
            display.value = display.value.slice(0, -1) + operator;
        } else {
            return; // Don't allow placing new operators after existing ones unless it's exponentiation
        }
    }
    
    display.value += operator;
}

// Calculate factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Append mathematical functions
function appendMathFunction(func) {
    const value = display.value;
    const lastChar = value.slice(-1);
    
    // Ensure functions start on a new expression or after an operator/parenthesis
    if (value === '' || ['+', '-', '*', '/', '(', ')', '%', '**'].includes(lastChar)) {
        switch(func) {
            case 'sqrt':
                display.value += 'Math.sqrt(';
                break;
            case 'sin':
                display.value += 'Math.sin(toRadians(';
                break;
            case 'cos':
                display.value += 'Math.cos(toRadians(';
                break;
            case 'tan':
                display.value += 'Math.tan(toRadians(';
                break;
            case 'log':
                display.value += 'Math.log(';
                break;
            case 'factorial':
                display.value += 'factorial(';
                break;
        }
    }
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Clear the display
function clearDisplay() {
    display.value = '';
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the expression
function calculate() {
    try {
        let expression = display.value;
        
        // Add degree conversion for trigonometric functions
        expression = expression
            .replace(/Math\.sin$toRadians$/g, 'Math.sin$toRadians$')
            .replace(/Math\.cos$toRadians$/g, 'Math.cos$toRadians$')
            .replace(/Math\.tan$toRadians$/g, 'Math.tan$toRadians$');
        
        // Evaluate the expression with factorial function support
        const result = eval(expression);
        
        // Display the result
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === '%') {
        appendOperator('%');
    } else if (key === '(' || key === ')') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace' || key === 'Delete') {
        deleteLast();
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
});