import { readFileSync } from "fs";
import { join} from "path";

function readInput(filename: string): string[][] {
    const path = join(__dirname, filename);
    const data = readFileSync(path, 'utf-8').split("\n");
    return data.map((x) => Array.from(x));
}

function findGuard(grid: string[][]): number[]{
    for (let i=0; i < grid.length; i++){
        for (let j=0; j < grid[0].length; j++){
            if (grid[i][j] === "^") return [i, j];
        }
    }
    return [-1,-1]; 
}

function prettyPrintGrid(grid: string[][]): void {
    for (const row of grid) {
        console.log(row.join(' '));
    }
}
function partOne(grid: string[][]): number{
    function outOfGrid(x: number, y: number) {
        return (x < 0 || y < 0 || x === grid.length || y === grid[0].length);
    }
    const OBSTACLE = "#";
    const VISITED = "X";
    const DIRECTIONS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    let [i, j] = findGuard(grid);
    let currentDirection = 0;
    while(true) {
        grid[i][j] = VISITED;
        const [x, y] = DIRECTIONS[currentDirection];
        if (outOfGrid(i+x, j+y)){
            console.log(i,j);
            break;
        } 

        if (grid[i+x][j+y] === OBSTACLE){
            currentDirection = (currentDirection + 1) % 4;
        } else {
            i += x;
            j += y;
        }
    }    
    return grid.map((xs) => xs.filter((x) => x === VISITED).length).reduce((acc, x) => acc + x, 0);
}

console.log(partOne(readInput("input.txt")));