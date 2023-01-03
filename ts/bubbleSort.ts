export function bubbleSort<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let leftElmIndex = 0; leftElmIndex < arr.length - i - 1; leftElmIndex++) {
      const rightElmIndex = leftElmIndex + 1;

      const leftElm = arr[leftElmIndex];
      const rightElm = arr[rightElmIndex];

      if (leftElm > rightElm) {
        arr[leftElmIndex] = rightElm;
        arr[rightElmIndex] = leftElm;
      }
    }
  }
}
