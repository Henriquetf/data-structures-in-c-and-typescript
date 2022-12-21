#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

typedef struct Node
{
  int data;
  struct Node *next;
} Node;

typedef struct
{
  Node *head;
} LinkedList;

void printNodeValues(Node *node)
{
  printf("%i ", node->data);

  if (node->next != NULL)
  {
    printNodeValues(node->next);
  }
  else
  {
    printf("\n");
  }
}

void printLinkedListValues(LinkedList *list)
{
  if (list->head != NULL)
  {
    printNodeValues(list->head);
  }
}

LinkedList *initLinkedList(Node *head)
{
  LinkedList *list = malloc(sizeof(LinkedList));
  list->head = head;

  return list;
}

int getLinkedListSize(LinkedList *list)
{
  Node *current = list->head;
  int size = 0;

  while (current != NULL)
  {
    current = current->next;

    size++;
  }

  return size;
}

Node *initNode(int data, Node *nextNode)
{
  Node *node = malloc(sizeof(Node));
  node->data = data;
  node->next = nextNode;

  return node;
}

Node *linearSearch(LinkedList *list, int data)
{
  Node *current = list->head;

  while (current != NULL)
  {
    if (current->data == data)
    {
      return current;
    }

    current = current->next;
  }

  return NULL;
}

Node *orderedLinearSearch(LinkedList *list, int data, Node **previousNode)
{
  Node *current = list->head;

  *previousNode = NULL;

  while (current != NULL && current->data < data)
  {
    *previousNode = current;
    current = current->next;
  }

  if (current != NULL && current->data == data)
  {
    return current;
  }

  return NULL;
}

Node *pushSortedData(LinkedList *list, int data)
{
  Node *previousNode = NULL;
  Node *foundNode = orderedLinearSearch(list, data, &previousNode);
  Node *newNode = initNode(data, foundNode);

  if (previousNode == NULL)
  {
    newNode->next = list->head;
    list->head = newNode;
  }
  else
  {
    newNode->next = previousNode->next;
    previousNode->next = newNode;
  }

  return newNode;
}

bool removeSortedData(LinkedList *list, int data)
{
  Node *previousNode = NULL;
  Node *foundNode = orderedLinearSearch(list, data, &previousNode);

  if (foundNode == NULL)
  {
    return false;
  }

  if (previousNode == NULL)
  {
    list->head = foundNode->next;
  }
  else
  {
    previousNode->next = foundNode->next;
  }

  free(foundNode);

  return true;
}

void emptyLinkedList(LinkedList *list)
{
  Node *node = list->head;

  while (node != NULL)
  {
    Node *oldNode = node;
    node = node->next;

    free(oldNode);
  }

  list->head = NULL;
}

int main(int argc, char const *argv[])
{
  Node *nodeC = initNode(3, NULL);
  Node *nodeB = initNode(2, nodeC);
  Node *nodeA = initNode(1, nodeB);

  printNodeValues(nodeA);

  LinkedList *linkedList = initLinkedList(nodeA);

  int linkedListSize = getLinkedListSize(linkedList);
  printf("size: %d\n", linkedListSize);

  LinkedList *sortedLinkedList = initLinkedList(NULL);
  pushSortedData(sortedLinkedList, 10);
  pushSortedData(sortedLinkedList, 40);
  pushSortedData(sortedLinkedList, 30);
  pushSortedData(sortedLinkedList, 20);
  pushSortedData(sortedLinkedList, 50);
  Node *data = pushSortedData(sortedLinkedList, 5);
  pushSortedData(sortedLinkedList, 100);

  printLinkedListValues(sortedLinkedList);

  removeSortedData(sortedLinkedList, 5);
  printLinkedListValues(sortedLinkedList);

  removeSortedData(sortedLinkedList, 100);
  printLinkedListValues(sortedLinkedList);

  removeSortedData(sortedLinkedList, 30);
  printLinkedListValues(sortedLinkedList);

  emptyLinkedList(sortedLinkedList);
  printLinkedListValues(sortedLinkedList);

  return 0;
}
