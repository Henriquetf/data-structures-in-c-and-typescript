#include <stdio.h>
#include <stdbool.h>
#include <malloc.h>

#define LEFT_NODE 0
#define RIGHT_NODE 1

typedef struct Node
{
  int key;
  int data;

  struct Node *left;
  struct Node *right;
} Node;

typedef struct BinaryTree
{
  struct Node *root;
} BinaryTree;

Node *initNode(int key, int data)
{
  Node *node = malloc(sizeof(Node));
  node->key = key;
  node->data = data;
  node->left = NULL;
  node->right = NULL;

  return node;
}

BinaryTree *initBinaryTree()
{
  BinaryTree *binaryTree = malloc(sizeof(BinaryTree));
  binaryTree->root = NULL;

  return binaryTree;
}

Node *insertNode(Node *root, Node *node)
{
  if (root == NULL)
  {
    return node;
  }

  if (node->key == root->key)
  {
    node->left = root->left;
    node->right = root->right;

    root = node;
  }

  if (node->key < root->key)
  {
    root->left = insertNode(root->left, node);
  }

  if (node->key > root->key)
  {
    root->right = insertNode(root->right, node);
  }

  return root;
}

void insertNodeIntoBinaryTree(BinaryTree *binaryTree, Node *node)
{
  binaryTree->root = insertNode(binaryTree->root, node);
}

Node *findNode(Node *root, int key)
{
  if (root == NULL)
  {
    return NULL;
  }

  if (root->key == key)
  {
    return root;
  }

  if (key < root->key)
  {
    return findNode(root->left, key);
  }

  return findNode(root->right, key);
}

Node *findNodeInBinaryTree(BinaryTree *binaryTree, int key)
{
  return findNode(binaryTree->root, key);
}

Node *findNodeWithParent(Node *rootNode, int key, Node **parentNode)
{
  Node *currentNode = rootNode;

  *parentNode = NULL;

  while (currentNode != NULL)
  {
    if (currentNode->key == key)
    {
      return currentNode;
    }

    *parentNode = currentNode;

    if (key < currentNode->key)
    {
      currentNode = currentNode->left;
    }
    else
    {
      currentNode = currentNode->right;
    }
  }

  *parentNode = NULL;

  return NULL;
}

int countNodes(Node *node)
{
  if (node == NULL)
  {
    // root node does not exist, thus return 0 nodes as a nonexistent node can't have right and left nodes
    return 0;
  }

  // left node (1 if exists, 0 if not) + root node (current node) + right node
  return countNodes(node->left) + 1 + countNodes(node->right);
}

int getBinaryTreeSize(BinaryTree *binaryTree)
{
  return countNodes(binaryTree->root);
}

int getBinaryTreeEmpty(BinaryTree *binaryTree)
{
  return binaryTree->root == NULL;
}

void printNodeItems(Node *node, int level)
{
  if (node == NULL)
  {
    return;
  }

  printNodeItems(node->right, level + 1);

  for (int i = 0; i < level; i++)
  {
    printf("    ");
  }

  printf("-> %d\n", node->key);

  printNodeItems(node->left, level + 1);
}

void printBinaryTreeItems(BinaryTree *binaryTree)
{
  printNodeItems(binaryTree->root, 0);
  printf("\n");
}

Node *removeNodeByKey(Node *rootNode, int key)
{
  Node *parentNode = NULL;
  Node *node = findNodeWithParent(rootNode, key, &parentNode);
  Node *replacementNode = NULL;
  Node *replacementParent = NULL;

  if (node == NULL)
  {
    return rootNode;
  }

  if (node->left == NULL || node->right == NULL)
  {
    if (node->left == NULL)
    {
      replacementNode = node->right;
    }
    else
    {
      replacementNode = node->left;
    }
  }
  else
  {
    replacementParent = node;
    replacementNode = node->left;

    while (replacementNode->right != NULL)
    {
      replacementParent = replacementNode;
      replacementNode = replacementNode->right;
    }

    if (replacementParent != node)
    {
      replacementParent->right = replacementNode->left;
      replacementNode->left = node->left;
    }

    replacementNode->right = node->right;
  }

  if (parentNode == NULL)
  {
    free(node);
    return replacementNode;
  }

  if (key < parentNode->key)
  {
    parentNode->left = replacementNode;
  }
  else
  {
    parentNode->right = replacementNode;
  }

  free(node);

  return rootNode;
}

