/* =========================================================
   MI PRONÓSTICO MUNDIAL 2026 - app.js
   Grupo K: Colombia vs Uzbekistán (17 jun), RD Congo (23 jun)
   y Portugal (27 jun) - datos actualizados con sorteo y
   convocatoria oficial de Néstor Lorenzo (26 jugadores).
   ========================================================= */

/* ---------- DATOS REALES - Grupo K, Mundial 2026 ---------- */
// Orden según calendario: 17 jun vs Uzbekistán, 23 jun vs RD Congo, 27 jun vs Portugal
const RIVALES = ["Uzbekistán", "RD Congo", "Portugal"];
const FECHAS = ["17 jun · Azteca, Ciudad de México", "23 jun · Guadalajara", "27 jun · Miami"];

// Convocatoria oficial (26 jugadores) - delanteros y ofensivos primero
// por ser los más probables goleadores
const JUGADORES = [
  "James Rodríguez",
  "Luis Díaz",
  "Jhon Córdoba",
  "Luis Javier Suárez",
  "Juan Camilo Hernández",
  "Carlos Andrés Gómez",
  "Jhon Arias",
  "Juan Fernando Quintero",
  "Jorge Carrascal",
  "Richard Ríos",
  "Jáminton Campaz",
  "Daniel Muñoz",
  "Jefferson Lerma",
  "Gustavo Puerta",
  "Kevin Castaño",
  "Juan Camilo Portilla",
  "Dávinson Sánchez",
  "Yerry Mina",
  "Jhon Lucumí",
  "Santiago Arias",
  "Johan Mojica",
  "Willer Ditta",
  "Déiver Machado",
  "Camilo Vargas",
  "Álvaro Montero",
  "David Ospina"
];

/* ---------- MENSAJES DEL POLLITO ---------- */
const MENSAJES_POLLITO = {
  inicio: "¡Hola! Soy Pollo Goleador. Antes de empezar, decime cómo te llamás 🐥",
  nombreListo: (nombre) => `¡Qué bueno tenerte aquí, ${nombre}! ¿Cómo quieres jugar hoy?`,
  modoRapido: "¡Perfecto! Vamos directo a lo importante: ¡los marcadores! ⚽",
  modoCompleto: "¡Así me gusta, a jugar en serio! Vamos con todos los detalles 🎉",
  partido1: "Partido 1: ¡Colombia vuelve a un Mundial después de 8 años! ¿Cómo le va contra Uzbekistán? 🤔",
  partido2: "¡Vas muy bien! Ahora el partido contra RD Congo 💪",
  partido3: "¡El más difícil! Colombia vs Portugal, con Cristiano Ronaldo. No aflojes 🔥",
  finalPendiente: "¡Ya casi! Dime hasta dónde crees que llega Colombia 🏆",
  llegada: {
    "Fase de grupos": "Bueno... siempre hay que ser realistas 😅",
    "Octavos": "¡Octavos está bien! Un paso a la vez 👍",
    "Cuartos": "¡Cuartos de final! Ahí es donde se pone bueno 🔥",
    "Semifinal": "¡Semifinal! Eso ya es soñar en grande 🙌",
    "Final": "¡La FINAL! Se me eriza el plumaje 😱🐥",
    "Campeón": "¡¡¡CAMPEONES DEL MUNDO!!! ¡Eso es soñar en grande! 🏆🐥🇨🇴"
  },
  listoParaGenerar: "¡Todo listo! Toca el botón para ver tu pronóstico 🐥✅",
  resultado: "¡Aquí está tu pronóstico! Compártelo y que empiece el debate 😄"
};

/* ---------- ESTADO ---------- */
const estado = {
  nombre: "",
  modo: null, // "rapido" | "completo"
  partidos: [
    { rival: RIVALES[0], golesColombia: 0, golesRival: 0, completado: false,
      detallesAbiertos: false, goleador: "", amarilla: null, roja: null },
    { rival: RIVALES[1], golesColombia: 0, golesRival: 0, completado: false,
      detallesAbiertos: false, goleador: "", amarilla: null, roja: null },
    { rival: RIVALES[2], golesColombia: 0, golesRival: 0, completado: false,
      detallesAbiertos: false, goleador: "", amarilla: null, roja: null }
  ],
  llegada: null,
  detallesFinalAbiertos: false,
  goleadorTorneo: "",
  golesTotal: 0,
  campeon: ""
};

