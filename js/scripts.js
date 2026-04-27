const btnGenerate = document.querySelector(".btn-generate");
const select = document.querySelector(".btn-select");
const palette = document.querySelector(".palette");
const colorBoxes = document.querySelectorAll(".color-box");
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

    const optionHex = document.createElement("option");
    optionHex.value = "hex";
    optionHex.textContent = "HEX";

    const optionHsl = document.createElement("option");
    optionHsl.value = "hsl";
    optionHsl.textContent = "HSL";

    selectFormat.appendChild(optionHex);
    selectFormat.appendChild(optionHsl);

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

    section.style.background = hex;

    const text = section.querySelector(".color-code");
    const selectFormat = section.querySelector(".format-select");

    text.textContent = hex;
    text.style.color = getContrastColor(hex);

    console.log(hsl);

    selectFormat.onchange = () => {
      if (selectFormat.value === "hex") {
        text.textContent = hex;
        text.classList.remove("hsl");
      } else {
        text.textContent = hsl;
        text.classList.add("hsl");
      }
    };

    text.onclick = () => {
      const valor = selectFormat.value === "hex" ? hex : hsl;

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
  });
}

function generarColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);

  const hsl = `hsl(${h}, ${s}%, ${l}%)`;
  const hex = hslToHex(h, s, l);

  return { hex, hsl };

  section.onclick = () => {
    navigator.clipboard.writeText(hex);

    const originalText = section.textContent;
    section.textContent = "Copiado!";

    setTimeout(() => {
      section.textContent = originalText;
    }, 800);
  };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = (n) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))),
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

colorBoxes.forEach(box => {
  const hint = document.createElement("div");
  hint.classList.add("copy-hint");
  hint.textContent = "Click en el código de abajo para copiar";
  box.appendChild(hint);
});