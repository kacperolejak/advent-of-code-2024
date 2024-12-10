import { readFileSync } from "fs";
import { join} from "path";

type Equation = {
    value: number;
    nums: number[];
}

type Operation = (a: number, b: number) => number

function readInput(filename: string): Equation[] {
    function stringToEquation(s: string): Equation {
        const [rawValue, rawNumbers] = s.split(": ");
        return {value: Number(rawValue), nums: rawNumbers.split(" ").map(Number)}
    }
    const path = join(__dirname, filename);
    const data = readFileSync(path, 'utf-8').split("\n");
    return data.map(stringToEquation);
}

function add(a: number, b: number): number {
    return a+b;
}

function mul(a: number, b: number): number {
    return a*b;
}

function stringConcat(a: number, b: number): number {
    return Number(a.toString() + b.toString());
}

function evaluateEquation(e: Equation, ops: Operation[]): boolean {
    let results = [e.nums[0]];
    for (const num of e.nums.slice(1)){
        
        let newResults: number[] = [];
        for (const r of results){
            for (const op of ops){
                newResults.push(op(r, num));
            }
        }
        results = [...newResults];
    }
    return results.includes(e.value);
}

function solve(equations: Equation[], part1: boolean = true): number{
    const ops = part1 ? [add, mul] : [add, mul, stringConcat];
    const predicate = (a: Equation) => evaluateEquation(a, ops);
    return equations.filter(predicate).reduce((acc, x) => acc + x.value, 0);
}

function main(): void {
    const input = readInput("input.txt");
    console.log(solve(input));
    console.log(solve(input, false));
}

main();