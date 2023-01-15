import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { depthFirstSearch } from "./binaryTreeDepthFirstSearch.ts";

Deno.test("test value exists in binary tree", () => {
  const value = 7;
  const found = depthFirstSearch({
    value: 5,
    left: {
      value: 3,
      left: {
        value: 1,
        right: {
          value: 2,
        },
      },
      right: {
        value: 4,
      },
    },
    right: {
      value: 9,
      left: {
        value: 6,
        right: {
          value: 8,
          left: {
            value: 7,
          },
        },
      },
      right: {
        value: 10,
      },
    },
  }, value);

  assertEquals(found, true);
});

Deno.test("test value does not exist in binary tree", () => {
  const value = 7;
  const found = depthFirstSearch({
    value: 5,
    left: {
      value: 3,
      left: {
        value: 1,
        right: {
          value: 2,
        },
      },
      right: {
        value: 4,
      },
    },
    right: {
      value: 9,
      left: {
        value: 6,
        right: {
          value: 8,
        },
      },
      right: {
        value: 10,
      },
    },
  }, value);

  assertEquals(found, false);
});

Deno.test("test value exists in tree of depth 1", () => {
  const value = 5;
  const found = depthFirstSearch({
    value: 5,
  }, value);

  assertEquals(found, true);
});

Deno.test("test value does not exist in tree of depth 1", () => {
  const value = 7;
  const found = depthFirstSearch({
    value: 5,
  }, value);

  assertEquals(found, false);
});

Deno.test("test value exists in left node", () => {
  const value = 1;
  const found = depthFirstSearch({
    value: 5,
    left: {
      value: 1,
    },
  }, value);

  assertEquals(found, true);
});

Deno.test("test value exists in right node", () => {
  const value = 100;
  const found = depthFirstSearch({
    value: 5,
    right: {
      value: 100,
    },
  }, value);

  assertEquals(found, true);
});
