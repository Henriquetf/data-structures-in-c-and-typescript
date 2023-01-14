interface QueueNode<T> {
  value: T;
  next?: QueueNode<T>;
}

export class Queue<T> {
  public length: number;
  private head?: QueueNode<T>;
  private tail?: QueueNode<T>;

  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const node: QueueNode<T> = {
      value: item,
      next: undefined,
    };

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  dequeue(): T | undefined {
    if (!this.head) {
      return undefined;
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
