function drawPoint(
  context,
  currentPoint,
  totalPoints,
  x,
  y,
  radius,
  size,
  draw
) {
  const i = currentPoint;
  const theta = (Math.PI * 2) / totalPoints;

  const pointX = radius * Math.cos(theta * i) + x;
  const pointY = radius * Math.sin(theta * i) + y;

  if (draw) {
    context.beginPath();
    context.arc(pointX, pointY, size, 0, 2 * Math.PI);
    context.fill();
  }

  return [pointX, pointY];
}

function mysticRose({ context, numPoints, width, height, dpr }) {
  context.fillStyle = "#fff";
  context.strokeStyle = "#fff";
  context.lineWidth = 1 * dpr;
  const points = [];
  for (let i = 0; i < numPoints; i += 1) {
    points.push(
      drawPoint(
        context,
        i,
        numPoints,
        width / 2,
        height / 2,
        width / 2,
        dpr * 2,
        false
      )
    );
  }

  for (let i = 0; i < points.length; i += 1) {
    const x = points[i][0];
    const y = points[i][1];

    for (let j = 0; j < points.length; j += 1) {
      const x2 = points[j][0];
      const y2 = points[j][1];

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x2, y2);
      context.stroke();
    }
  }
}

const margin1 = 10.5;
const margin2 = 20;

export default {
  0: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 2
      });
      context.restore();
    }
  },
  1: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 3
      });
      context.restore();
    }
  },
  2: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 4
      });
      context.restore();
    }
  },
  3: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 5
      });
      context.restore();
    }
  },
  4: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 6
      });
      context.restore();
    }
  },
  5: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 7
      });
      context.restore();
    }
  },
  6: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 8
      });
      context.restore();
    }
  },
  7: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 9
      });
      context.restore();
    }
  },
  8: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 10
      });
      context.restore();
    }
  },
  9: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 11
      });
      context.restore();
    }
  },
  10: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 12
      });
      context.restore();
    }
  },
  11: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 13
      });
      context.restore();
    }
  },
  12: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 14
      });
      context.restore();
    }
  },
  13: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 15
      });
      context.restore();
    }
  },
  14: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 16
      });
      context.restore();
    }
  },
  15: {
    draw({ context, delta, x, y, squareSize, dpr, features: { energy } }) {
      context.save();
      context.translate(x + margin1 - energy, y + margin1 - energy);
      mysticRose({
        delta,
        context,
        width: squareSize - margin2 + energy * 2,
        height: squareSize - margin2 + energy * 2,
        dpr,
        numPoints: 17
      });
      context.restore();
    }
  }
};
