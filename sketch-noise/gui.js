// GUI

// This module introduces tweakpane which is a convenient tool for quickly changing things in our code from a handy menubar

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  freq: 0.001,
  scaleMin: 1,
  scaleMax: 30,
  amp: 0.2,
  animate: true,
  frame: 0,
  cap: "square",
};

const createPane = () => {
  const pane = new tweakpane.Pane({ expanded: true });

  pane.addFolder({
    title: "Grid",
  });

  pane.addInput(params, "cap", {
    options: { round: "round", butt: "butt", square: "square" },
  });
  pane.addInput(params, "cols", { min: 1, max: 40, step: 1 });
  pane.addInput(params, "rows", { min: 1, max: 40, step: 1 });
  pane.addInput(params, "scaleMin", { min: 1, max: 40 });
  pane.addInput(params, "scaleMax", { min: 1, max: 40 });

  pane.addFolder({
    title: "Noise",
  });

  pane.addInput(params, "animate");
  pane.addInput(params, "amp", { min: 0.1, max: 1 });
  pane.addInput(params, "freq", { min: 0.001, max: 0.01 });

  return pane;
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const cells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < cells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame * 10 : params.frame;

      const n = random.noise3D(x, y, f, params.freq); //More random noise
      // const n = random.noise2D(x + f, y, params.freq); //Third parameter is for frequency
      const angle = n * Math.PI * params.amp; //noise returns a number between 0 and 1, we use Math.PI to broaden the scope

      // let scale = n * 30; //returns a number between -1 and 1
      // let scale = ((n + 1) / 2) * 30; // changes the scale from -1 and 1 to 0 and 1
      let scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax); // changes the output directly

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.rotate(angle);

      context.fillStyle = "black";
      context.lineWidth = scale;
      context.lineCap = params.cap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.closePath();
      context.restore();
    }
  };
};

createPane();
canvasSketch(sketch, settings);
