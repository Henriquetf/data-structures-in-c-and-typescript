import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { breadthFirstSearchGraphMatrix } from "./breadthFirstSearchGraphMatrix.ts";

Deno.test("test simple matrix path", () => {
  // (0)
  //    \
  //     >(2) --> (1)

  const matrix = [
    [0, 0, 5],
    [0, 1, 0],
    [0, 2, 0],
  ];

  const source = 0;
  const needle = 1;
  const expectedPath = [
    0,
    2,
    1,
  ];

  assertEquals(
    breadthFirstSearchGraphMatrix(
      matrix,
      source,
      needle,
    ),
    expectedPath,
  );
});

Deno.test("test complex matrix path", () => {
  //     >(1)<--->(4) ---->(5)
  //    /          |       /|
  // (0)     ------|------- |
  //    \   v      v        v
  //     >(2) --> (3) <----(6)

  const matrix = [
    [0, 3, 1, 0, 0, 0, 0], // 0 -> 1, 2
    [0, 0, 0, 0, 1, 0, 0], // 1 -> 4
    [0, 0, 0, 7, 0, 0, 0], // 2 -> 3
    [0, 0, 0, 0, 0, 0, 0], // 3 ->
    [0, 1, 0, 5, 0, 2, 0], // 4 -> 1, 3, 5
    [0, 0, 18, 0, 0, 0, 1], // 5 -> 2, 6
    [0, 0, 0, 1, 0, 0, 1],
  ];

  const source = 0;
  const needle = 6;
  const expectedPath = [
    0,
    1,
    4,
    5,
    6,
  ];

  assertEquals(
    breadthFirstSearchGraphMatrix(
      matrix,
      source,
      needle,
    ),
    expectedPath,
  );
});

Deno.test("test matrix with impossible path", () => {
  //     >(1)<--->(4) ---->(5)
  //    /          |       /
  // (0)     ------|-------
  //    \   v      v
  //     >(2) --> (3) <----(6)

  const matrix = [
    [0, 3, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1],
  ];

  const source = 0;
  const needle = 6;
  const expectedPath = null;

  assertEquals(
    breadthFirstSearchGraphMatrix(
      matrix,
      source,
      needle,
    ),
    expectedPath,
  );
});
