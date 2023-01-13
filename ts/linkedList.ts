interface Node<T> {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
}

export class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  insertAt(item: T, index: number): void {
    if (index > 0 && index < this.length) {
      const node = this.getNodeAt(index);

      const newNode: Node<T> = {
        value: item,
        prev: node?.prev,
        next: node,
      };

      if (node) {
        if (node.prev) {
          node.prev.next = newNode;
        }

        node.prev = newNode;
      }

      this.length++;
    } else {
      if (index === 0) {
        this.prepend(item);
      }

      if (index === this.length) {
        this.append(item);
      }
    }
  }

  remove(item: T): T | undefined {
    const node = this.getNodeByValue(item);

    if (node) {
      return this.removeNode(node);
    }

    return undefined;
  }

  removeAt(index: number): T | undefined {
    const node = this.getNodeAt(index);

    if (node) {
      return this.removeNode(node);
    }

    return undefined;
  }

  append(item: T): void {
    const oldTail = this.tail;

    this.tail = {
      value: item,
      next: undefined,
      prev: oldTail,
    };

    if (oldTail) {
      oldTail.next = this.tail;
    }

    if (!this.head) {
      this.head = this.tail;
    }

    this.length++;
  }

  prepend(item: T): void {
    const oldHead = this.head;

    this.head = {
      value: item,
      next: oldHead,
      prev: undefined,
    };

    if (oldHead) {
      oldHead.prev = this.head;
    }

    if (!this.tail) {
      this.tail = this.head;
    }

    this.length++;
  }

  first(): T | undefined {
    return this.head?.value;
  }

  last(): T | undefined {
    return this.tail?.value;
  }

  get(index: number): T | undefined {
    const node = this.getNodeAt(index);

    return node?.value;
  }

  private removeNode(node: Node<T>): T {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (this.head === node) {
      this.head = node.next;
    }

    if (this.tail === node) {
      this.tail = node.prev;
    }

    this.length--;

    return node.value;
  }

  private getNodeAt(index: number): Node<T> | undefined {
    if (!(index >= 0 && index < this.length)) {
      return undefined;
    }

    const middle = Math.floor(this.length / 2);

    let node;

    if (index <= middle) {
      node = this.head;

      for (let i = 1; i <= index; i++) {
        node = node?.next;
      }
    } else {
      node = this.tail;

      for (let i = this.length - 1; i > index; i--) {
        node = node?.prev;
      }
    }

    return node;
  }

  private getNodeByValue(value: T): Node<T> | undefined {
    let node = this.head;

    while (node) {
      if (node.value === value) {
        return node;
      }

      node = node.next;
    }

    return undefined;
  }
}
