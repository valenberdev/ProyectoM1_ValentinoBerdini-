/* GENERADOR DE COLORES HEX + HSL */

const btnGenerate = document.querySelector(".btn-generate");
const sections = document.querySelectorAll(".color-section");

btnGenerate.addEventListener("click", () => {
  sections.forEach((section) => {
    const { hex, hsl } = generarColor();

    // aplicar color
    section.style.background = hex;

    // mostrar HEX en pantalla
    section.textContent = hex;

    // mostrar HSL en consola
    console.log(hsl);

    // contraste automático para texto
    section.style.color = getContrastColor(hex);
  });
});

/* FUNCIONES */

// genera color en HEX y HSL
function generarColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);

  const hsl = `hsl(${h}, ${s}%, ${l}%)`;

  const hex = hslToHex(h, s, l);

  return { hex, hsl };
}

// convierte HSL a HEX
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = (n) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    );

  return (
    "#" +
    [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("")
  );
}

// color de texto automático (blanco o negro)
function getContrastColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000" : "#fff";
}
