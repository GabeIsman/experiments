import XOR4096 from 'seedrandom/lib/xor4096';


export default function uniform(min = 0, max = 1, seed = 'seed') {
  const generator = new XOR4096(seed);

  return function next() {
    return generator() * (max - min) + min;
  };
}
