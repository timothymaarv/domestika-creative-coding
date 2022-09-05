// bitmap

// reading color values from pixels
// position and color, white and black pixels
//  get image data

const canvasSketch = require("canvas-sketch");

let manager;

const settings = {
  dimensions: [1080, 1080],
};

let letter = "A";

document.addEventListener("keyup", (e) => {
  letter = e.key.toUpperCase();
  manager.render();
});

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 20;

  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);

  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, width, height);

    const fs = cols;
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

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];

      context.fillStyle = `rgb(${r}, ${g}, ${b})`;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      context.beginPath();
      context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      context.fill();

      context.restore();
    }
  };
};

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();
