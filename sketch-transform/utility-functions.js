// utility functions

// This module introduces scale and the need for utility functions.
// Taking into account our degrees to radians functions, there are other functions that we might need to create in order to simplfy our work itselt. Take for example, a random number generator with a high and low range.
// Now, there is nothing wrong with creating these by ourselves and yes it is entirely possible and encouraged. However, we have a handy lightweight library that already has these and more.
// This library is called canvas-sketch-utils which is installed and used in this module.

const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  // animate: true,
};

const degToRad = (degrees) => {
  return (degrees * Math.PI) / 180;
}; // converts degree to radians

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const w = width * 0.01;
    const h = height * 0.1;
    const x = width * 0.5;
    const y = height * 0.5;
    let cx, cy;

    context.fillStyle = "black";

    const count = 12;
    const r = width * 0.3;

    for (let i = 0; i < count; i++) {
      const slice = math.degToRad(360 / count);
      const angle = slice * i;

      cx = x + r * Math.sin(angle);
      cy = y + r * Math.cos(angle);

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.scale(random.range(1, 3), 1);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
