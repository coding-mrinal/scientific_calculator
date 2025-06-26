const display = document.getElementById('display');

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/', '%', '**'].includes(lastChar) && operator !== '**') {
        if (['+', '-', '*', '/', '%', '**'].includes(operator)) {
            display.value = display.value.slice(0, -1) + operator;
        } else {
            return;
        }
    }
    display.value += operator;
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function appendMathFunction(func) {
    const value = display.value;
    const lastChar = value.slice(-1);
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

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        expression = expression
            .replace(/Math\.sin$toRadians$/g, 'Math.sin$toRadians$')
            .replace(/Math\.cos$toRadians$/g, 'Math.cos$toRadians$')
            .replace(/Math\.tan$toRadians$/g, 'Math.tan$toRadians$');
        const result = eval(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
}

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
