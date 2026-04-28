# 🎨 Generador de Paletas de Colores

![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Status](https://img.shields.io/badge/Estado-En%20desarrollo-green)
![License](https://img.shields.io/badge/Licencia-MIT-lightgrey)

Aplicación web interactiva que permite generar paletas de colores aleatorias, visualizar sus valores en distintos formatos y guardarlas para su uso posterior.

---

## 🚀 Características principales

- Generación de paletas de colores aleatorias
- Selección de cantidad de colores
- Visualización en formatos:
  - HEX
  - HSL
- Copiado automático al hacer click
- Guardado de múltiples paletas
- Carga de paletas previamente guardadas
- Interfaz moderna y responsiva
- Feedback visual (notificaciones al guardar)

---

## 👤 Manual de Usuario

### 1. Generar una paleta

- Seleccioná la cantidad de colores desde el menú desplegable
- Presioná el botón **"Generar Paleta"**

### 2. Ver códigos de color

- Cada color muestra su código en **HEX por defecto**
- Podés cambiar a **HSL** desde el selector

### 3. Copiar un color

- Hacé click sobre el código
- El valor se copia automáticamente al portapapeles

### 4. Guardar una paleta

- Presioná el botón **"Guardar Paleta"**
- Se almacenará en tu navegador

### 5. Cargar una paleta

- Seleccioná una paleta del menú
- Presioná **"Cargar Paleta"**

---

## ⚙️ Manual Técnico

### Tecnologías utilizadas

- HTML5 → Estructura
- CSS3 → Estilos y diseño responsive
- JavaScript (Vanilla) → Lógica de la aplicación

### Decisiones técnicas

- Uso de **JavaScript puro** (sin frameworks) para mantener simplicidad
- Uso de **localStorage** para persistencia de datos
- Generación de colores mediante modelo **HSL → HEX**
- Diseño modular para facilitar escalabilidad
- Separación de responsabilidades (HTML / CSS / JS)

---

## 📁 Estructura del proyecto

/ProyectoM1_ValentinoBerdini
│
├── /assets
│ ├── fav-iconColorfly.png
│ └── logo_ColorFly.png
│
├── /css
│ ├── reset.css
│ └── styles.css
│
├── /js
│ └── scripts.js
│
├── index.html
└── README.md

---

## 💻 Instalación y ejecución local

### 1. Clonar el repositorio

git clone https://github.com/valenberdev/ProyectoM1_ValentinoBerdini-.git

### 2. Entrar a la carpeta

cd ProyectoM1_ValentinoBerdini-

### 3. Ejecutar la app

Abrir el archivo index.html en el navegador:

start index.html

o hacer doble clic sobre el archivo.

---

## 🌐 Despliegue de la aplicación

### GitHub Pages

- Subir el proyecto a GitHub
- Ir a Settings > Pages
- Seleccionar la rama main
- Guardar
- Acceder al link generado

---

## 📌 Notas

- Las paletas se guardan en el navegador (localStorage)
- Si borrás los datos del navegador, se eliminan
- No requiere backend

---

## 👨‍💻 Autor

Desarrollado por Valentino Berdini 🚀
