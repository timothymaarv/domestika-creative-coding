// lines

//  The math.mapRange function takes a condition, lower limit, upper limit, output 1 and output 2 which are all numerical values
//  If the condition is reached to a number between the set limits, output one will work, else it will revert to output 2

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

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
    this.radius = random.range(1, 3);
  }

  update() {
    this.pos.x += this.velocity.x * 20;
    this.pos.y += this.velocity.y * 20;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.lineWidth = random.range(4, 12);
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.stroke();
    // context.fill();

    context.restore();
  }

  bounce(width, height) {
    if (this.pos.x >= width || this.pos.x <= 0) this.velocity.x *= -1;
    if (this.pos.y >= height || this.pos.y <= 0) this.velocity.y *= -1;
  }
}

function getDistance(current, other) {
  const dx = current.pos.x - other.pos.x;
  const dy = current.pos.y - other.pos.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance;
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
    context.fillStyle = "black";
    context.strokeStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 2; j < agents.length; j++) {
        const other = agents[j];

        const distance = getDistance(other, agent);

        if (distance > 100) continue;

        context.lineWidth = math.mapRange(distance, 0, 15, 0.6, 0.3);

        context.beginPath();
        context.moveTo(other.pos.x, other.pos.y);
        context.lineTo(agent.pos.x, agent.pos.y);
        context.stroke();
        context.closePath();
      }
    }

    agents.forEach((agent, i) => {
      agent.update();
      agent.bounce(width, height);
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);
