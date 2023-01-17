export class MinHeap<T> {
  public length: number;
  private items: T[];

  constructor() {
    this.length = 0;
    this.items = [];
  }

  insert(value: T): void {
    this.items[this.length] = value;
    this.length++;

    this.heapifyUp(this.length - 1);
  }

  remove(): T | null {
    if (this.length === 0) {
      return null;
    }

    const topValue = this.items[0];

    this.items[0] = this.items[this.length - 1];
    delete this.items[this.length - 1];
    this.length--;

    this.heapifyDown(0);

    return topValue;
  }

  private heapifyUp(index: number) {
    if (index === 0) {
      return;
    }

    const myValue = this.items[index];

    const parentIndex = this.parent(index);
    const parentValue = this.items[parentIndex];

    if (parentValue > myValue) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number) {
    // current node is the last node
    if (index >= this.length) {
      return;
    }

    const leftNodeIndex = this.left(index);
    const rightNodeIndex = this.right(index);

    // current node has no children
    if (leftNodeIndex >= this.length) {
      return;
    }

    let swapNodeIndex = leftNodeIndex;
    let swapNodeValue = this.items[leftNodeIndex];

    if (rightNodeIndex < this.length) {
      const rightNodeValue = this.items[rightNodeIndex];

      if (rightNodeValue < swapNodeValue) {
        swapNodeIndex = rightNodeIndex;
        swapNodeValue = rightNodeValue;
      }
    }

    const myValue = this.items[index];

    if (swapNodeValue < myValue) {
      this.swap(index, swapNodeIndex);
      this.heapifyDown(swapNodeIndex);
    }
  }

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private left(index: number): number {
    return (index * 2) + 1;
  }

  private right(index: number): number {
    return (index * 2) + 2;
  }

  private swap(index: number, otherIndex: number) {
    const tmp = this.items[index];

    this.items[index] = this.items[otherIndex];
    this.items[otherIndex] = tmp;
  }
}