/* ---------- REFERENCIAS DOM ---------- */
const $ = (id) => document.getElementById(id);

const inputNombre = $("input-nombre");
const contadorNombre = $("contador-nombre");
const mensajePollito = $("mensaje-pollito");
const pollitoHeader = $("pollito-header");

const seccionModo = $("seccion-modo");
const btnModoRapido = $("btn-modo-rapido");
const btnModoCompleto = $("btn-modo-completo");

const seccionPartidos = $("seccion-partidos");
const acordeonPartidos = $("acordeon-partidos");

const seccionFinal = $("seccion-final");
const opcionesLlegada = $("opciones-llegada");
const btnMasDetallesFinal = $("btn-mas-detalles-final");
const detallesFinal = $("detalles-final");
const selectGoleadorTorneo = $("select-goleador-torneo");
const selectCampeon = $("select-campeon");
const golesTotalSpan = $("goles-total");

const btnGenerar = $("btn-generar");
const ayudaGenerar = $("ayuda-generar");

const resultado = $("resultado");
const tcNombre = $("tc-nombre");
const tcCuerpo = $("tc-cuerpo");
const btnWhatsapp = $("btn-whatsapp");
const btnImagen = $("btn-imagen");
const btnReiniciar = $("btn-reiniciar");

/* ---------- UTILIDADES ---------- */
function setMensajePollito(texto) {
  mensajePollito.textContent = texto;
}

function rebotarPollito() {
  pollitoHeader.style.transform = "scale(1.15) rotate(-6deg)";
  setTimeout(() => { pollitoHeader.style.transform = "scale(1) rotate(0deg)"; }, 220);
}

/* ---------- NOMBRE ---------- */
inputNombre.addEventListener("input", () => {
  estado.nombre = inputNombre.value.trim();
  contadorNombre.textContent = inputNombre.value.length;

  if (estado.nombre.length > 0 && !seccionModo.dataset.activado) {
    seccionModo.dataset.activado = "true";
  }
});

inputNombre.addEventListener("blur", () => {
  if (estado.nombre.length > 0) {
    setMensajePollito(MENSAJES_POLLITO.nombreListo(estado.nombre));
    rebotarPollito();
  }
});

/* ---------- SELECCIÓN DE MODO ---------- */
btnModoRapido.addEventListener("click", () => seleccionarModo("rapido"));
btnModoCompleto.addEventListener("click", () => seleccionarModo("completo"));

function seleccionarModo(modo) {
  estado.modo = modo;

  btnModoRapido.classList.toggle("activo", modo === "rapido");
  btnModoCompleto.classList.toggle("activo", modo === "completo");

  setMensajePollito(modo === "rapido" ? MENSAJES_POLLITO.modoRapido : MENSAJES_POLLITO.modoCompleto);
  rebotarPollito();

  // Construir acordeón si no existe
  if (acordeonPartidos.children.length === 0) {
    construirAcordeon();
  }

  // Mostrar/ocultar botones "más detalles" según modo
  document.querySelectorAll(".mas-detalles-btn").forEach(btn => {
    btn.classList.toggle("oculto", modo !== "completo");
  });

  seccionPartidos.classList.remove("oculto");
  seccionPartidos.scrollIntoView({ behavior: "smooth", block: "start" });

  // Abrir el primer partido
  abrirPartido(0);
}

