// environment

// This module introduces canvas-sketch, an npm package that helps with using canvas API in creative coding.
// The nested for loop is a tricky one and is used to make a grid. It will basically run 5 times
// On the first run, i is 0 and we run a loop that draws rectangles four times, while the position of x is still zero
// We repeat this behavior 5 times to get a 5 x 5 grid
// The Math.random() will run at each loop point and id the conditions are met, draw an embedded rectangle into the current one. This works because Math.random() is not always > 0.5

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  // animate: true,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.001;

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (w + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          // context.lineWidth = 2 + Math.random() * 2;
          context.strokeRect(x + 10, y + 10, w - 20, h - 20);
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