void removeNodeByKeyInBinaryTree(BinaryTree *binaryTree, int key)
{
  binaryTree->root = removeNodeByKey(binaryTree->root, key);
}

void deleteChildNodes(Node *node)
{
  if (node == NULL)
  {
    return;
  }

  deleteChildNodes(node->left);
  deleteChildNodes(node->right);

  free(node);
}

void emptyBinaryTree(BinaryTree *binaryTree)
{
  deleteChildNodes(binaryTree->root);
  binaryTree->root = NULL;
}

void binaryTree1()
{
  BinaryTree *binaryTree = initBinaryTree();

  insertNodeIntoBinaryTree(binaryTree, initNode(5, 1));
  insertNodeIntoBinaryTree(binaryTree, initNode(3, 2));
  insertNodeIntoBinaryTree(binaryTree, initNode(7, 3));
  insertNodeIntoBinaryTree(binaryTree, initNode(4, 4));
  insertNodeIntoBinaryTree(binaryTree, initNode(10, 5));
  insertNodeIntoBinaryTree(binaryTree, initNode(3, 5));
  insertNodeIntoBinaryTree(binaryTree, initNode(20, 6));

  Node *node5 = findNodeInBinaryTree(binaryTree, 5);
  Node *node3 = findNodeInBinaryTree(binaryTree, 3);
  Node *node7 = findNodeInBinaryTree(binaryTree, 7);
  Node *node4 = findNodeInBinaryTree(binaryTree, 4);
  Node *node10 = findNodeInBinaryTree(binaryTree, 10);

  printf("Size: %i\n", getBinaryTreeSize(binaryTree));
  printBinaryTreeItems(binaryTree);

  removeNodeByKeyInBinaryTree(binaryTree, 5);
  printBinaryTreeItems(binaryTree);

  removeNodeByKeyInBinaryTree(binaryTree, 10);
  printBinaryTreeItems(binaryTree);

  removeNodeByKeyInBinaryTree(binaryTree, 20);
  printBinaryTreeItems(binaryTree);

  emptyBinaryTree(binaryTree);
  printBinaryTreeItems(binaryTree);
}

void binaryTree2()
{
  BinaryTree *binaryTree = initBinaryTree();

  insertNodeIntoBinaryTree(binaryTree, initNode(18, 18));
  insertNodeIntoBinaryTree(binaryTree, initNode(8, 8));
  insertNodeIntoBinaryTree(binaryTree, initNode(2, 2));
  insertNodeIntoBinaryTree(binaryTree, initNode(14, 14));
  insertNodeIntoBinaryTree(binaryTree, initNode(16, 16));
  insertNodeIntoBinaryTree(binaryTree, initNode(10, 10));
  insertNodeIntoBinaryTree(binaryTree, initNode(9, 9));
  insertNodeIntoBinaryTree(binaryTree, initNode(12, 12));
  insertNodeIntoBinaryTree(binaryTree, initNode(11, 11));

  printBinaryTreeItems(binaryTree);

  // removeNodeByKeyInBinaryTree(binaryTree, 14);
  // printBinaryTreeItems(binaryTree);

  removeNodeByKeyInBinaryTree(binaryTree, 12);
  printBinaryTreeItems(binaryTree);
}

int main(int argc, char const *argv[])
{
  binaryTree1();
  binaryTree2();

  return 0;
}
