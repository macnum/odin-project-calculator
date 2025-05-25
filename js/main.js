const display = document.querySelector('.display');
const button = document.querySelectorAll('.button-container > button');

let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

function add(a, b) {
	return a + b;
}
function subtract(a, b) {
	return a - b;
}
function divide(a, b) {
	return a / b;
}
function multiply(a, b) {
	return a * b;
}
function remainder(a, b) {
	return a % b;
}
function pow(a, b) {
	return a ** b;
}
function operate() {
	let result;
	firstOperand = parseFloat(firstOperand);
	secondOperand = parseFloat(displayValue);

	console.log(
		`${firstOperand} :firstOperand :---: ${currentOperator}: operator :---:${secondOperand}:secondOperand`
	);
	switch (currentOperator) {
		case '+':
			result = add(firstOperand, secondOperand);
			break;
		case '-':
			result = subtract(firstOperand, secondOperand);
			break;
		case '/':
			if (secondOperand === 0) {
				alert('Cannot divide by zero');
				return 'Error';
			}
			result = divide(firstOperand, secondOperand);
			break;
		case '*':
			result = multiply(firstOperand, secondOperand);
			break;
		case '%':
			if (secondOperand === 0) {
				alert('Cannot divide by zero');
				return 'Error';
			}
			result = remainder(firstOperand, secondOperand);
			break;
		case 'pow':
			result = pow(firstOperand, secondOperand);
			break;
	}

	return result;
}
function handleDecimal() {
	const decimalPoint = '.';
	if (!displayValue.includes(decimalPoint)) {
		displayValue += '.';
	} else {
		displayValue = displayValue;
	}
	showDisplay();
}

function handleBackDelete() {
	if (displayValue.length <= 1) {
		displayValue = '0';
	} else {
		displayValue = displayValue.slice(0, -1);
	}
	showDisplay();
}

function handleNumbers(number) {
	if (displayValue.length >= 17) return;
	if (displayValue === 'Error') {
		displayValue = number;
	} else if (displayValue === '0') displayValue = number;
	else {
		displayValue += number;
	}
	showDisplay();
}

function showDisplay() {
	display.textContent = displayValue;
}

function updateDisplayValue() {
	displayValue = '0';
}
function resetDisplay() {
	updateDisplayValue();
	firstOperand = null;
	secondOperand = null;
	currentOperator = null;
	showDisplay();
}

function handleOperator(operator) {
	if (firstOperand == null) {
		firstOperand = displayValue;
		currentOperator = operator;
	} else {
		const result = operate();
		currentOperator = operator;
		firstOperand = result.toString();
		displayValue = firstOperand;
		showDisplay();
	}

	updateDisplayValue();
}

function handleEquals() {
	if (firstOperand != null && currentOperator != null) {
		const result = operate();
		displayValue = result.toString();
		firstOperand = null;
		secondOperand = null;
		currentOperator = null;
	}
	showDisplay();
}

button.forEach((item) => {
	item.addEventListener('click', (e) => {
		const button = e.target;
		const buttonText = button.textContent;

		if (button.classList.contains('number')) {
			handleNumbers(buttonText);
		} else if (button.classList.contains('back-delete')) {
			handleBackDelete();
		} else if (button.classList.contains('decimal')) {
			handleDecimal();
		} else if (button.classList.contains('clear')) {
			resetDisplay();
		} else if (button.classList.contains('equal')) {
			handleEquals();
		} else if (button.classList.contains('operator')) {
			handleOperator(buttonText);
		}
	});
});

document.addEventListener('keydown', (e) => {
	const NUMERIC = '0123456789';
	const SIGN = '+-%/*pow';
	const keyName = e.key;
	if (NUMERIC.includes(keyName)) {
		handleNumbers(keyName);
	} else if (SIGN.includes(keyName)) {
		handleOperator(keyName);
	} else if (keyName == 'Enter') {
		handleEquals();
	} else if (keyName == 'Backspace') {
		handleBackDelete();
	} else if (keyName == '.') {
		handleDecimal();
	} else if (keyName.toLowerCase() === 'c') resetDisplay();

	console.log(keyName);
});
