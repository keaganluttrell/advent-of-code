#! /bin/bash

DAY=${1}

[[ -z $DAY ]] && echo no day arg provided && exit 1

[[ -d $DAY ]] && echo "$DAY already exits. exiting..." && exit 1

mkdir $DAY

pushd $DAY

touch input

echo 'import * as fs from "fs";

const inputFile = fs.readFileSync("input", { encoding: "utf-8" });
const lines = inputFile.split("\n");

main();

function main() {}' >main.ts

echo "$DAY template generated"
