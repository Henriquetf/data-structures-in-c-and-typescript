function getPivotIndex(startIndex: number, endIndex: number): number {
  return endIndex;
}

function swap(arr: number[], index1: number, index2: number) {
  const tmp = arr[index1];

  arr[index1] = arr[index2];
  arr[index2] = tmp;
}

function partition(
  arr: number[],
  startIndex: number,
  endIndex: number,
): number {
  const pivotIndex = getPivotIndex(startIndex, endIndex);
  const pivotValue = arr[pivotIndex];

  let newPivotIndex = startIndex;

  for (let i = startIndex; i < endIndex; i++) {
    if (arr[i] <= pivotValue) {
      swap(arr, i, newPivotIndex);

      newPivotIndex++;
    }
  }

  swap(arr, newPivotIndex, pivotIndex);

  return newPivotIndex;
}

export function quickSort(arr: number[], startIndex: number, endIndex: number) {
  // startIndex === endIndex:
  //  The array size is 1
  //  An array of size 1 is always sorted
  // startIndex > endIndex:
  //  The array is empty
  if (startIndex >= endIndex) {
    return;
  }

  const pivotIndex = partition(arr, startIndex, endIndex);

  quickSort(arr, startIndex, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, endIndex);
}
