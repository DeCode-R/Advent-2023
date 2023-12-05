import * as fs from 'fs';

const D: string = fs.readFileSync('./input.txt', 'utf-8').trim();

let p1: number = 0;
let p2: number = 0;

for (const line of D.split('\n')) {
    const p1Digits: string[] = [];
    const p2Digits: string[] = [];

    for (let i = 0; i < line.length; i++) {
        const c: string = line[i];

        if (c.match(/\d/)) {
            p1Digits.push(c);
            p2Digits.push(c);
        }

        const numberWords: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

        for (let d = 0; d < numberWords.length; d++) {
            const val: string = numberWords[d];

            if (line.startsWith(val, i)) {
                p2Digits.push((d + 1).toString());
            }
        }
    }

    p1 += parseInt(p1Digits[0] + p1Digits[p1Digits.length - 1]);
    p2 += parseInt(p2Digits[0] + p2Digits[p2Digits.length - 1]);
}

console.log(p1);
console.log(p2);
