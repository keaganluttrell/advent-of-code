import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

class Matrix {
  private matrix: string[][];
  private depth: number;
  private width: number;
  private h: number[];
  private t: number[];
  private start: number[];
  callCount = 1;

  constructor(depth: number, width: number) {
    this.matrix = new Array(depth)
      .fill(new Array(width).fill("."))
      .map((a) => a.slice());
    this.depth = depth;
    this.width = width;
    this.start = [depth - 2, 1];
  }

  setStart() {
    const [s1, s2] = this.start;
    this.matrix[s1][s2] = "#";
    this.h = this.start;
    this.t = this.start;
    // this.print();
  }

  setH(dir: "U" | "D" | "L" | "R", times: number) {
    this.checkMatrixSize();
    if (times === 0) return;
    let [i, j] = this.h;
    switch (dir) {
      case "U":
        i -= 1;
        break;
      case "D":
        i += 1;
        break;
      case "L":
        j -= 1;
        break;
      case "R":
        j += 1;
        break;
    }
    this.h = [i, j];
    this.setT();
    this.checkT();
    // this.print(dir);
    this.setH(dir, times - 1);
  }

  setT() {
    const [hI, hJ] = this.h;
    let [i, j] = this.t;

    const diffI = hI - i;
    const diffJ = hJ - j;

    // is T within Tolerance?
    if (Math.abs(diffI) <= 1 && Math.abs(diffJ) <= 1) return;

    // move up&right
    if ((diffI === -1 && diffJ > 1) || (diffI < -1 && diffJ === 1)) {
      this.t = [i - 1, j + 1];
    }
    // move up&left
    else if ((diffI === -1 && diffJ < -1) || (diffI < -1 && diffJ === -1)) {
      this.t = [i - 1, j - 1];
    }
    // move down&right
    else if ((diffI === 1 && diffJ > 1) || (diffI > 1 && diffJ === 1)) {
      this.t = [i + 1, j + 1];
    }
    // move down&left
    else if ((diffI == 1 && diffJ < -1) || (diffI > 1 && diffJ === -1)) {
      this.t = [i + 1, j - 1];
    }
    // move right
    else if (diffJ > 1) {
      this.t = [i, j + 1];
    }
    // move up
    else if (diffI < -1) {
      this.t = [i - 1, j];
    }
    // move left
    else if (diffJ < -1) {
      this.t = [i, j - 1];
    }
    // move down
    else if (diffI > 1) {
      this.t = [i + 1, j];
    }
  }

  checkMatrixSize() {
    // add column left
    if (this.h[1] === 0) {
      this.matrix.forEach((a) => a.unshift("."));
      this.width += 1;
      this.h = [this.h[0], this.h[1] + 1];
      this.t = [this.t[0], this.t[1] + 1];
      this.start = [this.start[0], this.start[1] + 1];
    }
    // add column right
    else if (this.h[1] === this.width - 1) {
      this.matrix.forEach((a) => a.push("."));
      this.width += 1;
    }
    // add row above
    if (this.h[0] === 0) {
      const newRow = new Array(this.width).fill(".");
      this.matrix.unshift(newRow);
      this.depth += 1;
      this.h = [this.h[0] + 1, this.h[1]];
      this.t = [this.t[0] + 1, this.t[1]];
      this.start = [this.start[0] + 1, this.start[1]];
    }
    // add row below
    else if (this.h[0] === this.depth - 1) {
      const newRow = new Array(this.width).fill(".");
      this.matrix.push(newRow);
      this.depth += 1;
    }
    this.checkT();
  }

  checkT() {
    const [i, j] = this.t;
    if (this.matrix[i][j] !== "#") {
      this.matrix[i][j] = "#";
    }
  }

  print(dir: string = "S") {
    console.log(`\n---${this.callCount}--${dir}---`);
    const deepCopy = this.matrix.map((a) => a.slice());
    const [h, H] = this.h;
    const [t, T] = this.t;
    const [s, S] = this.start;
    deepCopy[t][T] = "T";
    deepCopy[h][H] = "H";
    deepCopy[s][S] = "s";

    console.log(deepCopy.map((a) => a.join(" ")).join("\n"));
    this.callCount++;
  }

  findTrail(): number {
    let count = 0;
    for (const row of this.matrix) {
      for (const marker of row) {
        if (marker === "#") count++;
      }
    }
    // this.print();
    console.log(count);
    return count;
  }
}

main();

function main() {
  const matrix = new Matrix(3, 3);
  matrix.setStart();
  for (const index in lines) {
    const line = lines[index];
    const [dir, count] = line.split(" ");
    matrix.setH(dir, count);
  }
  matrix.findTrail();
}
