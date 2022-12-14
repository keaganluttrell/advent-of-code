import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

main();

function main() {
  const commands = parseCommands(lines);
  const stacks = parseStacks(lines);
  console.log(stacks);
  for (const cmd of commands) {
    const [amt, src, dst] = cmd
      .split(" ")
      .filter((_, i) => i % 2 === 1)
      .map((v) => Number(v));

    move2(stacks, amt, src - 1, dst - 1);
  }

  console.log(getTopOfStacks(stacks));
}

function getTopOfStacks(stacks: string[][]): string {
  let string = "";
  for (const stack of stacks) {
    string += stack.pop();
  }
  return string;
}

function move(stacks: string[][], amount: number, src: number, dst: number) {
  if (amount === 0) return;

  const container = stacks[src].pop() as string;
  stacks[dst].push(container);

  move(stacks, amount - 1, src, dst);
}

function move2(stacks: string[][], amount: number, src: number, dst: number) {
  const stackToMove = stacks[src].slice(stacks[src].length - amount);
  stacks[src] = stacks[src].slice(0, stacks[src].length - amount);
  stacks[dst] = [...stacks[dst], ...stackToMove];
}

function parseStacks(lines: string[]): string[][] {
  const arr: string[][] = [];

  const startIndex = getStartIndex(lines);
  for (let i = startIndex; i >= 0; i--) {
    const line = lines[i];
    for (let j = 1, index = 0; j < line.length; j += 4, index++) {
      let char = line[j];
      if (Array.isArray(arr[index]) && char != " ") {
        arr[index].push(char);
      } else if (char != " ") {
        arr[index] = [char];
      }
    }
  }
  return arr;
}

function getStartIndex(lines: string[]): number {
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith("[")) {
      return i - 1;
    }
  }
  return 0;
}

function parseCommands(lines: string[]): string[] {
  let arr: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("move")) {
      arr = lines.slice(i);
      break;
    }
  }
  return arr;
}
