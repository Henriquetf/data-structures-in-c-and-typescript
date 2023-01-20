interface Node<V> {
  value: V;
  next?: Node<V>;
  prev?: Node<V>;
}

class Cache<K, V> {
  private lookup: Map<K, V>;
  private reverseLookup: Map<V, K>;

  constructor() {
    this.lookup = new Map<K, V>();
    this.reverseLookup = new Map<V, K>();
  }

  get(key: K): V | undefined {
    return this.lookup.get(key);
  }

  set(key: K, value: V): void {
    this.lookup.set(key, value);
    this.reverseLookup.set(value, key);
  }

  deleteByValue(value: V): void {
    const lruKey = this.reverseLookup.get(value);

    if (!lruKey) {
      throw new Error("Could not find LRU key by node");
    }

    this.reverseLookup.delete(value);
    this.lookup.delete(lruKey);
  }
}

class DoublyLinkedList<V> {
  public length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  prepend(item: V): Node<V> {
    this.setHead({
      value: item,
    });

    this.length++;

    return this.head!;
  }

  pop(): Node<V> | undefined {
    const node = this.tail;

    if (node) {
      this.detachNode(node);

      this.length--;

      return node;
    }

    return undefined;
  }

  moveToHead(node: Node<V>) {
    if (this.head === node) {
      return;
    }

    this.detachNode(node);
    this.setHead(node);
  }

  private setHead(node: Node<V>) {
    if (this.head) {
      this.head.prev = node;
    }
    if (!this.tail) {
      this.tail = node;
    }

    node.next = this.head;
    this.head = node;
  }

  private detachNode(node: Node<V>): void {
    if (node === this.head && node === this.tail) {
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
  }
}

export class LRU<K, V> {
  private capacity: number;
  private cache: Cache<K, Node<V>>;
  private list: DoublyLinkedList<V>;

  constructor(capacity: number = 10) {
    if (capacity <= 0) {
      throw new Error("capacity must be at least 1");
    }

    this.capacity = capacity;
    this.cache = new Cache<K, Node<V>>();
    this.list = new DoublyLinkedList<V>();
  }

  set(key: K, value: V): void {
    const node = this.cache.get(key);

    if (node === undefined) {
      this.create(key, value);
    } else {
      this.update(node, value);
    }
  }

  get(key: K): V | undefined {
    const node = this.cache.get(key);

    if (!node) {
      return undefined;
    }

    this.list.moveToHead(node);

    return node.value;
  }

  private create(key: K, value: V) {
    this.removeLru();

    const node = this.list.prepend(value);
    this.cache.set(key, node);
  }

  private update(node: Node<V>, value: V) {
    this.list.moveToHead(node);
    node.value = value;
  }

  private removeLru() {
    if (this.list.length < this.capacity) {
      return;
    }

    const lruNode = this.list.pop();

    if (lruNode) {
      this.cache.deleteByValue(lruNode);
    }
  }
}
