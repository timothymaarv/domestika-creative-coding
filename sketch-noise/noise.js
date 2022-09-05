//noise

// This module introduce the idea of noise and explains noise algorithm
// Basically, noise creates randomness and we use this to our advantage
// Luckily, canvas-sketch-util has inbuilt noise generators
//  Frame is added to the noise to increment it and animate

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
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

      const n = random.noise2D(x + frame * 30, y, 0.001); //Third parameter is for frequency
      const angle = n * Math.PI * 0.2; //noise returns a number between 0 and 1, we use Math.PI to broaden the scope

      // let scale = n * 30; //returns a number between -1 and 1
      // let scale = ((n + 1) / 2) * 30; // changes the scale from -1 and 1 to 0 and 1
      let scale = math.mapRange(n, -1, 1, 1, 30); // changes the output directly

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.rotate(angle);

      context.fillStyle = "black";
      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.closePath();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
