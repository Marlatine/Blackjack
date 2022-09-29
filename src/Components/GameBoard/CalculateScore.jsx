export function calculateScore(cards) {
  return cards.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
}
