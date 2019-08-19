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

const drawingFunctions = {};
const numberOfSquares = 16;

for (let i = 0; i < numberOfSquares; ++i) {
  drawingFunctions[i] = {
    draw: ({
      context,
      delta,
      x,
      y,
      squareSize,
      dpr,
      features: { energy },
      stopAnimating
    }) => {
      context.save();
      let width;
      let height;

      if (stopAnimating) {
        context.translate(x + margin1, y + margin1);
        width = squareSize - margin2;
        height = squareSize - margin2;
      } else {
        context.translate(x + margin1 - energy, y + margin1 - energy);
        width = squareSize - margin2 + energy * 2;
        height = squareSize - margin2 + energy * 2;
      }

      mysticRose({
        delta,
        context,
        width,
        height,
        dpr,
        numPoints: 2 + i
      });
      context.restore();
    }
  };
}

export default drawingFunctions;
