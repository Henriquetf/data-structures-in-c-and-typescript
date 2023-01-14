import { Queue } from "./queue.ts";

interface BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

export function breadthFirstSearch<T>(head: BinaryNode<T>, needle: number) {
  const queue = new Queue<BinaryNode<T>>();

  queue.enqueue(head);

  while (!queue.isEmpty()) {
    const currNode = queue.dequeue()!;

    if (needle === currNode.value) {
      return true;
    }

    if (currNode.left) {
      queue.enqueue(currNode.left);
    }

    if (currNode.right) {
      queue.enqueue(currNode.right);
    }
  }

  return false;
}
