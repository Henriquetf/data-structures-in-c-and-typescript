#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

typedef struct Node
{
  int data;
  struct Node *previous;
  struct Node *next;
} Node;

typedef struct
{
  Node *head;
} Deque;

Node *initNode(int data, Node *nextNode, Node *previousNode)
{
  Node *node = malloc(sizeof(Node));
  node->data = data;
  node->next = nextNode;
  node->previous = previousNode;

  return node;
}

Node *initHeadNode()
{
  Node *head = initNode(0, NULL, NULL);
  head->next = head;
  head->previous = head;

  return head;
}

Deque *initDeque()
{
  Deque *deque = malloc(sizeof(Deque));
  deque->head = initHeadNode();

  return deque;
}

int getDequeSize(Deque *deque)
{
  Node *current = deque->head->previous;
  int size = 0;

  while (current != deque->head)
  {
    current = current->previous;

    size++;
  }

  return size;
}

void printDequeValues(Deque *deque)
{
  Node *current = deque->head->next;

  printf("values: ");

  while (current != deque->head)
  {
    printf("%i ", current->data);

    current = current->next;
  }

  printf("\n");
}

Node *push(Deque *deque, int data)
{
  Node *newNode = initNode(data, deque->head, deque->head->previous);
  deque->head->previous = newNode;
  newNode->previous->next = newNode;

  return newNode;
}

Node *pushLeft(Deque *deque, int data)
{
  Node *newNode = initNode(data, deque->head->next, deque->head);
  deque->head->next = newNode;
  newNode->next->previous = newNode;

  return newNode;
}

bool pop(Deque *deque)
{
  Node *lastNode = deque->head->previous;

  if (lastNode == deque->head)
  {
    return false;
  }

  lastNode->previous->next = deque->head;
  deque->head->previous = lastNode->previous;

  free(lastNode);

  return true;
}

bool popLeft(Deque *deque)
{
  Node *firstNode = deque->head->next;

  if (firstNode == deque->head)
  {
    return false;
  }

  firstNode->next->previous = deque->head;
  deque->head->next = firstNode->next;

  free(firstNode);

  return true;
}

void emptyDeque(Deque *deque)
{
  Node *node = deque->head->previous;

  while (node != deque->head)
  {
    Node *oldNode = node;
    node = node->previous;

    free(oldNode);
  }

  deque->head->next = deque->head;
  deque->head->previous = deque->head;
}

int main(int argc, char const *argv[])
{
  Deque *deque = initDeque();

  int dequeSize = getDequeSize(deque);
  printf("size: %d\n", dequeSize);

  pushLeft(deque, 10);
  pushLeft(deque, 20);
  pushLeft(deque, 30);
  push(deque, 40);
  printDequeValues(deque);

  popLeft(deque);
  printDequeValues(deque);

  pop(deque);
  printDequeValues(deque);

  pop(deque);
  printDequeValues(deque);

  emptyDeque(deque);
  printDequeValues(deque);

  return 0;
}
