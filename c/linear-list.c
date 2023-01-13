#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

#define MAX_LIST_SIZE 50
// Total of records + sentinel value
#define REQUIRED_MAX_LIST_SIZE (MAX_LIST_SIZE + 1)

typedef int Key;

typedef struct
{
  Key key;
} Record;

typedef struct
{
  Record records[REQUIRED_MAX_LIST_SIZE];
  int size;
} LinearList;

void initList(LinearList *list)
{
  list->size = 0;
}

void emptyList(LinearList *list)
{
  list->size = 0;
}

/**
 * Returns the amount of records in a list
 */
int listSize(LinearList *list)
{
  return list->size;
}

bool isInvalidIndex(LinearList *list, int recordIndex)
{
  return recordIndex < 0 || recordIndex > list->size;
}

bool isListFull(LinearList *list)
{
  return list->size >= MAX_LIST_SIZE;
}

/**
 * Prints the data of all records in a list
 */
void printListItems(LinearList *list)
{
  for (int i = 0; i < list->size; i++)
  {
    printf("%i ", list->records[i].key);
  }

  printf("\n");
}

/**
 * Returns index of the record with a given key
 * Returns -1 if not found
 */
int findIndex(LinearList *list, Key key)
{
  for (int i = 0; i < list->size; i++)
  {
    if (key == list->records[i].key)
    {
      return i;
    }
  }

  return -1;
}

int findIndexSentinel(LinearList *list, Key key)
{
  list->records[list->size].key = key;

  int index = 0;
  while (list->records[index].key != key)
  {
    index++;
  }

  if (index == list->size)
  {
    return -1;
  }

  return index;
}

bool pushRecordToIndex(LinearList *list, Record record, int recordIndex)
{
  if (isInvalidIndex(list, recordIndex) || isListFull(list))
  {
    return false;
  }

  for (int i = list->size; i > recordIndex; i++)
  {
    list->records[i] = list->records[i - 1];
  }

  list->records[recordIndex] = record;
  list->size++;

  return true;
}

bool pushSortedRecord(LinearList *list, Record record)
{
  if (isListFull(list))
  {
    return false;
  }

  int index = list->size;

  while (index > 0 && list->records[index - 1].key > record.key)
  {
    list->records[index] = list->records[index - 1];
    index--;
  }

  list->records[index] = record;
  list->size++;

  return true;
}

bool removeRecordByKey(LinearList *list, Key key)
{
  int recordIndex = findIndex(list, key);

  if (recordIndex == -1)
  {
    return false;
  }

  for (int i = recordIndex; i < list->size - 1; i++)
  {
    list->records[i] = list->records[i + 1];
  }

  list->size--;

  return true;
}

bool removeSortedRecordByKey(LinearList *list, Key key)
{
  int recordIndex = binarySearchIndex(list, key);

  if (recordIndex == -1)
  {
    return false;
  }

  for (int i = recordIndex; i < list->size - 1; i++)
  {
    list->records[i] = list->records[i + 1];
  }

  list->size--;

  return true;
}

int binarySearchIndex(LinearList *list, Key key)
{
  int left = 0;
  int right = list->size - 1;
  int middle;

  while (left <= right)
  {
    middle = floor((left + right) / 2);

    int recordKey = list->records[middle].key;

    if (recordKey == key)
    {
      return middle;
    }
    else if (recordKey > key)
    {
      right = middle - 1;
    }
    else if (recordKey < key)
    {
      left = middle + 1;
    }
  }

  return -1;
}

int main(int argc, char const *argv[])
{
  LinearList list;

  initList(&list);

  // Print items
  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  // Push 1st item
  Record record1;
  record1.key = 123;
  pushRecordToIndex(&list, record1, list.size);

  // Push 2nd item
  Record record2;
  record2.key = 1234;
  pushRecordToIndex(&list, record2, list.size);

  // Print items
  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  // Find index of items
  int index1 = findIndex(&list, 123);
  int index2 = findIndex(&list, 1234);
  printf("index: %i %i\n", index1, index2);

  // Find index of items with sentinel value
  int indexSentinel1 = findIndexSentinel(&list, 123);
  int indexSentinel2 = findIndexSentinel(&list, 1234);
  int indexSentinel3 = findIndexSentinel(&list, 5);
  printf("index sentinel: %i %i %i\n", indexSentinel1, indexSentinel2, indexSentinel3);

  // Remove item
  removeRecordByKey(&list, 123);
  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  // Remove all items
  emptyList(&list);
  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  // Push sorted record items
  Record sortedRecord1;
  sortedRecord1.key = 100;
  pushSortedRecord(&list, sortedRecord1);

  Record sortedRecord2;
  sortedRecord2.key = 200;
  pushSortedRecord(&list, sortedRecord2);

  Record sortedRecord3;
  sortedRecord3.key = 80;
  pushSortedRecord(&list, sortedRecord3);

  Record sortedRecord4;
  sortedRecord4.key = 150;
  pushSortedRecord(&list, sortedRecord4);

  Record sortedRecord5;
  sortedRecord5.key = 300;
  pushSortedRecord(&list, sortedRecord5);

  Record sortedRecord6;
  sortedRecord6.key = 149;
  pushSortedRecord(&list, sortedRecord6);

  // Print items
  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  // Remove sorted item
  removeSortedRecordByKey(&list, 149);
  printListItems(&list);

  // Find index of items
  int indexSorted1 = findIndex(&list, sortedRecord1.key);
  printf("val: %i index: %i\n", sortedRecord1.key, indexSorted1);

  int indexSorted2 = findIndex(&list, sortedRecord2.key);
  printf("val: %i index: %i\n", sortedRecord2.key, indexSorted2);

  int indexSorted3 = findIndex(&list, sortedRecord3.key);
  printf("val: %i index: %i\n", sortedRecord3.key, indexSorted3);

  int indexSorted4 = findIndex(&list, sortedRecord4.key);
  printf("val: %i index: %i\n", sortedRecord4.key, indexSorted4);

  int indexSorted5 = findIndex(&list, sortedRecord5.key);
  printf("val: %i index: %i\n", sortedRecord5.key, indexSorted5);

  int indexSorted6 = findIndex(&list, sortedRecord6.key);
  printf("val: %i index: %i\n", sortedRecord6.key, indexSorted6);

  return 0;
}
