let currentInput = '';
let prevInput = '';
let operator = '';
let result = 0;

const display = document.getElementById('display');

// Event listener for each button
document.getElementById('clear').addEventListener('click', clearInput);
document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('add').addEventListener('click', setOperator);
document.getElementById('subtract').addEventListener('click', setOperator);
document.getElementById('multiply').addEventListener('click', setOperator);
document.getElementById('divide').addEventListener('click', setOperator);

const numberButtons = document.querySelectorAll('.btn-info');
numberButtons.forEach(button => button.addEventListener('click', appendNumber));

document.getElementById('decimal').addEventListener('click', appendDecimal);

function clearInput() {
  currentInput = '';
  prevInput = '';
  operator = '';
  result = 0;
  display.textContent = '0';
}

function appendNumber(e) {
  const number = e.target.textContent;
  if (currentInput === '0' && number !== '0') {
    currentInput = number;  // Replace '0' with the number
  } else {
    currentInput += number;  // Append number to current input
  }
  display.textContent = currentInput;
}

function appendDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    display.textContent = currentInput;
  }
}

function setOperator(e) {
  // If there is a previous input and the operator is pressed, calculate the result first
  if (prevInput !== '' && currentInput !== '') {
    prevInput = calculate();
    currentInput = '';
  }
  operator = e.target.textContent;

  if (currentInput !== '') {
    prevInput = currentInput; // Store the current input to prevInput
    currentInput = ''; // Clear current input for next number
  }
}

function calculate() {
  if (prevInput !== '' && currentInput !== '') {
    const a = parseFloat(prevInput);
    const b = parseFloat(currentInput);

    switch (operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      default:
        return;
    }

    result = result.toFixed(4); // Round the result to 4 decimal places
    currentInput = result.toString(); // Set the result to current input
    prevInput = ''; // Reset prevInput for the next calculation
    display.textContent = currentInput; // Update the display with the result
    return currentInput;
  }
  return 0;
}
