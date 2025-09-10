const display = document.getElementById("display");

function append(char) { display.value += char; }
function clearDisplay() { display.value = ''; }
function sqrt() { try { display.value = Math.sqrt(eval(display.value)); } catch { display.value = 'Erro'; } }
function power() { display.value += '**'; }
function func(fn) {
  try { display.value = fn + '(' + eval(display.value) + ')'; }
  catch { display.value = 'Erro'; }
}
function calculate() { try { display.value = eval(display.value); } catch { display.value = 'Erro'; } }
function showTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Conversões */
function convert(type) {
  let v, res;
  if (type === 'km') {
    v = parseFloat(document.getElementById('kmInput').value);
    res = isNaN(v) ? 'Erro' : (v*1000) + ' m';
    document.getElementById('kmOut').innerText = res;
  }
  if (type === 'temp') {
    v = parseFloat(document.getElementById('tempInput').value);
    res = isNaN(v) ? 'Erro' : ((v*9/5)+32).toFixed(2) + ' °F';
    document.getElementById('tempOut').innerText = res;
  }
  if (type === 'time') {
    v = parseFloat(document.getElementById('timeInput').value);
    res = isNaN(v) ? 'Erro' : (v*60) + ' min';
    document.getElementById('timeOut').innerText = res;
  }
}
