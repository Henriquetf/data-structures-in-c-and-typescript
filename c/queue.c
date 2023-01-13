#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

#define MAX_QUEUE_SIZE 50

typedef int Key;

typedef struct
{
  Key key;
} Record;

typedef struct
{
  Record items[MAX_QUEUE_SIZE];
  int start;
  int size;
} Queue;

Record *initRecord(Key key)
{
  Record *record = malloc(sizeof(Record));
  record->key = key;

  return record;
}

Queue *initQueue()
{
  Queue *queue = malloc(sizeof(Queue));
  queue->start = 0;
  queue->size = 0;

  return queue;
}

int getQueueSize(Queue queue)
{
  return queue.size;
}

void printQueueItems(Queue queue)
{
  printf("Queue items: ");

  for (int pos = 0; pos < queue.size; pos++)
  {
    int i = (queue.start + pos) % MAX_QUEUE_SIZE;

    printf("%i ", queue.items[i].key);
  }

  printf("\n");
}

bool enqueue(Queue *queue, Record item)
{
  if (queue->size >= MAX_QUEUE_SIZE)
  {
    return false;
  }

  int position = (queue->start + queue->size) % MAX_QUEUE_SIZE;

  queue->items[position] = item;
  queue->size += 1;

  return true;
}

bool dequeue(Queue *queue, Record *record)
{
  if (queue->size == 0)
  {
    return false;
  }

  *record = queue->items[queue->start];
  queue->start = (queue->start + 1) % MAX_QUEUE_SIZE;
  queue->size -= 1;

  return true;
}

bool emptyQueue(Queue *queue)
{
  free(queue);

  *queue = *initQueue();
}

int main(int argc, char const *argv[])
{
  Queue *queue = initQueue();

  printf("Size: %i\n", getQueueSize(*queue));
  printQueueItems(*queue);

  Record *item1 = initRecord(10);
  Record *item2 = initRecord(20);
  Record *item3 = initRecord(30);

  enqueue(queue, *item1);
  enqueue(queue, *item2);
  enqueue(queue, *item3);

  printf("Size: %i\n", getQueueSize(*queue));
  printQueueItems(*queue);

  Record popItem1;
  Record popItem2;

  dequeue(queue, &popItem1);
  printf("Popped: %i\n", popItem1.key);
  dequeue(queue, &popItem2);
  printf("Popped: %i\n", popItem2.key);

  printf("Size: %i\n", getQueueSize(*queue));
  printQueueItems(*queue);

  emptyQueue(queue);
  printQueueItems(*queue);

  return 0;
}
