import { readFileSync } from "fs";
import { join } from "path";

function readInput(filename: string): { left: number[]; right: number[] } {
    const path = join(__dirname, filename);
    const data = readFileSync(path, 'utf-8');

    const left: number[] = [];
    const right: number[] = [];

    data.split("\n").forEach(line => {
        const [leftNum, rightNum] = line.trim().split("  ").map(Number);
        left.push(leftNum);
        right.push(rightNum);
    });

    return { left, right };
}

function partOne(left: number[], right: number[]): number {
    const sortedLeft = left.toSorted((a, b) => a - b);
    const sortedRight = right.toSorted((a, b) => a - b);

    let dist = 0;
    for (let i=0; i < sortedLeft.length; i++){
        dist += Math.abs(sortedLeft[i] - sortedRight[i]);
    }

    return dist;
}

function partTwo(left: number[], right: number[]): number {
    const countOccurrences = right.reduce<Record<number, number>>((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});
    
    const similarityScore = left.reduce((acc, num) => {
        const count = countOccurrences[num] ?? 0;
        return acc + (count * num);
    }, 0);
    
    return similarityScore;
}

function main(filename: string): void {
    const { left, right } = readInput(filename);
    const answerOne = partOne(left, right);
    const answerTwo = partTwo(left, right);
    console.log(answerOne);
    console.log(answerTwo);
}

main("input.txt");