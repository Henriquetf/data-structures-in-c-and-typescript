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
} Dequeue;

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

Dequeue *initDequeue()
{
  Dequeue *dequeue = malloc(sizeof(Dequeue));
  dequeue->head = initHeadNode();

  return dequeue;
}

int getDequeueSize(Dequeue *dequeue)
{
  Node *current = dequeue->head->previous;
  int size = 0;

  while (current != dequeue->head)
  {
    current = current->previous;

    size++;
  }

  return size;
}

void printDequeueValues(Dequeue *dequeue)
{
  Node *current = dequeue->head->next;

  printf("values: ");

  while (current != dequeue->head)
  {
    printf("%i ", current->data);

    current = current->next;
  }

  printf("\n");
}

Node *push(Dequeue *dequeue, int data)
{
  Node *newNode = initNode(data, dequeue->head, dequeue->head->previous);
  dequeue->head->previous = newNode;
  newNode->previous->next = newNode;

  return newNode;
}

Node *pushLeft(Dequeue *dequeue, int data)
{
  Node *newNode = initNode(data, dequeue->head->next, dequeue->head);
  dequeue->head->next = newNode;
  newNode->next->previous = newNode;

  return newNode;
}

bool pop(Dequeue *dequeue)
{
  Node *lastNode = dequeue->head->previous;

  if (lastNode == dequeue->head)
  {
    return false;
  }

  lastNode->previous->next = dequeue->head;
  dequeue->head->previous = lastNode->previous;

  free(lastNode);

  return true;
}

bool popLeft(Dequeue *dequeue)
{
  Node *firstNode = dequeue->head->next;

  if (firstNode == dequeue->head)
  {
    return false;
  }

  firstNode->next->previous = dequeue->head;
  dequeue->head->next = firstNode->next;

  free(firstNode);

  return true;
}

void emptyDequeue(Dequeue *dequeue)
{
  Node *node = dequeue->head->previous;

  while (node != dequeue->head)
  {
    Node *oldNode = node;
    node = node->previous;

    free(oldNode);
  }

  dequeue->head->next = dequeue->head;
  dequeue->head->previous = dequeue->head;
}

int main(int argc, char const *argv[])
{
  Dequeue *dequeue = initDequeue();

  int dequeueSize = getDequeueSize(dequeue);
  printf("size: %d\n", dequeueSize);

  pushLeft(dequeue, 10);
  pushLeft(dequeue, 20);
  pushLeft(dequeue, 30);
  push(dequeue, 40);
  printDequeueValues(dequeue);

  popLeft(dequeue);
  printDequeueValues(dequeue);

  pop(dequeue);
  printDequeueValues(dequeue);

  pop(dequeue);
  printDequeueValues(dequeue);

  emptyDequeue(dequeue);
  printDequeueValues(dequeue);

  return 0;
}
