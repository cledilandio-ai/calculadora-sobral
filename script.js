// Controle das abas
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Calculadora 1
const potenciaInput = document.getElementById("potencia");
const fpAtualInput = document.getElementById("fp_atual");
const fpDesejadoInput = document.getElementById("fp_desejado");
const resultado1 = document.getElementById("resultado1");

function calcular1() {
  const kw = parseFloat(potenciaInput.value);
  const fpAtual = parseFloat(fpAtualInput.value);
  const fpDesejado = parseFloat(fpDesejadoInput.value);

  if (isNaN(kw) || isNaN(fpAtual) || isNaN(fpDesejado) || fpAtual >= fpDesejado) {
    resultado1.textContent = "Preencha os campos corretamente.";
    return;
  }

  const tga = Math.tan(Math.acos(fpAtual));
  const tgd = Math.tan(Math.acos(fpDesejado));
  const kvar = kw * (tga - tgd);

  resultado1.textContent = "Necessário instalar " + kvar.toFixed(2) + " kVAr de capacitores.";
}

potenciaInput.addEventListener("input", calcular1);
fpAtualInput.addEventListener("input", calcular1);
fpDesejadoInput.addEventListener("input", calcular1);

// Calculadora 2
const tipoTensao = document.getElementById("tipo_tensao");
const tensao = document.getElementById("tensao");
const kvarInput = document.getElementById("kvar");
const correnteInput = document.getElementById("corrente");
const resultado2 = document.getElementById("resultado2");

function calcular2() {
  const tipo = tipoTensao.value;
  const v = parseFloat(tensao.value);
  const kvar = parseFloat(kvarInput.value);
  const i = parseFloat(correnteInput.value);

  if (isNaN(v) || v <= 0) {
    resultado2.textContent = "Informe a tensão corretamente.";
    return;
  }

  if (!isNaN(kvar) && isNaN(i)) {
    if (tipo === "monofasico") {
      const corrente = (1000 * kvar) / v;
      correnteInput.value = corrente.toFixed(2);
      resultado2.textContent = `Corrente: ${corrente.toFixed(2)} A`;
    } else {
      const corrente = (1000 * kvar) / (Math.sqrt(3) * v);
      correnteInput.value = corrente.toFixed(2);
      resultado2.textContent = `Corrente: ${corrente.toFixed(2)} A`;
    }
  } else if (isNaN(kvar) && !isNaN(i)) {
    if (tipo === "monofasico") {
      const kv = (v * i) / 1000;
      kvarInput.value = kv.toFixed(2);
      resultado2.textContent = `Potência Reativa: ${kv.toFixed(2)} kVAr`;
    } else {
      const kv = (Math.sqrt(3) * v * i) / 1000;
      kvarInput.value = kv.toFixed(2);
      resultado2.textContent = `Potência Reativa: ${kv.toFixed(2)} kVAr`;
    }
  } else {
    resultado2.textContent = "Informe apenas kVAr ou corrente.";
  }
}

tipoTensao.addEventListener("input", calcular2);
tensao.addEventListener("input", calcular2);
kvarInput.addEventListener("input", () => {
  correnteInput.value = "";
  calcular2();
});
correnteInput.addEventListener("input", () => {
  kvarInput.value = "";
  calcular2();
});

// Calculadora 3
const tensaoMotor = document.getElementById("tensao_motor");
const correnteMotor = document.getElementById("corrente_motor");
const fpMotor = document.getElementById("fp_motor");
const rendimentoMotor = document.getElementById("rendimento_motor");
const resultado3 = document.getElementById("resultado3");

function calcular3() {
  const v = parseFloat(tensaoMotor.value);
  const i = parseFloat(correnteMotor.value);
  const fp = parseFloat(fpMotor.value);
  const rendimento = parseFloat(rendimentoMotor.value) / 100;

  if (isNaN(v) || isNaN(i) || isNaN(fp) || isNaN(rendimento) || v <= 0 || i <= 0) {
    resultado3.textContent = "Preencha os campos corretamente.";
    return;
  }

  const kw = (Math.sqrt(3) * v * i * fp * rendimento) / 1000;
  const cv = kw / 0.736;

  resultado3.textContent = `Potência: ${kw.toFixed(2)} kW (${cv.toFixed(2)} CV)`;
}

[tensaoMotor, correnteMotor, fpMotor, rendimentoMotor].forEach(el => {
  el.addEventListener("input", calcular3);
});