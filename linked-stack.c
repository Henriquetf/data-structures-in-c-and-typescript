#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

#define MAX_STACK_SIZE 50

typedef int Key;

typedef struct Record
{
  Key key;
  struct Record *next;
} Record;

typedef struct
{
  Record *top;
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
  stack->top = NULL;

  return stack;
}

int getStackSize(Stack stack)
{
  int size = 0;
  Record *current = stack.top;

  while (current != NULL)
  {
    size++;

    current = current->next;
  }

  return size;
}

int isStackEmpty(Stack stack)
{
  return stack.top == NULL;
}

void printStackItems(Stack stack)
{
  printf("Stack items: ");

  Record *current = stack.top;

  while (current != NULL)
  {
    printf("%i ", current->key);

    current = current->next;
  }

  printf("\n");
}

void pushStackItem(Stack *stack, Record *item)
{
  item->next = stack->top;
  stack->top = item;
}

bool popStackItem(Stack *stack)
{
  if (stack->top == NULL)
  {
    return false;
  }

  Record *top = stack->top;
  stack->top = top->next;

  free(top);

  return true;
}

bool emptyStack(Stack *stack)
{
  while (!popStackItem(stack))
  {
  }

  stack->top = NULL;
}

int main(int argc, char const *argv[])
{
  Stack *stack = initStack();

  printf("Size: %i\n", getStackSize(*stack));
  printStackItems(*stack);

  Record *item1 = initRecord(10);
  Record *item2 = initRecord(20);
  Record *item3 = initRecord(30);

  pushStackItem(stack, item1);
  pushStackItem(stack, item2);
  pushStackItem(stack, item3);

  printf("Size: %i\n", getStackSize(*stack));
  printStackItems(*stack);

  popStackItem(stack);
  popStackItem(stack);

  printf("Size: %i\n", getStackSize(*stack));
  printStackItems(*stack);

  emptyStack(stack);
  printStackItems(*stack);

  return 0;
}
