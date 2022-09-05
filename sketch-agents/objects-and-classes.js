// objects and classes

// This section introduces objects and classes.
// Objects are like containers with key and value pairs we can make references to.
// Classes allow us to create multiple objects with unique features at a go
// We utilize the power of objects and classes to create 40 circles with ease, using random to distinguish their features.

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

const sketch = ({ context, width, height }) => {
  const agents = [];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    const agent = new Agent(x, y);

    agents.push(agent);
  }

  return () => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.save();

    context.fillStyle = "black";

    agents.forEach((agent, i) => {
      agent.draw(context);
    });

    context.restore();
  };
};

canvasSketch(sketch, settings);
