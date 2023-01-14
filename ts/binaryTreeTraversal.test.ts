import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import {
  BinaryNode,
  inOrderSearch,
  postOrderSearch,
  preOrderSearch,
} from "./binaryTreeTraversal.ts";

Deno.test("test order search head is at the beginning of the search result", () => {
  const head: BinaryNode<number> = {
    value: 2,
    left: {
      value: 1,
    },
    right: {
      value: 3,
    },
  };

  const order = preOrderSearch(head);

  assertEquals(order, [2, 1, 3]);
});

Deno.test("test order search head is at the middle of the search result", () => {
  const head: BinaryNode<number> = {
    value: 2,
    left: {
      value: 1,
    },
    right: {
      value: 3,
    },
  };

  const order = inOrderSearch(head);

  assertEquals(order, [1, 2, 3]);
});

Deno.test("test order search head is at the end of the search result", () => {
  const head: BinaryNode<number> = {
    value: 2,
    left: {
      value: 1,
    },
    right: {
      value: 3,
    },
  };

  const order = postOrderSearch(head);

  assertEquals(order, [1, 3, 2]);
});

Deno.test("test pre order search", () => {
  const head: BinaryNode<number> = {
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
  };

  const order = preOrderSearch(head);

  assertEquals(order, [5, 3, 1, 2, 4, 9, 6, 8, 7, 10]);
});

Deno.test("test in order search", () => {
  const head: BinaryNode<number> = {
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
  };

  const order = inOrderSearch(head);

  assertEquals(order, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

Deno.test("test post order search", () => {
  const head: BinaryNode<number> = {
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
  };

  const order = postOrderSearch(head);

  assertEquals(order, [2, 1, 4, 3, 7, 8, 6, 10, 9, 5]);
});