/* ---------- CONSTRUIR ACORDEÓN ---------- */
function construirAcordeon() {
  estado.partidos.forEach((partido, index) => {
    const card = document.createElement("div");
    card.className = "partido";
    card.id = `partido-${index}`;
    if (index > 0) card.classList.add("bloqueado");

    card.innerHTML = `
      <div class="partido-cabecera" tabindex="0" role="button" aria-expanded="false">
        <span class="num-partido">${index + 1}</span>
        <div class="partido-info">
          <p class="partido-titulo">Colombia vs ${partido.rival}</p>
          <p class="partido-fecha">${FECHAS[index]}</p>
          <p class="partido-resumen" id="resumen-${index}">Toca para predecir el marcador</p>
        </div>
        <span class="chevron">▾</span>
      </div>
      <div class="partido-cuerpo">
        <div class="partido-cuerpo-inner">

          <div class="marcador-fila">
            <div class="equipo-marcador">
              <div class="equipo-nombre">Colombia 🇨🇴</div>
              <div class="stepper">
                <button type="button" data-accion="restar" data-objetivo="col-${index}">−</button>
                <span class="valor" id="col-${index}">0</span>
                <button type="button" data-accion="sumar" data-objetivo="col-${index}">+</button>
              </div>
            </div>
            <div class="vs">VS</div>
            <div class="equipo-marcador">
              <div class="equipo-nombre">${partido.rival}</div>
              <div class="stepper">
                <button type="button" data-accion="restar" data-objetivo="riv-${index}">−</button>
                <span class="valor" id="riv-${index}">0</span>
                <button type="button" data-accion="sumar" data-objetivo="riv-${index}">+</button>
              </div>
            </div>
          </div>

          <button class="mas-detalles-btn oculto" id="btn-detalles-${index}" type="button">
            ➕ Más detalles
          </button>

          <div class="detalles" id="detalles-${index}">
            <div class="detalles-inner">

              <div class="campo-detalle">
                <label for="goleador-${index}">Goleador de Colombia en este partido</label>
                <select class="detalle-select" id="goleador-${index}">
                  <option value="">Sin elegir</option>
                  ${JUGADORES.map(j => `<option value="${j}">${j}</option>`).join("")}
                </select>
              </div>

              <div class="campo-detalle">
                <label>¿Habrá tarjeta amarilla para Colombia?</label>
                <div class="si-no" data-objetivo="amarilla-${index}">
                  <button type="button" data-valor="si">Sí</button>
                  <button type="button" data-valor="no">No</button>
                </div>
              </div>

              <div class="campo-detalle">
                <label>¿Habrá tarjeta roja para Colombia?</label>
                <div class="si-no" data-objetivo="roja-${index}">
                  <button type="button" data-valor="si">Sí</button>
                  <button type="button" data-valor="no">No</button>
                </div>
              </div>

            </div>
          </div>

          <button class="continuar-btn" id="continuar-${index}" type="button">
            ${index < 2 ? "Siguiente partido ▾" : "Continuar al pronóstico final ▾"}
          </button>

        </div>
      </div>
    `;

    acordeonPartidos.appendChild(card);
  });

  // Listeners de cabecera (abrir/cerrar manual)
  estado.partidos.forEach((_, index) => {
    const cabecera = document.querySelector(`#partido-${index} .partido-cabecera`);
    cabecera.addEventListener("click", () => toggleManualPartido(index));
    cabecera.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleManualPartido(index);
      }
    });
  });

  // Listeners de steppers (marcador)
  acordeonPartidos.querySelectorAll(".stepper button").forEach(btn => {
    btn.addEventListener("click", () => {
      const objetivo = btn.dataset.objetivo;
      const accion = btn.dataset.accion;
      cambiarValor(objetivo, accion);
    });
  });

  // Listeners de "más detalles"
  estado.partidos.forEach((_, index) => {
    const btn = $(`btn-detalles-${index}`);
    btn.addEventListener("click", () => toggleDetalles(index));
  });

  // Poblar selects de goleador
  estado.partidos.forEach((_, index) => {
    const sel = document.getElementById(`goleador-${index}`);
    JUGADORES.forEach(j => {
      const opt = document.createElement("option");
      opt.value = j; opt.textContent = j;
      sel.appendChild(opt);
    });
  });
  // Poblar select goleador torneo
  const selTorneo = document.getElementById("select-goleador-torneo");
  JUGADORES.forEach(j => {
    const opt = document.createElement("option");
    opt.value = j; opt.textContent = j;
    selTorneo.appendChild(opt);
  });

  // Listeners de selects de goleador
  estado.partidos.forEach((_, index) => {
    $(`goleador-${index}`).addEventListener("change", (e) => {
      estado.partidos[index].goleador = e.target.value;
    });
  });

  // Listeners de Sí/No (amarilla / roja)
  acordeonPartidos.querySelectorAll(".si-no").forEach(grupo => {
    const objetivo = grupo.dataset.objetivo; // ej: "amarilla-0"
    const [tipo, idxStr] = objetivo.split("-");
    const idx = parseInt(idxStr, 10);

    grupo.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        grupo.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        estado.partidos[idx][tipo] = btn.dataset.valor; // "si" | "no"
      });
    });
  });

  // Listeners de botón "continuar"
  estado.partidos.forEach((_, index) => {
    $(`continuar-${index}`).addEventListener("click", () => completarPartido(index));
  });
}

