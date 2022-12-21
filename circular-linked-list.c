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

Node *initNode(int data, Node *nextNode)
{
  Node *node = malloc(sizeof(Node));
  node->data = data;
  node->next = nextNode;

  return node;
}

Node *initHeadNode()
{
  Node *head = initNode(0, NULL);
  head->next = head;

  return head;
}

LinkedList *initLinkedList()
{
  LinkedList *list = malloc(sizeof(LinkedList));
  list->head = initHeadNode();

  return list;
}

int getLinkedListSize(LinkedList *list)
{
  Node *current = list->head->next;
  int size = 0;

  while (current != list->head)
  {
    current = current->next;

    size++;
  }

  return size;
}

void printLinkedListValues(LinkedList *list)
{
  Node *current = list->head->next;

  printf("values: ");

  while (current != list->head)
  {
    printf("%i ", current->data);

    current = current->next;
  }

  printf("\n");
}

Node *linearSearch(LinkedList *list, int data)
{
  Node *current = list->head->next;

  list->head->data = data;

  while (current->data != data)
  {
    current = current->next;
  }

  if (current != list->head)
  {
    return current;
  }

  return NULL;
}

Node *linearSearchWithPrevious(LinkedList *list, int data, Node **previousNode)
{
  Node *current = list->head->next;

  *previousNode = list->head;

  list->head->data = data;

  while (current->data != data)
  {
    *previousNode = current;
    current = current->next;
  }

  if (current != list->head)
  {
    return current;
  }

  return NULL;
}

Node *pushData(LinkedList *list, int data)
{
  Node *previousNode = NULL;
  Node *foundNode = linearSearchWithPrevious(list, data, &previousNode);

  if (foundNode != NULL)
  {
    return NULL;
  }

  Node *newNode = initNode(data, previousNode->next);
  previousNode->next = newNode;

  return newNode;
}

bool removeData(LinkedList *list, int data)
{
  Node *previousNode = NULL;
  Node *foundNode = linearSearchWithPrevious(list, data, &previousNode);

  if (foundNode == NULL)
  {
    return false;
  }

  previousNode->next = foundNode->next;

  free(foundNode);

  return true;
}

void emptyLinkedList(LinkedList *list)
{
  Node *node = list->head->next;

  while (node != list->head)
  {
    Node *oldNode = node;
    node = node->next;

    free(oldNode);
  }

  list->head->next = list->head;
}

int main(int argc, char const *argv[])
{
  LinkedList *linkedList = initLinkedList();

  int linkedListSize = getLinkedListSize(linkedList);
  printf("size: %d\n", linkedListSize);

  pushData(linkedList, 10);
  pushData(linkedList, 10);
  pushData(linkedList, 50);
  pushData(linkedList, 20);
  pushData(linkedList, 30);
  pushData(linkedList, 50);
  pushData(linkedList, 40);

  printLinkedListValues(linkedList);

  removeData(linkedList, 10);

  printLinkedListValues(linkedList);

  emptyLinkedList(linkedList);

  printLinkedListValues(linkedList);

  // LinkedList *sortedLinkedList = initLinkedList(NULL);
  // pushSortedData(sortedLinkedList, 10);
  // pushSortedData(sortedLinkedList, 40);
  // pushSortedData(sortedLinkedList, 30);
  // pushSortedData(sortedLinkedList, 20);
  // pushSortedData(sortedLinkedList, 50);
  // Node *data = pushSortedData(sortedLinkedList, 5);
  // pushSortedData(sortedLinkedList, 100);

  // printLinkedListValues(sortedLinkedList);

  // removeSortedData(sortedLinkedList, 5);
  // printLinkedListValues(sortedLinkedList);

  // removeSortedData(sortedLinkedList, 100);
  // printLinkedListValues(sortedLinkedList);

  // removeSortedData(sortedLinkedList, 30);
  // printLinkedListValues(sortedLinkedList);

  // emptyLinkedList(sortedLinkedList);
  // printLinkedListValues(sortedLinkedList);

  return 0;
}
