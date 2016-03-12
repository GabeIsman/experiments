import uniform from '../shared/random/uniform';
import normal from '../shared/random/normal';
import './styles.scss';

const PERIOD = 10;

export default function page() {

  return (`
    <div class="container">
      ${canvas('uniform', uniform)}
      ${canvas('normal', normal)}
      <div class="description">
        TIL: if you set the alpha channel to < 1 on a canvas you can see the dom behind it.
      </div>
    </div>
  `);
}

function canvas(id, distributionFactory) {
  const numTiles = 20;
  const rawDistribution = distributionFactory(
    0, // Min
    numTiles, // Max
    'seed', // Seed
    numTiles / 2, // Mean (normal)
    numTiles / 5); // Std. deviation (normal)
  const distribution = () => Math.floor(rawDistribution());
  const width = 400;
  const height = 400;
  const tileSize = width / numTiles;
  const results = {};
  let context;
  const update = () => {
    window.requestAnimationFrame(() => {
      if (!context) {
        const canvasEl = document.getElementById(id);
        if (!canvasEl.getContext) return;
        context = canvasEl.getContext('2d');
      }

      const x = distribution();
      const y = distribution();
      const key = `${x},${y}`;
      results[key] = results[key] || 0;
      results[key]++;

      context.fillStyle =
        `rgba(${255 - 12 * x}, ${255 - 12 * y}, 25, ${Math.min(1, results[key] / 10)})`;
      context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    });
  };
  window.setInterval(update, PERIOD);
  return (`
    <div class="canvas-container">
      <h3>${id}</h3>
      <canvas id=${id} width="${width}" height="${height}"></canvas>
    </div>
  `);
}
