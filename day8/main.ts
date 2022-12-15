import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

enum Direction {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

main();

function main() {
  const matrix: number[][] = lines.map((l) => l.split("").map((i) => +i));
  const directions: Direction[] = Object.values(Direction);
  let count = matrix.length * 2 + (matrix[0].length - 2) * 2;

  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      for (const dir of directions) {
        if (isVisible(matrix, [i, j], dir)) {
          count++;
          break;
        }
      }
    }
  }
  console.log(count);
}

function isVisible(
  matrix: number[][],
  tree: number[],
  dir: Direction
): boolean {
  let [i, j] = tree;

  const startTree = matrix[i][j];

  switch (dir) {
    case Direction.TOP:
      while (i > 0) {
        const nextTreeUp = matrix[(i -= 1)][j];
        if (startTree <= nextTreeUp) return false;
      }
      break;
    case Direction.BOTTOM:
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
