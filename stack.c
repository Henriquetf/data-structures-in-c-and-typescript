#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

#define MAX_STACK_SIZE 50
#define EMPTY_STACK_TOP -1

typedef int Key;

typedef struct
{
  Key key;
} Record;

typedef struct
{
  Record items[MAX_STACK_SIZE];
  int top;
} Stack;

Record *initRecord(Key key)
{
  Record *record = malloc(sizeof(Record));
  record->key = key;

  return record;
}

Stack *initStack()
{
  Stack *stack = malloc(sizeof(Stack));
  stack->top = EMPTY_STACK_TOP;

  return stack;
}

int getStackSize(Stack stack)
{
  return stack.top + 1;
}

void printStackItems(Stack stack)
{
  printf("Stack items: ");

  for (int i = stack.top; i >= 0; i--)
  {
    printf("%i ", stack.items[i].key);
  }

  printf("\n");
}

bool pushStackItem(Stack *stack, Record item)
{
  if (stack->top >= MAX_STACK_SIZE - 1)
  {
    return false;
  }

  stack->top += 1;
  stack->items[stack->top] = item;

  return true;
}

bool popStackItem(Stack *stack, Record *record)
{
  if (stack->top == EMPTY_STACK_TOP)
  {
    return false;
  }

  *record = stack->items[stack->top];
  stack->top -= 1;

  return true;
}

bool emptyStack(Stack *stack)
{
  stack->top = EMPTY_STACK_TOP;
}

int main(int argc, char const *argv[])
{
  Stack *stack = initStack();

  printf("Size: %i\n", getStackSize(*stack));
  printStackItems(*stack);

  Record *item1 = initRecord(10);
  Record *item2 = initRecord(20);
  Record *item3 = initRecord(30);

  pushStackItem(stack, *item1);
  pushStackItem(stack, *item2);
  pushStackItem(stack, *item3);

  printf("Size: %i\n", getStackSize(*stack));
  printStackItems(*stack);

  Record popItem1;
  Record popItem2;

  popStackItem(stack, &popItem1);
  printf("Popped: %i\n", popItem1.key);
  popStackItem(stack, &popItem2);
  printf("Popped: %i\n", popItem2.key);

  printf("Size: %i\n", getStackSize(*stack));
  printStackItems(*stack);

  emptyStack(stack);
  printStackItems(*stack);

  return 0;
}
