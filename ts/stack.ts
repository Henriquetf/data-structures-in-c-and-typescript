interface StackNode<T> {
  value: T;
  next?: StackNode<T>;
}

export class Stack<T> {
  public length: number;
  private head?: StackNode<T>;
  private tail?: StackNode<T>;

  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  push(item: T): void {
    const node: StackNode<T> = {
      value: item,
      next: undefined,
    };

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;
  }

  pop(): T | undefined {
    if (!this.head) {
      return;
    }

    const head = this.head;

    this.head = head.next;
    head.next = undefined;

    this.length--;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  peekTail(): T | undefined {
    return this.tail?.value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}
