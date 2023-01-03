import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { binarySearch } from "./binarySearch.ts";

Deno.test("binary search found", () => {
  const found = binarySearch([1, 5, 10], 5);

  assertEquals(found, true);
});

Deno.test("binary search found 2", () => {
  const found = binarySearch([1, 5, 10], 10);

  assertEquals(found, true);
});

Deno.test("binary search found 3", () => {
  const found = binarySearch([1, 5, 10, 13, 20, 25], 20);

  assertEquals(found, true);
});

Deno.test("binary search not found", () => {
  const found = binarySearch([1, 2, 3, 4], 0);

  assertEquals(found, false);
});

Deno.test("binary search not found 2", () => {
  const found = binarySearch([1, 2, 3, 4], 5);

  assertEquals(found, false);
});

Deno.test("binary search not found 3", () => {
  const found = binarySearch([1, 2, 3, 4, 5], 6);

  assertEquals(found, false);
});
