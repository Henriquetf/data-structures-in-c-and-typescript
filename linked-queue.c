#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

typedef int Key;

typedef struct Record
{
  Key key;
  struct Record *next;
} Record;

typedef struct
{
  Record *first;
  Record *last;
} Queue;

Record *initRecord(Key key)
{
  Record *record = malloc(sizeof(Record));
  record->key = key;
  record->next = NULL;

  return record;
}

Queue *initQueue()
{
  Queue *queue = malloc(sizeof(Queue));
  queue->first = NULL;
  queue->last = NULL;

  return queue;
}

int getQueueSize(Queue queue)
{
  int size = 0;
  Record *current = queue.first;

  while (current != NULL)
  {
    size++;

    current = current->next;
  }

  return size;
}

int isQueueEmpty(Queue queue)
{
  return queue.first == NULL;
}

void printQueueItems(Queue queue)
{
  printf("Queue items: ");

  Record *current = queue.first;

  while (current != NULL)
  {
    printf("%i ", current->key);

    current = current->next;
  }

  printf("\n");
}

void enqueue(Queue *queue, Record *item)
{
  if (queue->first == NULL)
  {
    queue->first = item;
  }
  else
  {
    queue->last->next = item;
  }

  queue->last = item;
  item->next = NULL;
}

bool dequeue(Queue *queue)
{
  if (queue->first == NULL)
  {
    return false;
  }

  Record *first = queue->first;
  queue->first = first->next;

  if (queue->first == NULL)
  {
    queue->last = NULL;
  }

  free(first);

  return true;
}

bool emptyQueue(Queue *queue)
{
  while (!dequeue(queue))
  {
  }

  queue->first = NULL;
  queue->last = NULL;
}

int main(int argc, char const *argv[])
{
  Queue *queue = initQueue();

  printf("Size: %i\n", getQueueSize(*queue));
  printQueueItems(*queue);

  Record *item1 = initRecord(10);
  Record *item2 = initRecord(20);
  Record *item3 = initRecord(30);

  enqueue(queue, item1);
  enqueue(queue, item2);
  enqueue(queue, item3);

  printf("Size: %i\n", getQueueSize(*queue));
  printQueueItems(*queue);

  dequeue(queue);
  dequeue(queue);

  printf("Size: %i\n", getQueueSize(*queue));
  printQueueItems(*queue);

  emptyQueue(queue);
  printQueueItems(*queue);

  return 0;
}
