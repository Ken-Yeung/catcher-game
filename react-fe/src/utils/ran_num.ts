export function getRandomInt(max: number): number {
  const res = parseInt(Math.floor(Math.random() * max).toFixed(0));
  return res;
}

export function getRandomElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}