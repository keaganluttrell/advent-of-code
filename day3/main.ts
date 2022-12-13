import * as fs from "fs";

part1();

function part1() {
  const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
  const rucksacks = inputFile.split("\n");
  let count = 0;
  for (const rs of rucksacks) {
    count += getPriority(findSharedChar(rs));
  }
  console.log(count);
}

function getPriority(char: string) {
  const code = char.charCodeAt(0);
  if (code > 96) {
    return code - 96;
  }
  return code - 38;
}

function findSharedChar(rs): string {
  const compartmentASet = new Set(rs.slice(0, Math.floor(rs.length / 2)));
  const compartmentB = rs.slice(Math.ceil(rs.length / 2));
  for (const char of compartmentB.split("")) {
    if (compartmentASet.has(char)) {
      return char;
    }
  }
  return "";
}

part2();

function part2() {
  const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
  const rucksacks = inputFile.split("\n");

  let count = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const ruck1 = new Set(rucksacks[i]);
    const ruck2 = rucksacks[i + 1];
    const ruck3 = rucksacks[i + 2];
    const possibleChars = new Set<string>();

    for (const char of ruck2) {
      if (ruck1.has(char)) possibleChars.add(char);
    }

    for (const char of ruck3) {
      if (possibleChars.has(char)) {
        count += getPriority(char);
        break;
      }
    }
  }

  console.log(count);
}
