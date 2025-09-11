// Alternar abas
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    tabContents.forEach((tab) => {
      tab.id === target ? tab.classList.add("active") : tab.classList.remove("active");
    });
  });
});

// Elementos da calculadora
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons-grid button");

// Variável para armazenar a expressão atual
let expression = "";

// Função para atualizar o display
function updateDisplay(value) {
  display.value = value;
}

// Função para calcular resultado
function calculate(expr) {
  try {
    // substituir ^ por **
    expr = expr.replace(/\^/g, "**");
    expr = expr.replace(/×/g, "*");

    // substituir % por multiplicação por 0.01
    expr = expr.replace(/%/g, "*0.01");

    // Avaliar expressão com eval (com cuidado)
    const result = eval(expr);

    return result;
  } catch {
    return "Erro";
  }
}

// Manipular clique dos botões da calculadora
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (val !== undefined) {
      // números e ponto
      if (expression === "0" && val !== ".") expression = val;
      else expression += val;
      updateDisplay(expression);
      return;
    }

    switch (action) {
      case "clear":
        expression = "";
        updateDisplay("");
        break;

      case "=":
        if (!expression) break;
        let res = calculate(expression);
        expression = res.toString();
        updateDisplay(expression);
        break;

      case "%":
        expression += "%";
        updateDisplay(expression);
        break;

      case "sqrt":
        if (!expression) break;
        try {
          let val = parseFloat(expression);
          if (isNaN(val)) throw new Error();
          expression = Math.sqrt(val).toFixed(6).toString();
          updateDisplay(expression);
        } catch {
          updateDisplay("Erro");
          expression = "";
        }
        break;

      case "sin":
      case "cos":
      case "tan":
      case "asin":
        if (!expression) break;
        try {
          let val = parseFloat(expression);
          if (isNaN(val)) throw new Error();

          let rad = val * (Math.PI / 180);
          let result;
          if (action === "sin") result = Math.sin(rad);
          else if (action === "cos") result = Math.cos(rad);
          else if (action === "tan") result = Math.tan(rad);
          else if (action === "asin") result = Math.asin(val) * (180 / Math.PI);

          expression = result.toFixed(6).toString();
          updateDisplay(expression);
        } catch {
          updateDisplay("Erro");
          expression = "";
        }
        break;

      case "/":
      case "*":
      case "-":
      case "+":
      case "^":
        if (expression === "") break; // Não permite operador sem número
        expression += action;
        updateDisplay(expression);
        break;

      case "percent":
        expression += "%";
        updateDisplay(expression);
        break;
    }
  });
});

// Conversões
const convButtons = document.querySelectorAll(".conv-btn");

convButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.conv;

    if (type === "km") {
      const km = parseFloat(document.getElementById("kmInput").value);
      if (isNaN(km)) {
        alert("Informe um valor numérico válido para Km");
        return;
      }
      const meters = km * 1000;
      document.getElementById("kmOut").textContent = `${km} Km = ${meters} metros`;
    }

    if (type === "temp") {
      const c = parseFloat(document.getElementById("tempInput").value);
      if (isNaN(c)) {
        alert("Informe um valor numérico válido para temperatura");
        return;
      }
      const f = (c * 9) / 5 + 32;
      document.getElementById("tempOut").textContent = `${c} °C = ${f.toFixed(2)} °F`;
    }

    if (type === "time") {
      const hr = parseFloat(document.getElementById("timeInput").value);
      if (isNaN(hr)) {
        alert("Informe um valor numérico válido para horas");
        return;
      }
      const min = hr * 60;
      document.getElementById("timeOut").textContent = `${hr} horas = ${min} minutos`;
    }
  });
});
