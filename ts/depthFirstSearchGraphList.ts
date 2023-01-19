type GraphEdge = {
  to: number;
  weight: number;
};
export type WeightedAdjacencyList = GraphEdge[][];

type Path = number[];

interface SearchResult {
  path: Path;
  weight: number;
}

function walk(
  graph: WeightedAdjacencyList,
  curr: number,
  needle: number,
  seen: boolean[],
  path: Path,
): boolean {
  if (seen[curr]) {
    return false;
  }

  seen[curr] = true;

  path.push(curr);

  if (curr === needle) {
    return true;
  }

  const edges = graph[curr];

  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];

    if (
      walk(
        graph,
        edge.to,
        needle,
        seen,
        path,
      )
    ) {
      return true;
    }
  }

  path.pop();

  return false;
}

export function depthFirstSearchGraphList(
  graph: WeightedAdjacencyList,
  source: number, // initial node
  needle: number, // node we're looking for
): SearchResult | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const path: Path = [];

  if (!walk(graph, source, needle, seen, path)) {
    return null;
  }

  let weight = 0;

  for (let pathIndex = 0; pathIndex < path.length - 1; pathIndex++) {
    const vertex = path[pathIndex];
    const edges = graph[vertex];
    const nextVertex = path[pathIndex + 1];
    const edge = edges.find((e) => e.to === nextVertex);

    weight += edge!.weight;
  }

  return {
    path: path,
    weight,
  };
}