/* ---------- STEPPERS (marcador y goles totales) ---------- */
function cambiarValor(id, accion) {
  const span = $(id);
  let valor = parseInt(span.textContent, 10);

  if (accion === "sumar" && valor < 20) valor++;
  if (accion === "restar" && valor > 0) valor--;

  span.textContent = valor;

  // Sincronizar con estado
  if (id.startsWith("col-")) {
    const idx = parseInt(id.split("-")[1], 10);
    estado.partidos[idx].golesColombia = valor;
    actualizarResumenPartido(idx);
  } else if (id.startsWith("riv-")) {
    const idx = parseInt(id.split("-")[1], 10);
    estado.partidos[idx].golesRival = valor;
    actualizarResumenPartido(idx);
  } else if (id === "goles-total") {
    estado.golesTotal = valor;
  }
}

function actualizarResumenPartido(idx) {
  const p = estado.partidos[idx];
  const resumen = $(`resumen-${idx}`);
  resumen.textContent = `Colombia ${p.golesColombia} - ${p.golesRival} ${p.rival}`;
}

/* ---------- TOGGLE "MÁS DETALLES" (por partido) ---------- */
function toggleDetalles(index) {
  const detalles = $(`detalles-${index}`);
  const abierto = detalles.classList.toggle("abierto");
  estado.partidos[index].detallesAbiertos = abierto;

  const btn = $(`btn-detalles-${index}`);
  btn.textContent = abierto ? "➖ Ocultar detalles" : "➕ Más detalles";
}

/* ---------- ABRIR / CERRAR PARTIDOS (ACORDEÓN) ---------- */
function abrirPartido(index) {
  estado.partidos.forEach((_, i) => {
    const card = $(`partido-${i}`);
    const cabecera = card.querySelector(".partido-cabecera");

    if (i === index) {
      card.classList.add("abierto");
      card.classList.remove("bloqueado");
      cabecera.setAttribute("aria-expanded", "true");
    } else {
      card.classList.remove("abierto");
      cabecera.setAttribute("aria-expanded", "false");
    }
  });

  // Mensaje del pollito según partido
  const mensajesPorIndice = ["partido1", "partido2", "partido3"];
  if (mensajesPorIndice[index]) {
    setMensajePollito(MENSAJES_POLLITO[mensajesPorIndice[index]]);
    rebotarPollito();
  }
}

function toggleManualPartido(index) {
  const card = $(`partido-${index}`);
  if (card.classList.contains("bloqueado")) return; // no se puede abrir si está bloqueado

  const yaAbierto = card.classList.contains("abierto");

  if (yaAbierto) {
    card.classList.remove("abierto");
    card.querySelector(".partido-cabecera").setAttribute("aria-expanded", "false");
  } else {
    abrirPartido(index);
  }
}

