// angles

// In this module, we cover rotations and demo making example rectangles align around a circular path.
// We use the principles of trigonometry, reset and rotation to achieve this.

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
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

    const count = Math.random() + (80 - 12);
    const r = width * 0.3;

    for (let i = 0; i < count; i++) {
      const slice = degToRad(360 / count);
      const angle = slice * i;

      cx = x + r * Math.sin(angle);
      cy = y + r * Math.cos(angle);

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
