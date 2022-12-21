#include <stdio.h>
#include <malloc.h>

typedef struct
{
  int weight;
  int height;
} Person;

int main(int argc, char const *argv[])
{
  int *y = (int *)malloc(sizeof(int));
  *y = 20;

  int z = sizeof(int);
  printf("*y=%i z=%i\n", *y, z);

  Person person1;
  person1.weight = 50;
  person1.height = 160;

  printf("w=%i h=%i\n", person1.weight, person1.height);

  Person *person2 = (Person *)malloc(sizeof(Person));
  person2->weight = 50;
  person2->height = 160;

  printf("w=%i h=%i\n", person2->weight, person2->height);

  return 0;
}
