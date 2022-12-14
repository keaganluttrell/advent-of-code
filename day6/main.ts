import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

main();

function main() {
  const line: string = lines[0];
  const markerLength: number = 14;
  
  for (let i = 0; i < line.length - markerLength; i++) {
    const marker = new Set<string>();
    let found = true;
    for (let c = i; c < i + markerLength; c++) {
      const char = line[c];
      if (marker.has(char)) {
        found = false;
        break;
      } else {
        marker.add(char);
      }
    }
    if (found) {
      console.log(i + markerLength);
      break;
    }
  }
}
