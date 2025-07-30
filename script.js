const calculator = document.getElementById('calculator');

const display = document.createElement('input');
display.setAttribute('id', 'result');
display.setAttribute('readonly', true);
calculator.appendChild(display);

const idMap = {
  'C': 'clear',
  '=': 'equal',
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '%': 'modulus'
};

const buttonLayout = [
  ['C', '⌫', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '00', '.', '='],
];

buttonLayout.forEach(row => {
  const rowDiv = document.createElement('div');
  rowDiv.className = 'd-flex justify-content-between';

  row.forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary calc-button';
    btn.textContent = label;

    if (!isNaN(label)) {
      btn.id = label;
    } else if (idMap[label]) {
      btn.id = idMap[label];
    }

    btn.addEventListener('click', () => handleInput(label));
    rowDiv.appendChild(btn);
  });

  calculator.appendChild(rowDiv);
});

function handleInput(value) {
  if (value === 'C') {
    display.value = '';
  } else if (value === '⌫') {
    display.value = display.value.slice(0, -1);
  } else if (value === '=') {
    try {
      display.value = eval(display.value);
    } catch {
      alert('Invalid expression');
    }
  } else {
    display.value += value;
  }
}

document.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/.%';
  if (allowed.includes(e.key)) {
    display.value += e.key;
  } else if (e.key === 'Enter') {
    handleInput('=');
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  }
});
