import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

enum plays {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

const lookup: Record<string, number> = {
  A: plays.ROCK,
  B: plays.PAPER,
  C: plays.SCISSORS,
};

const outcomeLookup: Record<string, number> = {
  X: 0,
  Y: 3,
  Z: 6,
};

main();

function main() {
  let sum: number = 0;
  for (const line of lines) {
    const [elf, me]: string = line.split(" ");
    const elfPlay = lookup[elf];
    const outcome = outcomeLookup[me];
    const myPlay = findPlay(elfPlay, outcome);
    sum += outcome + myPlay;
  }
  console.log(sum);
}

function findPlay(elfPlay: plays, outcome: number): number {
  if (outcome === 3) {
    return elfPlay;
  } else if (outcome === 0) {
    if (elfPlay === plays.ROCK) {
      return plays.SCISSORS;
    } else if (elfPlay === plays.PAPER) {
      return plays.ROCK;
    } else {
      return plays.PAPER;
    }
  } else {
    if (elfPlay === plays.ROCK) {
      return plays.PAPER;
    } else if (elfPlay === plays.PAPER) {
      return plays.SCISSORS;
    } else {
      return plays.ROCK;
    }
  }
}

function findOutcome(elfPlay: plays, myPlay: plays): number {
  if (myPlay === elfPlay) {
    return 3;
  } else if (
    (myPlay === plays.ROCK && elfPlay === plays.SCISSORS) ||
    (myPlay === plays.PAPER && elfPlay === plays.ROCK) ||
    (myPlay === plays.SCISSORS && elfPlay === plays.PAPER)
  ) {
    return 6;
  } else {
    return 0;
  }
}
