import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { Stack } from "./stack.ts";

Deno.test("test push increases length", () => {
  const queue = new Stack<number>();

  assertEquals(queue.length, 0);

  queue.push(1);
  assertEquals(queue.length, 1);

  queue.push(3);
  assertEquals(queue.length, 2);

  queue.push(9);
  assertEquals(queue.length, 3);
});

Deno.test("test peek returns last inserted value", () => {
  const stack = new Stack<number>();

  assertEquals(stack.peek(), undefined);

  stack.push(1);
  assertEquals(stack.peek(), 1);
});

Deno.test("test peek does not affect length", () => {
  const stack = new Stack<number>();

  assertEquals(stack.length, 0);
  stack.peek();
  assertEquals(stack.length, 0);

  stack.push(1);
  stack.peek();
  assertEquals(stack.length, 1);
});

Deno.test("test peek with multiple items returns last inserted value", () => {
  const stack = new Stack<number>();

  assertEquals(stack.peek(), undefined);

  stack.push(1);
  stack.push(2);
  stack.push(3);

  assertEquals(stack.peek(), 3);
});

Deno.test("test pop decreases length", () => {
  const stack = new Stack<number>();

  stack.push(1);
  stack.push(2);
  stack.push(3);

  assertEquals(stack.length, 3);

  stack.pop();
  assertEquals(stack.length, 2);

  stack.pop();
  assertEquals(stack.length, 1);

  stack.pop();
  assertEquals(stack.length, 0);
});

Deno.test("test pop will not decreases length below zero", () => {
  const stack = new Stack<number>();

  stack.push(1);

  stack.pop();
  assertEquals(stack.length, 0);

  stack.pop();
  assertEquals(stack.length, 0);

  stack.pop();
  assertEquals(stack.length, 0);
});

Deno.test("test pop returns inserted values in insertion order", () => {
  const stack = new Stack<number>();

  stack.push(1);
  stack.push(2);
  stack.push(3);

  assertEquals(stack.pop(), 3);
  assertEquals(stack.pop(), 2);
  assertEquals(stack.pop(), 1);
  assertEquals(stack.pop(), undefined);
});

Deno.test("test push pop", () => {
  const stack = new Stack<number>();

  stack.push(1);
  assertEquals(stack.pop(), 1);

  stack.push(1); // 1<-
  stack.push(2); // 1<-2<-
  stack.pop(); /// 1<-
  stack.push(3); // 1->3->
  assertEquals(stack.pop(), 3);
  assertEquals(stack.pop(), 1);
  assertEquals(stack.pop(), undefined);
});

Deno.test("test peekTail returns first inserted value", () => {
  const stack = new Stack<number>();

  assertEquals(stack.peekTail(), undefined);

  stack.push(10);
  assertEquals(stack.peekTail(), 10);

  stack.push(20);
  assertEquals(stack.peekTail(), 10);

  stack.pop();
  assertEquals(stack.peekTail(), 10);

  stack.pop();
  assertEquals(stack.peekTail(), undefined);
});

Deno.test("test peekTail does not affect length", () => {
  const stack = new Stack<number>();

  stack.peekTail();
  assertEquals(stack.length, 0);

  stack.push(1);
  stack.peekTail();
  assertEquals(stack.length, 1);

  stack.push(10);
  stack.peekTail();
  assertEquals(stack.length, 2);

  stack.push(20);
  stack.peekTail();
  stack.peekTail();
  assertEquals(stack.length, 3);
});
