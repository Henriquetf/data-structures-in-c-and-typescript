#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

typedef struct Node
{
  int value;
  int col;
  struct Node *next;
} Node;

typedef struct
{
  Node **nodes;
  int rows;
  int cols;
} SparseMatrix;

typedef struct
{
  Node *previous;
  Node *current;
  Node *next;
} SearchNodeResult;

SparseMatrix *initSparseMatrix(int rows, int cols)
{
  SparseMatrix *matrix = malloc(sizeof(SparseMatrix));
  matrix->rows = rows;
  matrix->cols = cols;
  matrix->nodes = malloc(rows * sizeof(Node *));

  for (int i = 0; i < rows; i++)
  {
    matrix->nodes[i] = NULL;
  }

  return matrix;
}

Node *initNode(int value, int col, Node *nextNode)
{
  Node *node = malloc(sizeof(Node));
  node->value = value;
  node->col = col;
  node->next = nextNode;

  return node;
}

SearchNodeResult *searchNode(SparseMatrix *matrix, int row, int col)
{
  SearchNodeResult *result = malloc(sizeof(SearchNodeResult));

  result->previous = NULL;
  result->current = matrix->nodes[row];

  while (result->current != NULL && result->current->col < col)
  {
    result->previous = result->current;
    result->current = result->current->next;
  }

  if (result->current != NULL && result->current->col != col)
  {
    result->next = result->current;
    result->current = NULL;
  }

  return result;
}

int searchNodeValue(SparseMatrix *matrix, int row, int col)
{
  SearchNodeResult *result = searchNode(matrix, row, col);

  if (result->current == NULL)
  {
    return 0;
  }

  return result->current->value;
}

bool insertNode(SparseMatrix *matrix, int row, int col, int value)
{
  if (row < 0 || row >= matrix->rows || col < 0 || col >= matrix->cols)
  {
    return false;
  }

  SearchNodeResult *result = searchNode(matrix, row, col);

  if (result->current != NULL)
  {
    if (value == 0)
    {
      if (result->previous == NULL)
      {
        // Is the first element of the row
        matrix->nodes[row] = result->current->next;
      }
      else
      {
        result->previous->next = result->current->next;
      }

      free(result->current);
    }
    else
    {
      result->current->value = value;
    }
  }
  else if (value != 0)
  {
    Node *newNode = initNode(value, col, result->next);

    if (result->previous == NULL)
    {
      // Is the first element of the row
      matrix->nodes[row] = newNode;
    }
    else
    {
      result->previous->next = newNode;
    }
  }

  return true;
}

void printMatrix(SparseMatrix *matrix)
{
  for (int row = 0; row < matrix->rows; row++)
  {
    for (int col = 0; col < matrix->cols; col++)
    {
      printf("%i\t", searchNodeValue(matrix, row, col));
    }

    printf("\n");
  }

  printf("\n");
}

int main(int argc, char const *argv[])
{
  int rows = 3;
  int cols = 3;
  SparseMatrix *sparseMatrix = initSparseMatrix(rows, cols);

  insertNode(sparseMatrix, 2, 1, 100);
  insertNode(sparseMatrix, 2, 1, 200);
  insertNode(sparseMatrix, 2, 0, 300);
  insertNode(sparseMatrix, 4, 4, 400);
  printMatrix(sparseMatrix);

  insertNode(sparseMatrix, 0, 0, 500);
  printMatrix(sparseMatrix);

  return 0;
}
