import { Queue } from "./queue.ts";
import { Stack } from "./stack.ts";

export interface BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

function walkPreOrder<T>(curr: BinaryNode<T> | undefined, path: T[]): void {
  if (!curr) {
    return;
  }

  path.push(curr.value);

  walkPreOrder(curr.left, path);
  walkPreOrder(curr.right, path);
}

export function preOrderSearch<T>(head: BinaryNode<T>): T[] {
  const order: T[] = [];

  walkPreOrder(head, order);

  return order;
}

export function preOrderSearchLoop<T>(head: BinaryNode<T>): T[] {
  const stack = new Stack<BinaryNode<T>>();
  const order: T[] = [];

  stack.push(head);

  while (!stack.isEmpty()) {
    const currentNode = stack.pop()!;

    order.push(currentNode.value);

    if (currentNode.right) {
      stack.push(currentNode.right);
    }

    if (currentNode.left) {
      stack.push(currentNode.left);
    }
  }

  return order;
}

function walkInOrder<T>(curr: BinaryNode<T> | undefined, path: T[]): void {
  if (!curr) {
    return;
  }

  walkInOrder(curr.left, path);

  path.push(curr.value);

  walkInOrder(curr.right, path);
}

export function inOrderSearch<T>(head: BinaryNode<T>): T[] {
  const order: T[] = [];

  walkInOrder(head, order);

  return order;
}

export function inOrderSearchLoop<T>(head: BinaryNode<T>): T[] {
  const stack = new Stack<BinaryNode<T>>();
  const order: T[] = [];

  let currentNode: BinaryNode<T> | undefined = head;

  while (!stack.isEmpty() || currentNode !== undefined) {
    while (currentNode !== undefined) {
      stack.push(currentNode);

      currentNode = currentNode.left;
    }

    currentNode = stack.pop()!;

    order.push(currentNode.value);
    currentNode = currentNode.right;
  }

  return order;
}

function walkPostOrder<T>(curr: BinaryNode<T> | undefined, path: T[]): void {
  if (!curr) {
    return;
  }

  walkPostOrder(curr.left, path);
  walkPostOrder(curr.right, path);

  path.push(curr.value);
}

export function postOrderSearch<T>(head: BinaryNode<T>): T[] {
  const order: T[] = [];

  walkPostOrder(head, order);

  return order;
}

export function postOrderSearchLoop<T>(head: BinaryNode<T>): T[] {
  const stack = new Stack<BinaryNode<T>>();
  const order: T[] = [];

  stack.push(head);

  while (!stack.isEmpty()) {
    const currentNode = stack.pop()!;

    order.push(currentNode.value);

    if (currentNode.left) {
      stack.push(currentNode.left);
    }

    if (currentNode.right) {
      stack.push(currentNode.right);
    }
  }

  return order.reverse();
}

export function breadthFirstSearch<T>(head: BinaryNode<T>) {
  const queue = new Queue<BinaryNode<T>>();

  queue.enqueue(head);

  const order: T[] = [];

  while (!queue.isEmpty()) {
    const currNode = queue.dequeue()!;

    order.push(currNode.value);

    if (currNode.left) {
      queue.enqueue(currNode.left);
    }

    if (currNode.right) {
      queue.enqueue(currNode.right);
    }
  }

  return order;
}
