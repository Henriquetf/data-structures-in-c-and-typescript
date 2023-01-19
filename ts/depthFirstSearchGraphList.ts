type GraphEdge = {
  to: number;
  weight: number;
};
export type WeightedAdjacencyList = GraphEdge[][];

type Path = number[];

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
): Path | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const path: Path = [];

  if (!walk(graph, source, needle, seen, path)) {
    return null;
  }

  return path;
}
