import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { Queue } from "./queue.ts";

Deno.test("test enqueue increases length", () => {
  const queue = new Queue<number>();

  assertEquals(queue.length, 0);

  queue.enqueue(1);
  assertEquals(queue.length, 1);

  queue.enqueue(3);
  assertEquals(queue.length, 2);

  queue.enqueue(9);
  assertEquals(queue.length, 3);
});

Deno.test("test peek returns first inserted value", () => {
  const queue = new Queue<number>();

  assertEquals(queue.peek(), undefined);

  queue.enqueue(1);
  assertEquals(queue.peek(), 1);
  assertEquals(queue.peek(), 1);
});

Deno.test("test peek does not affect length", () => {
  const queue = new Queue<number>();

  assertEquals(queue.length, 0);
  queue.peek();
  assertEquals(queue.length, 0);

  queue.enqueue(1);
  assertEquals(queue.peek(), 1);
  queue.peek();
  assertEquals(queue.peek(), 1);
});

Deno.test("test peek with multiple items returns first inserted value", () => {
  const queue = new Queue<number>();

  assertEquals(queue.peek(), undefined);

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  assertEquals(queue.peek(), 1);
});

Deno.test("test dequeue decreases length", () => {
  const queue = new Queue<number>();

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  assertEquals(queue.length, 3);

  queue.dequeue();
  assertEquals(queue.length, 2);

  queue.dequeue();
  assertEquals(queue.length, 1);

  queue.dequeue();
  assertEquals(queue.length, 0);
});

Deno.test("test dequeue returns inserted values in order", () => {
  const queue = new Queue<number>();

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  assertEquals(queue.dequeue(), 1);
  assertEquals(queue.dequeue(), 2);
  assertEquals(queue.dequeue(), 3);
  assertEquals(queue.dequeue(), undefined);
  assertEquals(queue.dequeue(), undefined);
});

Deno.test("test dequeue will not decreases length below zero", () => {
  const queue = new Queue<number>();

  queue.enqueue(1);

  queue.dequeue();
  assertEquals(queue.length, 0);

  queue.dequeue();
  assertEquals(queue.length, 0);

  queue.dequeue();
  assertEquals(queue.length, 0);
});

Deno.test("test enqueue dequeue", () => {
  const queue = new Queue<number>();

  queue.enqueue(1);
  assertEquals(queue.dequeue(), 1);

  queue.enqueue(1); // 1->
  queue.enqueue(2); // 1->2->
  queue.dequeue(); /// 2->
  queue.enqueue(3); // 2->3->
  assertEquals(queue.dequeue(), 2);
  assertEquals(queue.dequeue(), 3);
  assertEquals(queue.dequeue(), undefined);
});

Deno.test("test peekTail returns last inserted value", () => {
  const queue = new Queue<number>();

  assertEquals(queue.peekTail(), undefined);

  queue.enqueue(10);
  assertEquals(queue.peekTail(), 10);

  queue.enqueue(20);
  assertEquals(queue.peekTail(), 20);

  queue.dequeue();
  assertEquals(queue.peekTail(), 20);

  queue.dequeue();
  assertEquals(queue.peekTail(), undefined);

  queue.enqueue(30);
  queue.enqueue(40);
  assertEquals(queue.peekTail(), 40);

  queue.dequeue();
  queue.dequeue();
  assertEquals(queue.peekTail(), undefined);
});

Deno.test("test peekTail does not affect length", () => {
  const queue = new Queue<number>();

  queue.peekTail();
  assertEquals(queue.length, 0);

  queue.enqueue(1);
  queue.peekTail();
  assertEquals(queue.length, 1);

  queue.enqueue(10);
  queue.peekTail();
  assertEquals(queue.length, 2);

  queue.enqueue(20);
  queue.peekTail();
  queue.peekTail();
  assertEquals(queue.length, 3);
});
