import * as fs from 'fs';

interface Result {
    game_number: number;
    green: number;
    red: number;
    blue: number;
    passed_test?: boolean;
    power?: number;
}

const file_path: string = 'input.txt';
const results_list: Result[] = [];

const fileContent: string = fs.readFileSync(file_path, 'utf-8');
const lines: string[] = fileContent.split('\n');

lines.forEach((line: string) => {
    const [game, resultsStr] = line.trim().split(':');
    const game_number: number = parseInt(game.split(' ')[1]);
    const results: string[] = resultsStr.split(';');

    results.forEach((r: string) => {
        const green_match = r.match(/(\d+)\s+green/);
        const red_match = r.match(/(\d+)\s+red/);
        const blue_match = r.match(/(\d+)\s+blue/);

        const res: Result = { game_number, green: 0, red: 0, blue: 0 };

        if (green_match) {
            res.green = parseInt(green_match[1]);
        }
        if (red_match) {
            res.red = parseInt(red_match[1]);
        }
        if (blue_match) {
            res.blue = parseInt(blue_match[1]);
        }

        results_list.push(res);
    });
});

const game: Result[] = results_list.reduce((acc: Result[], curr: Result) => {
    return [...acc, curr];
}, []);

// 12 red cubes, 13 green cubes, and 14 blue cubes
game.forEach((result: Result) => {
    result.passed_test = result.red <= 12 && result.green <= 13 && result.blue <= 14;
});

const groupByGameNumber: { [key: number]: Result[] } = game.reduce((acc: { [key: number]: Result[] }, curr: Result) => {
    const gameNumber = curr.game_number;
    if (!acc[gameNumber]) {
        acc[gameNumber] = [];
    }
    acc[gameNumber].push(curr);
    return acc;
}, {});

const df_pct: { game_number: number; passed_test: number; power: number }[] = Object.keys(groupByGameNumber).map((key: string) => {
    const gameNumber: number = parseInt(key);
    const results: Result[] = groupByGameNumber[key];
    const passed_test: number = results.every((result: Result) => result.passed_test) ? 1 : 0;
    
    const maxValues: { red: number; green: number; blue: number } = results.reduce((max, result) => {
        return {
            red: Math.max(max.red, result.red),
            green: Math.max(max.green, result.green),
            blue: Math.max(max.blue, result.blue),
        };
    }, { red: 0, green: 0, blue: 0 });

    const power: number = maxValues.red * maxValues.green * maxValues.blue;
    return { game_number: gameNumber, passed_test, power };
});

const solution: number = df_pct.filter((row) => row.passed_test === 1).reduce((sum, row) => sum + row.game_number, 0);
console.log(solution);

const pt2_solution: number = df_pct.reduce((sum, row) => sum + row.power, 0);
console.log(pt2_solution);
