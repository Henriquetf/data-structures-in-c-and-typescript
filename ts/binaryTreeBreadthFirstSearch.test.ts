import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { breadthFirstSearch } from "./binaryTreeBreadthFirstSearch.ts";

Deno.test("test number exists in tree", () => {
  const exists = breadthFirstSearch({
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
  }, 9);

  assertEquals(exists, true);
});

Deno.test("test number does not exist in tree", () => {
  const exists = breadthFirstSearch({
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
  }, 11);

  assertEquals(exists, false);
});

Deno.test("test number exists in tree with one node", () => {
  const exists = breadthFirstSearch({
    value: 5,
  }, 5);

  assertEquals(exists, true);
});

Deno.test("test number does not exist in tree with one node", () => {
  const exists = breadthFirstSearch({
    value: 5,
  }, 6);

  assertEquals(exists, false);
});
