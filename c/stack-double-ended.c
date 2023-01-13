#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

#define MAX_STACK_SIZE 50
#define EMPTY_STACK_TOP_LEFT -1
#define EMPTY_STACK_TOP_RIGHT MAX_STACK_SIZE

typedef struct
{
  int key;
} Record;

typedef struct
{
  Record items[MAX_STACK_SIZE];
  int topLeft;
  int topRight;
} Stack;

Record *initRecord(int key)
{
  Record *record = malloc(sizeof(Record));
  record->key = key;

  return record;
}

Stack *initStack()
{
  Stack *stack = malloc(sizeof(Stack));
  stack->topLeft = EMPTY_STACK_TOP_LEFT;
  stack->topRight = EMPTY_STACK_TOP_RIGHT;

  return stack;
}

int getStackSize(Stack stack)
{
  return (stack.topLeft + 1) + (MAX_STACK_SIZE - stack.topRight);
}

void printStackItemsLeft(Stack stack)
{
  printf("Stack items ->: ");

  for (int i = stack.topLeft; i >= 0; i--)
  {
    printf("%i ", stack.items[i].key);
  }

  printf("\n");
}

void printStackItemsRight(Stack stack)
{
  printf("Stack items <-: ");

  for (int i = stack.topRight; i < MAX_STACK_SIZE; i++)
  {
    printf("%i ", stack.items[i].key);
  }

  printf("\n");
}

bool pushStackItemLeft(Stack *stack, Record *item)
{
  if (getStackSize(*stack) >= MAX_STACK_SIZE - 1)
  {
    return false;
  }

  stack->topLeft += 1;
  stack->items[stack->topLeft] = *item;

  return true;
}

bool pushStackItemRight(Stack *stack, Record *item)
{
  if (getStackSize(*stack) >= MAX_STACK_SIZE - 1)
  {
    return false;
  }

  stack->topRight -= 1;
  stack->items[stack->topRight] = *item;

  return true;
}

bool popStackItemLeft(Stack *stack, Record *record)
{
  if (stack->topLeft == EMPTY_STACK_TOP_LEFT)
  {
    return false;
  }

  *record = stack->items[stack->topLeft];
  stack->topLeft -= 1;

  return true;
}

bool popStackItemRight(Stack *stack, Record *record)
{
  if (stack->topRight == EMPTY_STACK_TOP_RIGHT)
  {
    return false;
  }

  *record = stack->items[stack->topRight];
  stack->topRight += 1;

  return true;
}

bool emptyStack(Stack *stack)
{
  stack->topLeft = EMPTY_STACK_TOP_LEFT;
  stack->topRight = EMPTY_STACK_TOP_RIGHT;
}

int main(int argc, char const *argv[])
{
  Stack *stack = initStack();

  printf("Size: %i\n", getStackSize(*stack));
  printStackItemsLeft(*stack);
  printStackItemsRight(*stack);

  pushStackItemLeft(stack, initRecord(10));
  pushStackItemLeft(stack, initRecord(20));
  pushStackItemLeft(stack, initRecord(30));

  pushStackItemRight(stack, initRecord(50));
  pushStackItemRight(stack, initRecord(60));
  pushStackItemRight(stack, initRecord(70));

  printf("Size: %i\n", getStackSize(*stack));
  printStackItemsLeft(*stack);
  printStackItemsRight(*stack);

  Record popItem1;
  Record popItem2;

  popStackItemLeft(stack, &popItem1);
  printf("Popped: %i\n", popItem1.key);
  popStackItemRight(stack, &popItem2);
  printf("Popped: %i\n", popItem2.key);

  printf("Size: %i\n", getStackSize(*stack));
  printStackItemsLeft(*stack);
  printStackItemsRight(*stack);

  emptyStack(stack);
  printStackItemsLeft(*stack);
  printStackItemsRight(*stack);

  return 0;
}
