import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { insertTrie, makeNode } from "./trie.ts";

Deno.test("test creation", () => {
  const head = makeNode();

  assertEquals(head.isTerminal, false);
  assertEquals(head.children.length, 26);
  assertEquals(head.value, null);
});

Deno.test("test insertion", () => {
  const head = makeNode();

  insertTrie(head, "ABC");

  assertEquals(head.isTerminal, false);
  assertEquals(head.children.length, 26);
  assertEquals(head.value, null);

  const nodeA = head.children[0];
  assertEquals(nodeA.isTerminal, false);
  assertEquals(nodeA.value, null);

  const nodeB = nodeA.children[1];
  assertEquals(nodeB.isTerminal, false);
  assertEquals(nodeB.value, null);

  const nodeC = nodeB.children[2];
  assertEquals(nodeC.isTerminal, true);
  assertEquals(nodeC.value, "ABC");
  assertEquals(nodeC.children[0], undefined);
  assertEquals(nodeC.children[1], undefined);
  assertEquals(nodeC.children[2], undefined);
  assertEquals(nodeC.children[3], undefined);

  insertTrie(head, "ABB");

  assertEquals(nodeB.isTerminal, false);
  assertEquals(nodeB.value, null);

  const nodeBB = nodeB.children[1];
  assertEquals(nodeBB.isTerminal, true);
  assertEquals(nodeBB.value, "ABB");

  insertTrie(head, "ABCD");

  assertEquals(nodeC.isTerminal, true);
  assertEquals(nodeC.value, "ABC");

  const nodeD = nodeC.children[3];
  assertEquals(nodeD.isTerminal, true);
  assertEquals(nodeD.value, "ABCD");
});

Deno.test("test insertion with lowercase and uppercase mixed", () => {
  const head = makeNode();

  insertTrie(head, "AbC");

  assertEquals(head.isTerminal, false);
  assertEquals(head.children.length, 26);
  assertEquals(head.value, null);

  const nodeA = head.children[0];
  assertEquals(nodeA.isTerminal, false);
  assertEquals(nodeA.value, null);

  const nodeB = nodeA.children[1];
  assertEquals(nodeB.isTerminal, false);
  assertEquals(nodeB.value, null);

  const nodeC = nodeB.children[2];
  assertEquals(nodeC.isTerminal, true);
  assertEquals(nodeC.value, "AbC");
});