/* ---------- COMPLETAR PARTIDO Y AVANZAR ---------- */
function completarPartido(index) {
  estado.partidos[index].completado = true;

  const card = $(`partido-${index}`);
  card.classList.add("completado");
  card.classList.remove("abierto");
  card.querySelector(".partido-cabecera").setAttribute("aria-expanded", "false");

  actualizarResumenPartido(index);

  const siguiente = index + 1;

  if (siguiente < estado.partidos.length) {
    // Desbloquear y abrir el siguiente
    const siguienteCard = $(`partido-${siguiente}`);
    siguienteCard.classList.remove("bloqueado");
    setTimeout(() => abrirPartido(siguiente), 150);
  } else {
    // Todos los partidos completos -> mostrar sección final
    seccionFinal.classList.remove("oculto");
    setMensajePollito(MENSAJES_POLLITO.finalPendiente);
    rebotarPollito();
    setTimeout(() => {
      seccionFinal.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  actualizarEstadoBotonGenerar();
}

/* ---------- SECCIÓN FINAL: LLEGADA ---------- */
opcionesLlegada.querySelectorAll(".opcion-llegada").forEach(btn => {
  btn.addEventListener("click", () => {
    opcionesLlegada.querySelectorAll(".opcion-llegada").forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
    estado.llegada = btn.dataset.valor;

    setMensajePollito(MENSAJES_POLLITO.llegada[estado.llegada] || MENSAJES_POLLITO.finalPendiente);
    rebotarPollito();

    // Mostrar botón "más detalles" si modo completo
    if (estado.modo === "completo") {
      btnMasDetallesFinal.classList.remove("oculto");
    }

    actualizarEstadoBotonGenerar();
  });
});

/* ---------- MÁS DETALLES FINAL ---------- */
btnMasDetallesFinal.addEventListener("click", () => {
  const abierto = detallesFinal.classList.toggle("abierto");
  estado.detallesFinalAbiertos = abierto;
  btnMasDetallesFinal.textContent = abierto ? "➖ Ocultar detalles" : "➕ Más detalles";
});

selectGoleadorTorneo.addEventListener("change", (e) => {
  estado.goleadorTorneo = e.target.value;
});

selectCampeon.addEventListener("change", (e) => {
  estado.campeon = e.target.value;
});

// Stepper de goles totales (definido junto a otros steppers, manejado en cambiarValor)
document.querySelectorAll('[data-objetivo="goles-total"]').forEach(btn => {
  btn.addEventListener("click", () => {
    cambiarValor("goles-total", btn.dataset.accion);
  });
});

/* ---------- HABILITAR BOTÓN GENERAR ---------- */
function actualizarEstadoBotonGenerar() {
  const todosCompletados = estado.partidos.every(p => p.completado);
  const listo = todosCompletados && estado.llegada !== null;

  if (todosCompletados) {
    btnGenerar.classList.remove("oculto");
    ayudaGenerar.classList.remove("oculto");
  }

  btnGenerar.disabled = !listo;

  if (listo) {
    ayudaGenerar.textContent = "¡Todo listo! Toca el botón para ver tu pronóstico";
    setMensajePollito(MENSAJES_POLLITO.listoParaGenerar);
  } else if (todosCompletados) {
    ayudaGenerar.textContent = "Elige hasta dónde llega Colombia para continuar";
  }
}

/* ---------- GENERAR RESULTADO ---------- */
btnGenerar.addEventListener("click", generarResultado);

function generarResultado() {
  const nombreFinal = estado.nombre || "Un hincha anónimo 🐥";

  tcNombre.textContent = `Por: ${nombreFinal}`;

  // Construir HTML del cuerpo
  let html = "";

  estado.partidos.forEach((p, i) => {
    html += `<div class="tc-partido">`;
    html += `<div class="tc-partido-marcador">⚽ Colombia ${p.golesColombia} - ${p.golesRival} ${p.rival}</div>`;

    if (estado.modo === "completo") {
      const detalles = [];
      if (p.goleador) detalles.push(`Goleador: ${p.goleador}`);
      if (p.amarilla) detalles.push(`Amarilla: ${p.amarilla === "si" ? "Sí" : "No"}`);
      if (p.roja) detalles.push(`Roja: ${p.roja === "si" ? "Sí" : "No"}`);

      if (detalles.length > 0) {
        html += `<div class="tc-partido-detalle">${detalles.join(" · ")}</div>`;
      }
    }

    html += `</div>`;
  });

  // Sección final
  html += `<div class="tc-final">`;
  html += `<div>🏆 Colombia llega a: <strong>${estado.llegada}</strong></div>`;

  if (estado.modo === "completo") {
    if (estado.goleadorTorneo) html += `<div>🥇 Goleador del torneo: <strong>${estado.goleadorTorneo}</strong></div>`;
    if (estado.golesTotal > 0) html += `<div>📊 Total de goles de Colombia: <strong>${estado.golesTotal}</strong></div>`;
    if (estado.campeon) html += `<div>🌍 Campeón del Mundial: <strong>${estado.campeon}</strong></div>`;
  }

  html += `</div>`;

  tcCuerpo.innerHTML = html;

  // Construir texto para WhatsApp
  const textoWhatsapp = construirTextoWhatsapp(nombreFinal);
  btnWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(textoWhatsapp)}`;

  resultado.classList.add("visible");
  setMensajePollito(MENSAJES_POLLITO.resultado);
  rebotarPollito();

  btnGenerar.classList.add("oculto");
  ayudaGenerar.classList.add("oculto");

  setTimeout(() => {
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 150);
}

function construirTextoWhatsapp(nombreFinal) {
  let texto = `🇨🇴 MI PRONÓSTICO MUNDIAL 2026 🇨🇴\n`;
  texto += `Por: ${nombreFinal}\n\n`;

  estado.partidos.forEach((p) => {
    texto += `⚽ Colombia ${p.golesColombia} - ${p.golesRival} ${p.rival}\n`;

    if (estado.modo === "completo") {
      if (p.goleador) texto += `   Goleador: ${p.goleador}\n`;
      if (p.amarilla || p.roja) {
        const partes = [];
        if (p.amarilla) partes.push(`Amarilla: ${p.amarilla === "si" ? "Sí" : "No"}`);
        if (p.roja) partes.push(`Roja: ${p.roja === "si" ? "Sí" : "No"}`);
        texto += `   ${partes.join(" | ")}\n`;
      }
    }
  });

  texto += `\n🏆 Colombia llega a: ${estado.llegada}\n`;

  if (estado.modo === "completo") {
    if (estado.goleadorTorneo) texto += `🥇 Goleador del torneo: ${estado.goleadorTorneo}\n`;
    if (estado.golesTotal > 0) texto += `📊 Total goles Colombia: ${estado.golesTotal}\n`;
    if (estado.campeon) texto += `🌍 Campeón del Mundial: ${estado.campeon}\n`;
  }

  texto += `\n¿Tú qué crees? Haz tu pronóstico aquí 👇\n`;
  texto += window.location.href;

  return texto;
}

/* ---------- DESCARGAR COMO IMAGEN ---------- */
btnImagen.addEventListener("click", async () => {
  const tarjeta = $("tarjeta-compartir");

  btnImagen.disabled = true;
  btnImagen.textContent = "⏳ Generando imagen...";

  try {
    const canvas = await html2canvas(tarjeta, {
      scale: 2,
      backgroundColor: null,
      useCORS: true
    });

    const enlace = document.createElement("a");
    enlace.download = "mi-pronostico-mundial-2026.png";
    enlace.href = canvas.toDataURL("image/png");
    enlace.click();
  } catch (err) {
    alert("No se pudo generar la imagen. Intenta de nuevo o usa el botón de WhatsApp.");
    console.error(err);
  } finally {
    btnImagen.disabled = false;
    btnImagen.textContent = "🖼️ Descargar como imagen";
  }
});

/* ---------- REINICIAR ---------- */
btnReiniciar.addEventListener("click", () => {
  window.location.reload();
});
