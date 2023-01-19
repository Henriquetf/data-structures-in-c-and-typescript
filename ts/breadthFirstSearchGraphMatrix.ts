import { Queue } from "./queue.ts";

type WeightedAdjacencyMatrix = number[][];

type Path = number[];

interface SearchResult {
  path: Path;
  weight: number;
}

export function breadthFirstSearchGraphMatrix(
  graph: WeightedAdjacencyMatrix,
  source: number, // initial node
  needle: number, // node we're looking for
): SearchResult | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const prev: number[] = new Array(graph.length).fill(-1);

  const queue = new Queue<number>();

  queue.enqueue(source);

  seen[source] = true;

  do {
    const currVertex = queue.dequeue()!;
    const adjacencies = graph[currVertex];

    if (currVertex === needle) {
      break;
    }

    for (let edge = 0; edge < adjacencies.length; edge++) {
      const edgeWeight = adjacencies[edge];

      // Vertex is not an edge to the current vertex
      if (edgeWeight === 0) {
        continue;
      }

      if (seen[edge]) {
        continue;
      }

      seen[edge] = true;
      prev[edge] = currVertex;

      queue.enqueue(edge);
    }
  } while (!queue.isEmpty());

  const path: Path = [];
  let currVertex = needle;
  let weight = 0;

  while (prev[currVertex] !== -1) {
    path.push(currVertex);
    weight += graph[prev[currVertex]][currVertex];
    currVertex = prev[currVertex];
  }

  if (path.length === 0) {
    return null;
  }

  path.push(source);

  return {
    path: path.reverse(),
    weight,
  };
}
