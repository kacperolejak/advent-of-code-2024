import { readFileSync } from "fs";
import { join} from "path";

function readInput(filename: string): {rawRules: string[], updates: number[][]} {
    const path = join(__dirname, filename);
    const data = readFileSync(path, 'utf-8').split("\n");
    const separatorIndex = data.indexOf("");
    const rawRules = data.slice(0, separatorIndex);
    const updates = data.slice(separatorIndex+1).map( (i: string) => i.split(",").map(Number));
    return {rawRules, updates};
}

function parseRules(rules: string[]): Map<number, number[]>{
    const mapping = new Map<number, number[]>();
    for (const r of rules){
        const [k, v] = r.split("|").map(Number);
        if (mapping.has(k)){
            mapping.get(k)?.push(v);
        } else {
            mapping.set(k, [v]);
        }
    }
    return mapping;
}

function solve(rules: Map<number, number[]>, updates: number[][], part2: boolean = false): number{
    function compare(a: number, b: number): number {
        if (rules.has(a)){
            if (rules.get(a)?.includes(b)) return -1;
        }
        if (rules.has(b)){
            if (rules.get(b)?.includes(a)) return  1;
        }
        return 0;
    }
    
    function isCorrectUpdate(update: number[]): boolean {
        const sortedUpdate = update.toSorted(compare);
        return update.every((value, index) => value === sortedUpdate[index]);
    }
    
    function middleElement<T>(xs: T[]): T{
        return xs[Math.floor(xs.length / 2)];
    }

    if (!part2) return updates.filter(isCorrectUpdate).map(middleElement).reduce((acc, x) => acc + x, 0);

    const ans = updates.filter((x) => !isCorrectUpdate(x))
    .map((x) => x.toSorted(compare))
    .map(middleElement)
    .reduce((acc, x) => acc + x, 0);
    return ans;
}

function main(): void{
    const input = readInput("input.txt");
    console.log(solve(parseRules(input.rawRules), input.updates));
    console.log(solve(parseRules(input.rawRules), input.updates, true));
}

main();