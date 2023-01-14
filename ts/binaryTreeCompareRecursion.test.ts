import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { compare } from "./binaryTreeCompareRecursion.ts";

Deno.test("test both trees are equal", () => {
  const treesAreEqual = compare({
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
  }, {
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
  });

  assertEquals(treesAreEqual, true);
});

Deno.test("test both trees are not equal", () => {
  const treesAreEqual = compare({
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
  }, {
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
        value: 11,
      },
    },
  });

  assertEquals(treesAreEqual, false);
});

Deno.test("test both trees of depth 1 are equal", () => {
  const treesAreEqual = compare({
    value: 5,
  }, {
    value: 5,
  });

  assertEquals(treesAreEqual, true);
});

Deno.test("test both trees of depth 1 are not equal", () => {
  const treesAreEqual = compare({
    value: 5,
  }, {
    value: 10,
  });

  assertEquals(treesAreEqual, false);
});

Deno.test("test both trees without a right node are equal", () => {
  const treesAreEqual = compare({
    value: 5,
    left: {
      value: 100,
    },
  }, {
    value: 5,
    left: {
      value: 100,
    },
  });

  assertEquals(treesAreEqual, true);
});

Deno.test("test both trees without a left node are equal", () => {
  const treesAreEqual = compare({
    value: 5,
    right: {
      value: 100,
    },
  }, {
    value: 5,
    right: {
      value: 100,
    },
  });

  assertEquals(treesAreEqual, true);
});

Deno.test("test both trees of depth 2 are equal", () => {
  const treesAreEqual = compare({
    value: 5,
    left: {
      value: 50,
    },
    right: {
      value: 100,
    },
  }, {
    value: 5,
    left: {
      value: 50,
    },
    right: {
      value: 100,
    },
  });

  assertEquals(treesAreEqual, true);
});
