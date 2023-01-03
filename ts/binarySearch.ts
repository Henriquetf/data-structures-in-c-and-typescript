export function binarySearch<T>(haystack: T[], needle: T): boolean {
  let low = 0;
  let high = haystack.length;

  do {
    const middle = Math.floor((low + high) / 2);
    const found = haystack[middle];

    if (found === needle) {
      return true;
    }

    if (found > needle) {
      high = middle;
    } else {
      low = middle + 1;
    }
  } while (low < high);

  return false;
}
