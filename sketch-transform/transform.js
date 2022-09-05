// transform

// This module introduces transformations and the idea of translating the canvas
// Translating helps us move the canvas to a certain point that we specify.
// We translate instead of using the x and why cordinates because translating helps us control the anchor point of the shape
// Ww control the anchor point because we want to be able to transform a shape with its midpoint at the center of the shape itself
// We use negative width and height of the shape because its what gets the desired result
// Transforms are accumulated so when we translate the context, every other shape we create will inherit from the transform. We combat this by using save and restore
// Save points to what the context should do at a certain point and restore will reset the context itself

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const w = width * 0.3;
    const h = height * 0.3;
    const x = width * 0.5;
    const y = height * 0.5;

    context.fillStyle = "black";

    context.save();
    context.translate(x, y);
    context.rotate(0.5);

    context.beginPath();
    context.rect(-x * 0.5, -h * 0.5, w, h);
    context.fill();
    context.restore();

    context.save();

    context.beginPath();
    context.arc(w, h, 30, 0, Math.PI * 2);
    context.fill();
    context.restore();
  };
};

canvasSketch(sketch, settings);
