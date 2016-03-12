import uniform from './uniform';

const tau = Math.PI * 2;

// See: https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
export default function normal(min = 0, max = 1, seed = 'seed', mean = 0.5, deviation = 0.2) {
  const uniformGenerator = uniform(0, 1, seed);
  let spare;
  let spareAvailable = false;
  const applyParams = (value) => Math.min(Math.max(min, (value * deviation + mean)), max);

  return function next() {
    if (spareAvailable) {
      spareAvailable = false;
      return spare;
    }

    const u1 = uniformGenerator();
    const u2 = uniformGenerator();

    spare = applyParams(Math.sqrt(-2 * Math.log(u1)) * Math.sin(tau * u2));
    spareAvailable = true;
    return applyParams(Math.sqrt(-2 * Math.log(u1)) * Math.cos(tau * u2));
  };
}
