import { assertEquals, assertNotEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { DoublyLinkedList } from "./linkedList.ts";

Deno.test("test append increases length", () => {
  const linkedList = new DoublyLinkedList<number>();

  assertEquals(linkedList.length, 0);

  linkedList.append(1);
  assertEquals(linkedList.length, 1);

  linkedList.append(3);
  assertEquals(linkedList.length, 2);

  linkedList.append(9);
  assertEquals(linkedList.length, 3);
});

Deno.test("test prepend increases length", () => {
  const linkedList = new DoublyLinkedList<number>();

  assertEquals(linkedList.length, 0);

  linkedList.prepend(1);
  assertEquals(linkedList.length, 1);

  linkedList.prepend(3);
  assertEquals(linkedList.length, 2);

  linkedList.prepend(9);
  assertEquals(linkedList.length, 3);
});

Deno.test("test append adds elements to the end of the linked list", () => {
  const linkedList = new DoublyLinkedList<number>();

  assertEquals(linkedList.get(0), undefined);

  linkedList.append(1);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), undefined);

  linkedList.append(3);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), 3);
  assertEquals(linkedList.get(2), undefined);

  linkedList.append(9);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), 3);
  assertEquals(linkedList.get(2), 9);
  assertEquals(linkedList.get(3), undefined);
});

Deno.test("test prepend adds elements to the start of the linked list", () => {
  const linkedList = new DoublyLinkedList<number>();

  assertEquals(linkedList.get(0), undefined);

  linkedList.prepend(1);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), undefined);

  linkedList.prepend(3);
  assertEquals(linkedList.get(0), 3);
  assertEquals(linkedList.get(1), 1);
  assertEquals(linkedList.get(2), undefined);

  linkedList.prepend(9);
  assertEquals(linkedList.get(0), 9);
  assertEquals(linkedList.get(1), 3);
  assertEquals(linkedList.get(2), 1);
  assertEquals(linkedList.get(3), undefined);
});

Deno.test("test append sets last to the inserted element", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(1);
  assertEquals(linkedList.last(), 1);

  linkedList.append(2);
  assertEquals(linkedList.last(), 2);

  linkedList.append(3);
  assertEquals(linkedList.last(), 3);
});

Deno.test("test prepend sets first to the inserted element", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.prepend(1);
  assertEquals(linkedList.first(), 1);

  linkedList.prepend(2);
  assertEquals(linkedList.first(), 2);

  linkedList.prepend(3);
  assertEquals(linkedList.first(), 3);
});

Deno.test("test insertAt inserts element at index and shifts next elements to the right", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(10);
  linkedList.append(20);
  linkedList.append(30);

  linkedList.insertAt(100, 1);

  assertEquals(linkedList.length, 4);
  assertEquals(linkedList.get(0), 10);
  assertEquals(linkedList.get(1), 100);
  assertEquals(linkedList.get(2), 20);
  assertEquals(linkedList.get(3), 30);
});

Deno.test("test insertAt first element", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(10);
  linkedList.append(20);
  linkedList.append(30);

  linkedList.insertAt(100, 0);

  assertEquals(linkedList.length, 4);
  assertEquals(linkedList.get(0), 100);
  assertEquals(linkedList.get(1), 10);
  assertEquals(linkedList.get(2), 20);
  assertEquals(linkedList.get(3), 30);
});

Deno.test("test insertAt last element", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(10);
  linkedList.append(20);
  linkedList.append(30);

  linkedList.insertAt(100, 3);

  assertEquals(linkedList.length, 4);
  assertEquals(linkedList.get(0), 10);
  assertEquals(linkedList.get(1), 20);
  assertEquals(linkedList.get(2), 30);
  assertEquals(linkedList.get(3), 100);
});

Deno.test("test first is undefined when the list becomes empty", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(1);
  assertNotEquals(linkedList.first(), undefined);

  linkedList.removeAt(0);
  assertEquals(linkedList.first(), undefined);
});

Deno.test("test last is undefined when the list becomes empty", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(1);
  assertNotEquals(linkedList.first(), undefined);

  linkedList.removeAt(0);
  assertEquals(linkedList.first(), undefined);
});

Deno.test("test removeAt", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);

  linkedList.removeAt(1);
  assertEquals(linkedList.length, 2);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), 3);
  assertEquals(linkedList.get(2), undefined);
});

Deno.test("test removeAt invalid index", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);

  linkedList.removeAt(4);
  assertEquals(linkedList.length, 3);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), 2);
  assertEquals(linkedList.get(2), 3);
});

Deno.test("test remove", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);

  linkedList.remove(2);
  assertEquals(linkedList.length, 2);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), 3);
  assertEquals(linkedList.get(2), undefined);
});

Deno.test("test invalid value", () => {
  const linkedList = new DoublyLinkedList<number>();

  linkedList.append(1);
  linkedList.append(2);
  linkedList.append(3);

  linkedList.remove(4);
  assertEquals(linkedList.length, 3);
  assertEquals(linkedList.get(0), 1);
  assertEquals(linkedList.get(1), 2);
  assertEquals(linkedList.get(2), 3);
});
