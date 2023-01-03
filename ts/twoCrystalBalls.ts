export function twoCrystalBalls(breaks: boolean[]): number {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));

  let firstBreakIndex = Math.min(jumpAmount, breaks.length);

  while (firstBreakIndex < breaks.length) {
    if (breaks[firstBreakIndex]) {
      break;
    }

    firstBreakIndex += jumpAmount;
  }

  let secondBreakIndex = firstBreakIndex - jumpAmount;

  while (secondBreakIndex < breaks.length && secondBreakIndex <= firstBreakIndex) {
    if (breaks[secondBreakIndex]) {
      return secondBreakIndex;
    }

    secondBreakIndex++;
  }

  return -1;
}
