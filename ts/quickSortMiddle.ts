function getPivotIndex(startIndex: number, endIndex: number): number {
  return Math.floor((startIndex + endIndex) / 2);
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

  let left = startIndex;
  let right = endIndex;

  while (true) {
    while (arr[left] < pivotValue) {
      left++;
    }

    while (arr[right] > pivotValue) {
      right--;
    }

    if (left >= right) {
      break;
    }

    swap(arr, left, right);
  }

  return right;
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

  quickSort(arr, startIndex, pivotIndex);
  quickSort(arr, pivotIndex + 1, endIndex);
}
