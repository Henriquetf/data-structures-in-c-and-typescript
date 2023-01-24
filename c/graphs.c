#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

typedef struct Edge
{
  int vertex;
  int weight;
  struct Edge *next;
} Edge;

typedef struct Vertex
{
  Edge *head;
} Vertex;

typedef struct
{
  int numVertices;
  int numEdges;
  Vertex *vertices;
} Graph;

#define NOT_SEEN 0
#define SEEN 1
#define SEEN_NOT_FOUND 2

Graph *initGraph(int numVertices)
{
  Graph *graph = malloc(sizeof(Graph));
  graph->numVertices = numVertices;
  graph->numEdges = 0;
  graph->vertices = malloc(numVertices * sizeof(Vertex));

  for (int i = 0; i < numVertices; i++)
  {
    graph->vertices[i].head = NULL;
  }

  return graph;
}

Edge *initEdge(int vertex, int weight)
{
  Edge *edge = malloc(sizeof(Edge));
  edge->vertex = vertex;
  edge->weight = weight;
  edge->next = NULL;

  return edge;
}

bool addEdge(Graph *graph, int ourVertex, int targetVertex, int weight)
{
  // graph does not exist
  if (graph == NULL)
  {
    return false;
  }
  // vertex does not exist
  if (ourVertex < 0 || ourVertex >= graph->numVertices)
  {
    return false;
  }
  // can't point to a vertex that does not exist
  if (targetVertex < 0 || targetVertex >= graph->numVertices)
  {
    return false;
  }

  Vertex *vertex = &graph->vertices[ourVertex];

  Edge *edge = initEdge(targetVertex, weight);
  edge->next = vertex->head;
  vertex->head = edge;
  graph->numEdges++;

  return true;
}

void visitVertexDepth(Graph *graph, int vertex, int *states)
{
  states[vertex] = SEEN;

  Edge *edge = graph->vertices[vertex].head;

  while (edge != NULL)
  {
    if (states[edge->vertex] == NOT_SEEN)
    {
      visitVertexDepth(graph, edge->vertex, states);
    }

    edge = edge->next;
  }

  states[vertex] = SEEN_NOT_FOUND;
}

void depth(Graph *graph)
{
  int states[graph->numVertices];

  // reset graphs state
  for (int vertex = 0; vertex < graph->numVertices; vertex++)
  {
    states[vertex] = NOT_SEEN;
  }

  for (int vertex = 0; vertex < graph->numVertices; vertex++)
  {
    if (states[vertex] == NOT_SEEN)
    {
      visitVertexDepth(graph, vertex, states);
    }
  }
}

void printGraph(Graph *graph)
{
  printf("Vertices: %d - Edges: %d\n", graph->numVertices, graph->numEdges);

  for (int i = 0; i < graph->numVertices; i++)
  {
    printf("\nv%d: ", i);

    Vertex vertex = graph->vertices[i];
    Edge *edge = vertex.head;

    while (edge != NULL)
    {
      printf("v%d(%d) ", edge->vertex, edge->weight);

      edge = edge->next;
    }
  }
}

int main(int argc, char const *argv[])
{
  Graph *graph = initGraph(7);

  //      (1) --- (4) ---- (5)
  //    /  |       |       /|
  // (0)   | ------|------- |
  //    \  |/      |        |
  //      (2) --- (3) ---- (6)
  addEdge(graph, 0, 1, 3);
  addEdge(graph, 0, 2, 1);

  addEdge(graph, 1, 0, 3);
  addEdge(graph, 1, 2, 4);
  addEdge(graph, 1, 4, 1);

  addEdge(graph, 2, 1, 4);
  addEdge(graph, 2, 3, 7);
  addEdge(graph, 2, 0, 1);

  addEdge(graph, 3, 2, 7);
  addEdge(graph, 3, 4, 5);
  addEdge(graph, 3, 6, 1);

  addEdge(graph, 4, 1, 1);
  addEdge(graph, 4, 3, 5);
  addEdge(graph, 4, 5, 2);

  addEdge(graph, 5, 6, 1);
  addEdge(graph, 5, 4, 2);
  addEdge(graph, 5, 2, 18);

  addEdge(graph, 6, 3, 1);
  addEdge(graph, 6, 5, 1);

  printGraph(graph);

  return 0;
}
