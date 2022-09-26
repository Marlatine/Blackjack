export function randomIntFromInterval(min, max) {
  const a = Math.floor(Math.random() * (max - min + 1) + min);

  const b = Math.floor(Math.random() * (max - min + 1) + min);

  return [a, b];
}


