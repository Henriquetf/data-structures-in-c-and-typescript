import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { quickSort } from "./quickSort.ts";

Deno.test("test quick sort", () => {
  const arr = [10, 5, 2, 8, 1, 9, 3, 6, 7, 4];

  quickSort(arr, 0, arr.length - 1);

  assertEquals(arr, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

Deno.test("test quick sort in already sorted array", () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  quickSort(arr, 0, arr.length - 1);

  assertEquals(arr, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

Deno.test("test quick sort in reversed array", () => {
  const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  quickSort(arr, 0, arr.length - 1);

  assertEquals(arr, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

Deno.test("test quick sort in array of size 0", () => {
  const arr: number[] = [];

  quickSort(arr, 0, arr.length - 1);

  assertEquals(arr, []);
});

Deno.test("test quick sort in array of size 1", () => {
  const arr = [1];

  quickSort(arr, 0, arr.length - 1);

  assertEquals(arr, [1]);
});

Deno.test("test quick sort in array of size 2", () => {
  const arr = [2, 1];

  quickSort(arr, 0, arr.length - 1);

  assertEquals(arr, [1, 2]);
});

Deno.test("test quick sort in array of size 3", () => {
  const arr = [2, 1, 3];

  quickSort(arr, 0, arr.length - 1);

  assertEquals(arr, [1, 2, 3]);
});
