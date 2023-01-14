import { Queue } from "./queue.ts";

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
