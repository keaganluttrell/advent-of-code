import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

main();

function main() {
  let full = 0;
  let part = 0;

  for (const pair of lines) {
    const sortedPair = sortPair(splitPairs(pair));
    if (isFullyEncapsulated(sortedPair)) full++;
    if (doesOverLap(sortedPair)) part++;
  }
  console.log("full:", full);
  console.log("part:", part);
}

function splitPairs(pair): number[] {
  return pair.split(",").map((v) => v.split("-").map((n) => Number(n)));
}

function sortPair(pair): number[][] {
  const [a, b] = pair;
  if ((a[0] === b[0] && a[1] >= b[1]) || a[0] < b[0]) {
    return pair;
  }
  return [b, a];
}
function isFullyEncapsulated(sortedPair): boolean {
  const [a, b] = sortedPair;
  return a[1] >= b[1];
}

function doesOverLap(sortedPair): boolean {
  const [a, b] = sortedPair;
  return b[0] <= a[1];
}
