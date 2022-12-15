import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

class Point {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  [Direction.DOWN]() {
    this.x += 1;
  }

  [Direction.UP]() {
    this.x -= 1;
  }
  [Direction.LEFT]() {
    this.y -= 1;
  }
  [Direction.RIGHT]() {
    this.y += 1;
  }

  getXY() {
    return [this.x, this.y];
  }
}

main();

function main() {
  const matrix: number[][] = lines.map((l) => l.split("").map((i) => +i));
  const directions: Direction[] = Object.values(Direction);
  let max = 0;

  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      let score = 1;
      for (const dir of directions) {
        score *= findScore(matrix, new Point(i, j), dir);
      }
      if (score > max) {
        max = score;
      }
    }
  }
  console.log(max);
}

function isVisible(
  matrix: number[][],
  tree: number[],
  dir: Direction
): boolean {
  let [i, j] = tree;

  const startTree = matrix[i][j];

  switch (dir) {
    case Direction.UP:
      while (i > 0) {
        const nextTreeUp = matrix[(i -= 1)][j];
        if (startTree <= nextTreeUp) return false;
      }
      break;
    case Direction.DOWN:
      while (i < matrix.length - 1) {
        const nextTreeDown = matrix[(i += 1)][j];
        if (startTree <= nextTreeDown) return false;
      }
      break;
    case Direction.LEFT:
      while (j > 0) {
        const nextTreeLeft = matrix[i][(j -= 1)];
        if (startTree <= nextTreeLeft) return false;
      }
      break;
    case Direction.RIGHT:
      while (j < matrix[0].length - 1) {
        const nextTreeRight = matrix[i][(j += 1)];
        if (startTree <= nextTreeRight) return false;
      }
      break;
  }
  return true;
}

function findScore(matrix: number[][], point: Point, dir: Direction): number {
  let [i, j] = point.getXY();
  const treeStart = matrix[i][j];
  let count = 1;

  while (isWithinBoundary(matrix, i, j)) {
    point[dir]();
    const [x, y] = point.getXY();
    const nextTree = matrix[x][y];
    if (treeStart <= nextTree || isBoundaryIndex(matrix, x, y)) break;
    [i, j] = [x, y];
    count++;
  }
  return count;
}

function isWithinBoundary(matrix, i, j) {
  return i > 0 && i < matrix.length - 1 && j > 0 && j < matrix[0].length - 1;
}

function isBoundaryIndex(matrix, x, y) {
  return (
    x === 0 || y === 0 || x === matrix.length - 1 || y === matrix[y].length - 1
  );
}
