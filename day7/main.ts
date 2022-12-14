import * as fs from "fs";
import { FileNode, DirNode, FS } from "./node";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

main();

function main() {
  let myFS: FS = new FS("/");
  for (const line of lines) {
    const args = line.split(" ");
    if (args[0] === "$") {
      runCommand(myFS, args[1], args[2]);
    } else if (args[0] === "dir") {
      myFS.mkdir(args[1]);
    } else {
      myFS.touch(args[1], Number(args[0]));
    }
  }
  console.log(myFS.findSmallestDirectoryGreaterThanTargetSize());
}

function runCommand(myFS: FS, cmd: string, arg: string): void {
  switch (cmd) {
    case "cd":
      myFS.cd(arg);
      break;
    case "ls":
      myFS.ls();
      break;
  }
}
