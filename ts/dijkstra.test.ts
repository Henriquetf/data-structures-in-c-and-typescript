import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { dijkstra, WeightedAdjacencyList } from "./dijkstra.ts";

Deno.test("test dijkstra 1", () => {
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

  assertEquals(dijkstra(0, 6, graph), [0, 1, 4, 5, 6]);
});

Deno.test("test dijkstra 2", () => {
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
    { to: 6, weight: 1000 },
    { to: 4, weight: 2 },
    { to: 2, weight: 18 },
  ];
  graph[6] = [
    { to: 3, weight: 1 },
    { to: 5, weight: 1 },
  ];

  assertEquals(dijkstra(0, 6, graph), [0, 2, 3, 6]);
});
