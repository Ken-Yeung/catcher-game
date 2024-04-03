export function generateUniqueId(): number {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000000); // Generates a random number up to 999999
  const combined = timestamp + randomNum;
  return parseInt(combined.toString().slice(-6)); // Takes the last 6 units
}
