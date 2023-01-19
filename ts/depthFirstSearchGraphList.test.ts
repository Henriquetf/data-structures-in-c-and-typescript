import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { depthFirstSearchGraphList, WeightedAdjacencyList } from "./depthFirstSearchGraphList.ts";

Deno.test("test simple matrix path", () => {
  const graph: WeightedAdjacencyList = [];
  // (0)
  //    \
  //     >(2) --> (1)
  graph[0] = [
    { to: 2, weight: 3 },
  ];
  graph[1] = [
    { to: 0, weight: 3 },
  ];
  graph[2] = [
    { to: 1, weight: 4 },
  ];

  assertEquals(depthFirstSearchGraphList(graph, 0, 1), {
    path: [0, 2, 1],
    weight: 3 + 4,
  });
});

Deno.test("test complex matrix path 1", () => {
  const graph: WeightedAdjacencyList = [];
  //      (1) --- (4) ---- (5)
  //    /  |       |       /|
  // (0)   | ------|------- |
  //    \  |/      |        |
  //      (2) --- (3) ---- (6)
  graph[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 },
  ];
  graph[1] = [
    { to: 0, weight: 3 },
    { to: 2, weight: 4 },
    { to: 4, weight: 1 },
  ];
  graph[2] = [
    { to: 1, weight: 4 },
    { to: 3, weight: 7 },
    { to: 0, weight: 1 },
  ];
  graph[3] = [
    { to: 2, weight: 7 },
    { to: 4, weight: 5 },
    { to: 6, weight: 1 },
  ];
  graph[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 },
  ];
  graph[5] = [
    { to: 6, weight: 1 },
    { to: 4, weight: 2 },
    { to: 2, weight: 18 },
  ];
  graph[6] = [
    { to: 3, weight: 1 },
    { to: 5, weight: 1 },
  ];

  assertEquals(depthFirstSearchGraphList(graph, 0, 6), {
    path: [0, 1, 2, 3, 4, 5, 6],
    weight: 3 + 4 + 7 + 5 + 2 + 1,
  });
});

Deno.test("test complex matrix path 2", () => {
  const graph: WeightedAdjacencyList = [];

  //     >(1)<--->(4) ---->(5)
  //    /          |       /|
  // (0)     ------|------- |
  //    \   v      v        v
  //     >(2) --> (3) <----(6)
  graph[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 },
  ];
  graph[1] = [
    { to: 4, weight: 1 },
  ];
  graph[2] = [
    { to: 3, weight: 7 },
  ];
  graph[3] = [];
  graph[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 },
  ];
  graph[5] = [
    { to: 2, weight: 18 },
    { to: 6, weight: 1 },
  ];
  graph[6] = [
    { to: 3, weight: 1 },
  ];

  assertEquals(depthFirstSearchGraphList(graph, 6, 0), null);
});
