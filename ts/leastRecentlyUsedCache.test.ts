import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { LRU } from "./leastRecentlyUsedCache.ts";

Deno.test("test LRU", function () {
  const lru = new LRU<string, number>(3);

  assertEquals(lru.get("cat"), undefined);
  lru.set("cat", 100);
  assertEquals(lru.get("cat"), 100);

  lru.set("dog", 200);
  assertEquals(lru.get("dog"), 200);

  lru.set("borb", 300);
  assertEquals(lru.get("borb"), 300);

  lru.set("budgie", 400);
  assertEquals(lru.get("budgie"), 400);

  assertEquals(lru.get("cat"), undefined);
  assertEquals(lru.get("dog"), 200);

  lru.set("cat", 100);
  assertEquals(lru.get("dog"), 200);
  assertEquals(lru.get("cat"), 100);

  assertEquals(lru.get("borb"), undefined);

  lru.set("cat", 200);
  assertEquals(lru.get("cat"), 200);
});
