import { ADDRGETNETWORKPARAMS } from "dns";
import { readFileSync } from "fs";
import { join, parse } from "path";

function readInput(filename: string): string[] {
    const path = join(__dirname, filename);
    const data = readFileSync(path, 'utf-8');
    return data.split("\n");
}

function traverseGrid(grid: string[]): string[] {
    const rows = grid.length;
    const cols = grid[0].length;
    const paths: string[] = [];

    for (const row of grid) {
        paths.push(row);
        paths.push([...row].reverse().join(''));
    }

    for (let col = 0; col < cols; col++) {
        let vertical = '';
        for (let row = 0; row < rows; row++) {
            vertical += grid[row][col];
        }
        paths.push(vertical);
        paths.push([...vertical].reverse().join(''));
    }

    for (let row = rows - 1; row >= 0; row--) {
        let diagonal = '';
        for (let r = row, c = 0; r < rows && c < cols; r++, c++) {
            diagonal += grid[r][c];
        }
        paths.push(diagonal);
        paths.push([...diagonal].reverse().join(''));
    }

    for (let col = 1; col < cols; col++) {
        let diagonal = '';
        for (let r = 0, c = col; r < rows && c < cols; r++, c++) {
            diagonal += grid[r][c];
        }
        paths.push(diagonal);
        paths.push([...diagonal].reverse().join(''));
    }

    for (let row = rows - 1; row >= 0; row--) {
        let diagonal = '';
        for (let r = row, c = cols - 1; r < rows && c >= 0; r++, c--) {
            diagonal += grid[r][c];
        }
        paths.push(diagonal);
        paths.push([...diagonal].reverse().join(''));
    }

    for (let col = cols - 2; col >= 0; col--) {
        let diagonal = '';
        for (let r = 0, c = col; r < rows && c >= 0; r++, c--) {
            diagonal += grid[r][c];
        }
        paths.push(diagonal);
        paths.push([...diagonal].reverse().join(''));
    }

    return paths;
}


function countPatterns(input: string, pattern: string): number {
    let count = 0;

    for (let i = 0; i <= input.length - pattern.length; i++) {
        const substring = input.slice(i, i + pattern.length);
        if (pattern === substring) {
            count++;
        }
    }

    return count;
}

function partOne(input: string[]): number {
    const pattern = "XMAS";
    const paths = traverseGrid(input).filter((x => x.length >= pattern.length));
    const xmasCounter = (s: string) => countPatterns(s, pattern);
    return paths.map(xmasCounter).reduce((a,b) => a+b);
}

function partTwo(input: string[]): number {
    const num_of_rows = input.length;
    const num_of_cols = input[0].length;
    function pattern_checker(i: number, j: number): boolean {
        if (!(input[i][j] === "A")) return false;
        if ((i - 1 < 0) || (j-1) < 0 || j === (num_of_cols-1) || i === (num_of_rows-1)) return false;
        const left_diagonal = input[i-1][j-1] + input[i+1][j+1];
        const right_diagonal = input[i-1][j+1] + input[i+1][j-1];
        if ((left_diagonal === "MS" || left_diagonal === "SM") && (right_diagonal === "MS" || right_diagonal === "SM")) return true;
        return false;

    }
    let res = 0
    for (let i = 0; i < num_of_rows; i++){
        for (let j = 0; j < num_of_cols; j++){
            if (pattern_checker(i,j)) res += 1;
        }
    }
    return res;
}

function main(): void{
    const input = readInput("input.txt");
    const answerOne = partOne(input);
    const answerTwo = partTwo(input);
    console.log(answerOne);
    console.log(answerTwo);
}

main();