const btnGenerate = document.querySelector(".btn-generate");
const select = document.querySelector(".btn-select");
const palette = document.querySelector(".palette");
const saveBtn = document.getElementById("guardadoPaleta");
const loadBtn = document.getElementById("cargaPaleta");

let cantidad = 0;

select.addEventListener("change", () => {
  cantidad = parseInt(select.value);
  crearSecciones(cantidad);
  generarColores();
});

btnGenerate.addEventListener("click", () => {
  if (cantidad === 0) return;
  generarColores();
});

function crearSecciones(num) {
  palette.innerHTML = "";

  for (let i = 0; i < num; i++) {
    const section = document.createElement("section");
    section.classList.add("color-section");

    const container = document.createElement("div");
    container.classList.add("color-content");

    const text = document.createElement("span");
    text.classList.add("color-code");

    const selectFormat = document.createElement("select");
    selectFormat.classList.add("format-select");

    selectFormat.innerHTML = `
      <option value="hex">HEX</option>
      <option value="hsl">HSL</option>
    `;

    container.appendChild(text);
    container.appendChild(selectFormat);
    section.appendChild(container);
    palette.appendChild(section);
  }
}

function generarColores() {
  const sections = document.querySelectorAll(".color-section");

  sections.forEach((section) => {
    const { hex, hsl } = generarColor();

    aplicarColor(section, { hex, hsl });
  });
}

function aplicarColor(section, color) {
  const text = section.querySelector(".color-code");
  const selectFormat = section.querySelector(".format-select");

  section.style.background = color.hex;

  text.textContent = color.hex;
  text.style.color = getContrastColor(color.hex);

  selectFormat.value = "hex";

  selectFormat.onchange = () => {
    if (selectFormat.value === "hex") {
      text.textContent = color.hex;
      text.classList.remove("hsl");
    } else {
      text.textContent = color.hsl;
      text.classList.add("hsl");
    }
  };

  text.onclick = () => {
    const valor = selectFormat.value === "hex" ? color.hex : color.hsl;

    navigator.clipboard.writeText(valor);

    const original = text.textContent;
    const isHSL = selectFormat.value === "hsl";

    text.textContent = "Copiado!";
    text.classList.remove("hsl");

    setTimeout(() => {
      text.textContent = original;
      if (isHSL) text.classList.add("hsl");
    }, 800);
  };

  console.log(color.hsl);
}

function generarColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);

  const hsl = `hsl(${h}, ${s}%, ${l}%)`;
  const hex = hslToHex(h, s, l);

  return { hex, hsl };
}

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

function getContrastColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000" : "#fff";
}

saveBtn.addEventListener("click", () => {
  const paletteData = [];

  document.querySelectorAll(".color-section").forEach(section => {
    const bg = section.style.backgroundColor;

    const hex = rgbToHex(bg);
    const hsl = rgbToHsl(bg);

    paletteData.push({ hex, hsl });
  });

  localStorage.setItem("savedPalette", JSON.stringify(paletteData));
});

loadBtn.addEventListener("click", () => {
  const saved = JSON.parse(localStorage.getItem("savedPalette"));
  if (!saved) return;

  cantidad = saved.length;
  select.value = cantidad;

  crearSecciones(cantidad);

  const sections = document.querySelectorAll(".color-section");

  sections.forEach((section, index) => {
    aplicarColor(section, saved[index]);
  });
});

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  return "#" + result.map(x => (+x).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(rgb) {
  let [r, g, b] = rgb.match(/\d+/g).map(Number);
  r /= 255; g /= 255; b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

const popup = document.createElement("div");
popup.classList.add("popup-guardado");
popup.textContent = "Paleta guardada correctamente";
document.body.appendChild(popup);

function mostrarPopup() {
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

saveBtn.addEventListener("click", () => {
  const paletteData = [];

  document.querySelectorAll(".color-section").forEach(section => {
    const bg = section.style.backgroundColor;

    const hex = rgbToHex(bg);
    const hsl = rgbToHsl(bg);

    paletteData.push({ hex, hsl });
  });

  localStorage.setItem("savedPalette", JSON.stringify(paletteData));

  mostrarPopup();
});