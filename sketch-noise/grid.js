//grid

// basically, the idea behind the grid is that we need to increment columns by a step of 1, starting from 0
// when x=0, y=0. when x=1,y=0, when x=2,y=0, when x=3,y=0, when x=4,y=0, when x=0,y=1
// We are able to do this by using the remainder % to divide the number of cols for the x, and Math.floor(number / number of cols) for the y axis

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const cells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    console.log(cellw);

    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < cells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.fillStyle = "black";
      context.lineWidth = 4;

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
