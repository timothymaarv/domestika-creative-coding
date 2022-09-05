// glyphs

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

let manager;

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

let letter = "🦄";

document.querySelector("body").style.backgroundColor = "black";

document.addEventListener("keyup", (e) => {
  letter = e.key.toUpperCase();
  manager.render();
});

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 15;

  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);

  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, width, height);

    const fs = width * 0.03;
    const family = "serif";

    typeContext.fillStyle = "white";
    typeContext.font = `${fs}px ${family}`;
    typeContext.textBaseline = "top"; //canvas reference

    const text = letter;

    const metrics = typeContext.measureText(text);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;

    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const cx = (cols - mw) * 0.5 - mx;
    const cy = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(cx, cy);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.drawImage(typeCanvas, 0, 0);

    context.fillRect(0, 0, width, height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];

      const glyph = getGlyph(r);

      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.font = `${cell * 2}px ${family}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${family}`;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      context.fillText(glyph, 0, 0);

      // context.beginPath();
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      context.restore();
    }
  };
};

const getGlyph = (v) => {
  if (v < 50) return ``;
  if (v < 100) return `.`;
  if (v < 150) return `-`;
  if (v < 200) return `+`;

  const glyphs = `/${letter}${"end sars"}${"fuck 12"}`.split("");

  return random.pick(glyphs);
};

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();
