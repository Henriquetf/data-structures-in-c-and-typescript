import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { linearSearch } from "./arrays.ts";

Deno.test("linear search found", () => {
  const found = linearSearch([1, 5, 10], 5);

  assertEquals(found, true);
});

Deno.test("linear search not found", () => {
  const found = linearSearch([1, 5, 10], 11);

  assertEquals(found, false);
});
