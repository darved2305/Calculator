let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}
createStars();

function inputNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    display.value = currentInput;
}

function inputOperator(op) {
    if (currentInput === '' && op === '-') {
        currentInput = '-';
        display.value = currentInput;
        return;
    }
    if (currentInput === '') return;
    if (previousInput !== '' && operator !== '' && !shouldResetDisplay) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = false;
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;

    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/':
            if (current === 0) {
                display.value = 'Error';
                resetCalculator();
                return;
            }
            result = prev / current;
            break;
        default: return;
    }

    result = Math.round(result * 100000000) / 100000000;
    display.value = result;
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
    display.value = '';
}

function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
}

function resetCalculator() {
    setTimeout(() => {
        clearDisplay();
    }, 1500);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeButton = document.querySelector('.theme-toggle');
    themeButton.textContent = document.body.classList.contains('dark-theme') ? '☀️ Theme' : '🌙 Theme';
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        inputNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (['Escape', 'c', 'C'].includes(key)) {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
