import { Queue } from "./queue.ts";

interface BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

export function compareBreadthFirstSearch<T>(
  head: BinaryNode<T>,
  headOther: BinaryNode<T>,
): boolean {
  const queue = new Queue<BinaryNode<T>>();

  queue.enqueue(headOther);
  queue.enqueue(head);

  while (!queue.isEmpty()) {
    const node = queue.dequeue()!;
    const nodeOther = queue.dequeue()!;

    if (node.value !== nodeOther.value) {
      return false;
    }

    // if both nodes have a right node, they have the same structure
    if (node.right && nodeOther.right) {
      queue.enqueue(nodeOther.right);
      queue.enqueue(node.right);
    } else if (node !== nodeOther) {
      // if one node has a right node, but the other node not, they do not have the same structure
      return false;
    }

    if (node.left && nodeOther.left) {
      queue.enqueue(nodeOther.left);
      queue.enqueue(node.left);
    } else if (node !== nodeOther) {
      return false;
    }
  }

  return true;
}
