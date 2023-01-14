interface BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

export function compare<T>(
  head: BinaryNode<T> | undefined,
  headOther: BinaryNode<T> | undefined,
): boolean {
  if (head === undefined && headOther === undefined) {
    return true;
  }

  if (head === undefined || headOther === undefined) {
    return false;
  }

  if (head.value !== headOther.value) {
    return false;
  }

  if (!compare(head.left, headOther.left)) {
    return false;
  }

  if (!compare(head.right, headOther.right)) {
    return false;
  }

  return true;
}
