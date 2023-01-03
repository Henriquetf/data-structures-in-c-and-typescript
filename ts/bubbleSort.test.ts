import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { bubbleSort } from "./bubbleSort.ts";

Deno.test("bubble sort sorted", () => {
  const arr = [1, 2, 3, 4, 5];
  bubbleSort(arr);

  assertEquals(arr, [1, 2, 3, 4, 5]);
});

Deno.test("bubble sort not sorted 1-5", () => {
  const arr = [1, 5, 4, 2, 3];
  bubbleSort(arr);

  assertEquals(arr, [1, 2, 3, 4, 5]);
});

Deno.test("bubble sort not sorted 1-10", () => {
  const arr = [10, 1, 2, 3, 9, 5, 4, 7, 6, 8];
  bubbleSort(arr);

  assertEquals(arr, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
