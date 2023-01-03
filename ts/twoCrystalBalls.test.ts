import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { twoCrystalBalls } from "./twoCrystalBalls.ts";

/**
 * @returns (ground floor + floors)
 */
function makeFloors(floors: number, breakFloor: number) {
  const arr = Array.from(Array(floors + 1));

  return arr.map((_, index) => index >= breakFloor);
}

Deno.test("two crystal balls floor 80", () => {
  const breakFloor = 80;
  const floors = makeFloors(100, breakFloor);
  const found = twoCrystalBalls(floors);

  assertEquals(found, breakFloor);
});

Deno.test("two crystal balls floor 81", () => {
  const breakFloor = 81;
  const floors = makeFloors(90, breakFloor);
  const found = twoCrystalBalls(floors);

  assertEquals(found, breakFloor);
});

Deno.test("two crystal balls floor 5", () => {
  const breakFloor = 5;
  const floors = makeFloors(21, breakFloor);
  const found = twoCrystalBalls(floors);

  assertEquals(found, breakFloor);
});

Deno.test("two crystal balls floor 0", () => {
  const breakFloor = 100;
  const floors = makeFloors(100, breakFloor);
  const found = twoCrystalBalls(floors);

  assertEquals(found, breakFloor);
});

Deno.test("two crystal balls floor 100", () => {
  const breakFloor = 100;
  const floors = makeFloors(100, breakFloor);
  const found = twoCrystalBalls(floors);

  assertEquals(found, breakFloor);
});
