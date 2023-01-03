export function linearSearch<T>(haystack: T[], needle: T): boolean {
  for (let index = 0; index < haystack.length; index++) {
    const element = haystack[index];

    if (element === needle) {
      return true;
    }
  }

  return false;
}
