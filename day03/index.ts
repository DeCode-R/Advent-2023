import * as fs from 'fs';
const fileContent: string = fs.readFileSync('./input.txt', 'utf-8').trim();
const lines: string[] = fileContent.split('\n');
const G: string[][] = lines.map(line => line.split(''));
const R: number = G.length;
const C: number = G[0].length;

let p1: number = 0;
const nums: { [key: string]: number[] } = {};

for (let r = 0; r < R; r++) {
  const gears: Set<string> = new Set();
  let n: number = 0;
  let hasPart: boolean = false;

  for (let c = 0; c <= C; c++) {
    if (c < C && /\d/.test(G[r][c])) {
      n = n * 10 + parseInt(G[r][c], 10);

      for (const rr of [-1, 0, 1]) {
        for (const cc of [-1, 0, 1]) {
          if (0 <= r + rr && r + rr < R && 0 <= c + cc && c + cc < C) {
            const ch: string = G[r + rr][c + cc];

            if (!/\d/.test(ch) && ch !== '.') {
              hasPart = true;
            }

            if (ch === '*') {
              gears.add(`${r + rr},${c + cc}`);
            }
          }
        }
      }
    } else if (n > 0) {
      for (const gear of gears) {
        if (!nums[gear]) {
          nums[gear] = [];
        }
        nums[gear].push(n);
      }

      if (hasPart) {
        p1 += n;
      }

      n = 0;
      hasPart = false;
      gears.clear();
    }
  }
}

console.log(p1);

let p2: number = 0;
for (const key in nums) {
  if (nums[key].length === 2) {
    const [v1, v2] = nums[key];
    p2 += v1 * v2;
  }
}

console.log(p2);