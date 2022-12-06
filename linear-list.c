#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

#define MAX_LIST_SIZE 50

typedef int Key;

typedef struct
{
  Key key;
} Record;

typedef struct
{
  Record records[MAX_LIST_SIZE];
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
  return recordIndex < 0
      || recordIndex > list->size;
}

bool isListFull(LinearList *list)
{
  return list->size == MAX_LIST_SIZE;
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

int main(int argc, char const *argv[])
{
  LinearList list;

  initList(&list);

  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  Record record1;
  record1.key = 123;
  pushRecordToIndex(&list, record1, list.size);

  Record record2;
  record2.key = 1234;
  pushRecordToIndex(&list, record2, list.size);

  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  int index1 = findIndex(&list, 123);
  int index2 = findIndex(&list, 1234);
  printf("index: %i %i\n", index1, index2);

  removeRecordByKey(&list, 123);
  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  emptyList(&list);
  printf("Size: %i\n", listSize(&list));
  printListItems(&list);

  return 0;
}
