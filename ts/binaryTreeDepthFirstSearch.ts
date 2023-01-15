interface BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

function search<T>(curr: BinaryNode<T> | undefined, needle: number): boolean {
  if (!curr) {
    return false;
  }

  if (curr.value === needle) {
    return true;
  }

  if (curr.value < needle) {
    return search(curr.right, needle);
  }

  return search(curr.left, needle);
}

export function depthFirstSearch<T>(head: BinaryNode<T>, needle: number) {
  return search(head, needle);
}
