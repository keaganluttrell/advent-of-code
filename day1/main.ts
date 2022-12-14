import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

main();

function main() {
  let maxes = [0, 0, 0];
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];
    if (item.length === 0) {
      maxes = orderMax(maxes, count);
      count = 0;
    } else {
      count += Number(item);
    }
  }

  const total = maxes.reduce((a, c) => a + c, 0);
  console.log(total);
}

function orderMax(maxes, count) {
  const [first, second, third] = maxes;

  if (count > first) {
    return [count, first, second];
  }

  if (count > second) {
    return [first, count, second];
  }

  if (count > third) {
    return [first, second, count];
  }

  return maxes;
}
