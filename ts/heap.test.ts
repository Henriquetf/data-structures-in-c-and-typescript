import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { MinHeap } from "./heap.ts";

Deno.test("test insert increases length", () => {
  const minHeap = new MinHeap<number>();

  assertEquals(minHeap.length, 0);

  minHeap.insert(10);
  assertEquals(minHeap.length, 1);

  minHeap.insert(20);
  assertEquals(minHeap.length, 2);

  minHeap.insert(5);
  assertEquals(minHeap.length, 3);

  minHeap.insert(30);
  assertEquals(minHeap.length, 4);

  minHeap.insert(15);
  assertEquals(minHeap.length, 5);

  minHeap.insert(25);
  assertEquals(minHeap.length, 6);

  minHeap.insert(40);
  assertEquals(minHeap.length, 7);

  minHeap.insert(50);
  assertEquals(minHeap.length, 8);

  minHeap.insert(0);
  assertEquals(minHeap.length, 9);
});

Deno.test("test remove decreases length", () => {
  const minHeap = new MinHeap<number>();

  minHeap.insert(10);
  minHeap.insert(20);
  minHeap.insert(5);
  minHeap.insert(30);
  minHeap.insert(15);
  minHeap.insert(25);
  minHeap.insert(40);
  minHeap.insert(50);
  minHeap.insert(0);

  assertEquals(minHeap.length, 9);

  minHeap.remove();
  assertEquals(minHeap.length, 8);

  minHeap.remove();
  assertEquals(minHeap.length, 7);

  minHeap.remove();
  assertEquals(minHeap.length, 6);

  minHeap.remove();
  assertEquals(minHeap.length, 5);

  minHeap.remove();
  assertEquals(minHeap.length, 4);

  minHeap.remove();
  assertEquals(minHeap.length, 3);

  minHeap.remove();
  assertEquals(minHeap.length, 2);

  minHeap.remove();
  assertEquals(minHeap.length, 1);

  minHeap.remove();
  assertEquals(minHeap.length, 0);
});

Deno.test("test remove removes the lowest value", () => {
  const minHeap = new MinHeap<number>();

  minHeap.insert(10);
  minHeap.insert(20);
  minHeap.insert(5);
  minHeap.insert(30);
  minHeap.insert(15);
  minHeap.insert(25);
  minHeap.insert(40);
  minHeap.insert(50);
  minHeap.insert(0);

  assertEquals(minHeap.remove(), 0);
  assertEquals(minHeap.remove(), 5);
  assertEquals(minHeap.remove(), 10);
  assertEquals(minHeap.remove(), 15);
  assertEquals(minHeap.remove(), 20);
  assertEquals(minHeap.remove(), 25);
  assertEquals(minHeap.remove(), 30);
  assertEquals(minHeap.remove(), 40);
  assertEquals(minHeap.remove(), 50);
});

Deno.test("test remove returns null when the heap is empty and does not decrease the length", () => {
  const minHeap = new MinHeap<number>();

  assertEquals(minHeap.length, 0);
  assertEquals(minHeap.remove(), null);
  assertEquals(minHeap.length, 0);

  minHeap.insert(10);

  assertEquals(minHeap.length, 1);
  assertEquals(minHeap.remove(), 10);
  assertEquals(minHeap.length, 0);
  assertEquals(minHeap.remove(), null);
  assertEquals(minHeap.length, 0);
  assertEquals(minHeap.remove(), null);
  assertEquals(minHeap.length, 0);
});
