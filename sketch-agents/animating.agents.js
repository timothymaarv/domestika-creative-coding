// animating agents

// This module introduces animation and moving objects, canvas sketch has a built in animation frame so we do not have to do this manually
// We have also added a bounce effect when the objects hit the boundaries of the canvas, we do this by reversing the velocity of motion at the boundaries

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.velocity = new Vector(random.range(-2, 2), random.range(-2, 2));
    this.radius = random.range(4, 12);
  }

  update() {
    this.pos.x += this.velocity.x * 10;
    this.pos.y += this.velocity.y * 10;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.lineWidth = 4;
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.stroke();

    context.restore();
  }

  bounce(width, height) {
    if (this.pos.x >= width || this.pos.x <= 0) this.velocity.x *= -1;
    if (this.pos.y >= height || this.pos.y <= 0) this.velocity.y *= -1;
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

    agents.forEach((agent, i) => {
      agent.update();
      agent.bounce(width, height);
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);
