export function sum(num: number): number {
  if (num <= 0) {
    return 0;
  }

  if (num === 1) { // 1. base case
    return 1;
  }

  // 2. recurse
  //  2.1 pre: code before recurse. console.log, num +
  // console.log("num: " + num);

  //  2.2 recurse: calls sum
  const recurseSum = sum(num - 1);
  // console.log("recurseSum: " + recurseSum);

  //  2.3 post: code after recurse
  const total = num + recurseSum;
  // console.log("total: " + total);

  return total;
}

interface Point {
  x: number;
  y: number;
}

const dir = [
  [-1, 0], // left
  [1, 0], // right
  [0, -1], // down
  [0, 1], // up
];

function walkMaze(
  maze: string[],
  wall: string,
  curr: Point,
  end: string,
  seen: boolean[][],
  path: Point[],
): boolean {
  // Out of bounds
  if (
    curr.x < 0 || curr.x >= maze[0].length ||
    curr.y < 0 || curr.y >= maze.length
  ) {
    return false;
  }

  // I'm in a wall
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  // Already been here
  if (seen[curr.y][curr.x]) {
    return false;
  }

  seen[curr.y][curr.x] = true;

  path.push(curr);

  // I've reached the end
  if (maze[curr.y][curr.x] === end) {
    return true;
  }

  for (let i = 0; i < dir.length; i++) {
    const [x, y] = dir[i];

    const newCurr: Point = {
      x: curr.x + x,
      y: curr.y + y,
    };

    const foundEnd = walkMaze(maze, wall, newCurr, end, seen, path);

    if (foundEnd) {
      return true;
    }
  }

  path.pop();

  return false;
}

export function solveMaze(
  maze: string[],
  wall: string,
  start: string,
  end: string,
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  const startPoint: Point = {
    x: -1,
    y: -1,
  };

  for (let y = 0; y < maze.length; y++) {
    seen.push(new Array(maze[0].length).fill(false));

    if (maze[y].includes(start)) {
      startPoint.y = y;
      startPoint.x = maze[y].indexOf("O");
    }
  }

  if (startPoint.x === -1) {
    throw new Error("Maze must have a starting point");
  }

  walkMaze(maze, wall, startPoint, end, seen, path);

  return path;
}

export function plotPathFromMaze(path: string[]) {
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
