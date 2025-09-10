const display = document.getElementById("display");

function append(char) {
  display.value += char;
}

function clearDisplay() {
  display.value = '';
}

function sqrt() {
  try {
    display.value = Math.sqrt(eval(display.value));
  } catch {
    display.value = 'Erro';
  }
}

function power() {
  display.value += '**';
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Erro';
  }
}

function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}
