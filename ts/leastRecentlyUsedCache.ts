interface Node<T> {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
}

class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  prepend(item: T): Node<T> {
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

    return this.head;
  }

  pop(): Node<T> | undefined {
    const node = this.tail;

    if (node) {
      this.removeNode(node);

      return node;
    }

    return undefined;
  }

  moveToHead(node: Node<T>) {
    const oldHead = this.head;

    if (oldHead === node) {
      return;
    }

    if (this.tail === node) {
      this.tail = node.prev;
    }

    this.head = node;

    if (oldHead) {
      oldHead.prev = node;
    }

    node.next = oldHead;

    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
  }

  private removeNode(node: Node<T>) {
    if (this.head === this.tail) {
      this.head = undefined;
      this.tail = undefined;
    } else if (node === this.head) {
      this.head = node.next;
    } else if (node === this.tail) {
      this.tail = node.prev;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node.prev) {
      node.prev.next = node.next;
    }

    node.next = undefined;
    node.prev = undefined;

    this.length--;
  }
}

export class LRU<K, V> {
  private capacity: number;
  private list: DoublyLinkedList<V>;
  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;

  constructor(capacity: number = 10) {
    if (capacity <= 0) {
      throw new Error("capacity must be at least 1");
    }

    this.capacity = capacity;

    this.list = new DoublyLinkedList<V>();
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  set(key: K, value: V): void {
    const node = this.lookup.get(key);

    if (node === undefined) {
      this.create(key, value);
    } else {
      this.setMru(node);
    }
  }

  get(key: K): V | undefined {
    const node = this.lookup.get(key);

    if (!node) {
      return undefined;
    }

    this.setMru(node);

    return node.value;
  }

  private create(key: K, value: V) {
    this.removeLru();

    const node = this.list.prepend(value);

    this.lookup.set(key, node);
    this.reverseLookup.set(node, key);
  }

  private setMru(node: Node<V>) {
    this.list.moveToHead(node);
  }

  private removeLru() {
    if (this.list.length < this.capacity) {
      return;
    }

    const lruNode = this.list.pop();

    if (lruNode) {
      const lruKey = this.reverseLookup.get(lruNode);

      if (!lruKey) {
        throw new Error("Could not find LRU key by node");
      }

      this.reverseLookup.delete(lruNode);
      this.lookup.delete(lruKey);
    }
  }
}
