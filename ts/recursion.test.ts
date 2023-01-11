import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { solveMaze, sum } from "./recursion.ts";

Deno.test("test sum 0", () => {
  assertEquals(sum(0), 0);
});

Deno.test("test sum 1", () => {
  assertEquals(sum(1), 1);
});

Deno.test("test sum 5", () => {
  assertEquals(sum(5), 15);
});

Deno.test("test sum -1", () => {
  assertEquals(sum(0), 0);
});

function plotPathFromMaze(path: string[]) {
  const char_A = 65;
  const char_Z = 90;

  const expectedPath = [];

  for (let char = char_A; char <= char_Z; char++) {
    const str = String.fromCharCode(char);

    for (let y = 0; y < path.length; y++) {
      const x = path[y].indexOf(str);

      if (x >= 0) {
        expectedPath.push({ y, x });
        break;
      }
    }
  }

  return expectedPath;
}

Deno.test("test easy maze", () => {
  const maze = [
    "#######",
    "#     #",
    "# ### #",
    "# #X# #",
    "#O#   #",
  ];

  const wall = "#";
  const end = "X";
  const start = "O";

  const path = solveMaze(maze, wall, start, end);

  const expectedPathMaze = [
    "#######",
    "#DEFHI#",
    "#C###J#",
    "#B#O#K#",
    "#A#NML#",
  ];
  const expectedPath = plotPathFromMaze(expectedPathMaze);

  assertEquals(path, expectedPath);
});

Deno.test("test complex maze", () => {
  const maze = [
    "# #   X# #####",
    "#   ######   #",
    "###          #",
    "######### ####",
    "##    ###  ###",
    "##O##      ###",
  ];

  const wall = "#";
  const end = "X";
  const start = "O";

  const path = solveMaze(maze, wall, start, end);

  const expectedPathMaze = [
    "# #WXYZ# #####",
    "#  V######   #",
    "###UTSRQPO   #",
    "#########N####",
    "##BCDE###ML###",
    "##A##FGHIJK###",
  ];
  const expectedPath = plotPathFromMaze(expectedPathMaze);

  assertEquals(path, expectedPath);
});

Deno.test("test 1 dimensional maze", () => {
  const maze = [
    "#O        X#",
  ];

  const wall = "#";
  const end = "X";
  const start = "O";

  const path = solveMaze(maze, wall, start, end);

  const expectedPathMaze = [
    "#ABCDEFGHIJ#",
  ];
  const expectedPath = plotPathFromMaze(expectedPathMaze);

  assertEquals(path, expectedPath);
});

Deno.test("test impossible maze", () => {
  const maze = [
    "#####",
    "#O#X#",
    "#####",
  ];

  const wall = "#";
  const end = "X";
  const start = "O";

  const path = solveMaze(maze, wall, start, end);

  assertEquals(path, []);
});

Deno.test("test open maze", () => {
  const maze = [
    "X    ",
    "     ",
    "     ",
    "     ",
    "O    ",
  ];

  const wall = "#";
  const end = "X";
  const start = "O";

  const path = solveMaze(maze, wall, start, end);

  const expectedPathMaze = [
    "U    ",
    "TSRQP",
    "KLMNO",
    "JIHGF",
    "ABCDE",
  ];
  const expectedPath = plotPathFromMaze(expectedPathMaze);

  assertEquals(path, expectedPath);
});
