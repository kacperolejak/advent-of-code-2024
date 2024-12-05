import { readFileSync } from "fs";
import { join, parse } from "path";

function readInput(filename: string): string {
    const path = join(__dirname, filename);
    const data = readFileSync(path, 'utf-8');
    return data;
}

function partOne(input: string): number {
    const pattern = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    let answer = 0;
    for (const match of input.matchAll(pattern)) {
        const [_, num1, num2] = match;
        const a = parseInt(num1);
        const b = parseInt(num2);
        answer += a*b;
    }
    return answer;
}


function partTwo(input: string): number {
    const mulPattern = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    const controlPattern = /(don't\(\)|do\(\))/g;

    let enabled = true;
    let answer = 0;

    const controls = [...input.matchAll(controlPattern)];
    let lastIndex = 0;

    for (const control of controls) {
        const [instruction, position] = [control[0], control.index];

        const part = input.slice(lastIndex, position);
        if (enabled) {
            for (const match of part.matchAll(mulPattern)) {
                const [_, num1, num2] = match;
                const a = parseInt(num1);
                const b = parseInt(num2);
                answer += a*b;
            }
        }

        if (instruction === "don't()") {
            enabled = false;
        } else if (instruction === "do()") {
            enabled = true;
        }

        lastIndex = position + instruction.length;
    }

    const remainingPart = input.slice(lastIndex);
    if (enabled) {
        for (const match of remainingPart.matchAll(mulPattern)) {
            const [_, num1, num2] = match;
            const a = parseInt(num1);
            const b = parseInt(num2);
            answer += a*b;
        }
    }

    return answer;
}

function main(): void{
    const input = readInput("input.txt");
    const answerOne = partOne(input);
    const answerTwo = partTwo(input);
    console.log(answerOne);
    console.log(answerTwo);
}

main();