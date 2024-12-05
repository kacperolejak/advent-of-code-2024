import { readFileSync } from "fs";
import { join } from "path";

function readInput(filename: string): number[][] {
    const path = join(__dirname, filename);
    const data = readFileSync(path, 'utf-8');
    const lines = data.split("\n");
    return lines.map((line => line.split(" ").map(Number)));
}

function isCorrectDistance(a: number, b: number): boolean{
    const MAX_DIST = 3;
    const MIN_DIST = 1;
    const dist = Math.abs(a-b);
    return dist <= MAX_DIST && dist >= MIN_DIST;
}

function isSafe(level: number[]): boolean {
    const increasingOrdering = level[0] < level[1];
    for (let i = 0; i < level.length - 1; i++){

        if (increasingOrdering) {
            if (level[i] > level[i+1]) return false;
        } else if (level[i] < level[i+1]){
            return false;
        }

        if (!isCorrectDistance(level[i], level[i+1])){
            return false;
        }
        
        
    }
    return true;
}

function partOne(levels: number[][]): number {
    return levels.filter(isSafe).length;
}

function partTwo(levels: number[][]): number {
    let counter = 0
    for (const level of levels) {
        if (isSafe(level)){ 
            counter++;
        }
        else {
            for (let i = 0; i < level.length; i++){

                const candidate = level.filter((_: any, index: number) => index !== i);
                if(isSafe(candidate)){
                    counter++;
                    break;
                }
            }
        } 
    }
    return counter;
}

function main(): void {
    const input = readInput("input.txt");
    const answerOne = partOne(input);
    const answerTwo = partTwo(input);
    console.log(answerOne);
    console.log(answerTwo);
}

main()