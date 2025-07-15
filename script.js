
const ramos = [
  { id: "intro_derecho", nombre: "Introducción al derecho", semestre: 1 },
  { id: "civil_personas", nombre: "Derecho civil personas", semestre: 1 },
  { id: "hist_colombia", nombre: "Historia política de Colombia", semestre: 1 },
  { id: "sociologia", nombre: "Fundamentos de Sociología", semestre: 1 },
  { id: "economia", nombre: "Economía Colombiana", semestre: 1 },
  { id: "logica1", nombre: "Razonamiento Lógico I", semestre: 1 },
  { id: "logica_juridica", nombre: "Lógica Jurídica", semestre: 2, prerequisitos: ["intro_derecho"] },
  { id: "teoria_estado", nombre: "Teoría General del Estado", semestre: 2 },
  { id: "hist_derecho", nombre: "Historia del Derecho", semestre: 2 },
  { id: "civil_bienes", nombre: "Derecho civil bienes", semestre: 2, prerequisitos: ["civil_personas"] },
  { id: "intro_penal", nombre: "Introducción al derecho penal", semestre: 2, prerequisitos: ["intro_derecho"] },
];

const malla = document.getElementById("malla");
const estado = {};

for (let i = 1; i <= 10; i++) {
  const semestreDiv = document.createElement("div");
  semestreDiv.className = "semestre";
  semestreDiv.innerHTML = `<h2>Semestre ${i}</h2>`;
  ramos.filter(r => r.semestre === i).forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.dataset.id = ramo.id;
    div.textContent = ramo.nombre;
    if (ramo.prerequisitos) div.classList.add("bloqueado");
    semestreDiv.appendChild(div);
    estado[ramo.id] = { aprobado: false, prerequisitos: ramo.prerequisitos || [] };
  });
  malla.appendChild(semestreDiv);
}

function actualizarBloqueos() {
  document.querySelectorAll(".ramo").forEach(div => {
    const id = div.dataset.id;
    const info = estado[id];
    if (info.aprobado) return;
    if (info.prerequisitos.every(p => estado[p]?.aprobado)) {
      div.classList.remove("bloqueado");
    } else {
      div.classList.add("bloqueado");
    }
  });
}

document.querySelectorAll(".ramo").forEach(div => {
  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado") || div.classList.contains("aprobado")) return;
    div.classList.add("aprobado");
    const id = div.dataset.id;
    estado[id].aprobado = true;
    actualizarBloqueos();
  });
});
