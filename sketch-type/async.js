// async

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

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const fs = 1200;
    const family = "serif";

    context.fillStyle = "black";
    context.font = `${fs}px ${family}`;
    context.textBaseline = "top"; //canvas reference

    const text = letter;

    const metrics = context.measureText(text);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;

    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5 - mx;
    const y = (width - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };
};

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();
