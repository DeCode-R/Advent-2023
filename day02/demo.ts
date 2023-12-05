import * as fs from 'fs';
const fileContent = fs.readFileSync('./input.txt', 'utf-8');

type CubeCount = { red: number; green: number; blue: number };
type GameRecord = { id: number; subsets: CubeCount[] };

function isPossibleGame(record: GameRecord[], targetCount: CubeCount): number[] {
  const possibleGames: number[] = [];

  for (const game of record) {
    let remainingCubes: CubeCount = { ...targetCount };

    for (const subset of game.subsets) {
      remainingCubes.red -= subset.red;
      remainingCubes.green -= subset.green;
      remainingCubes.blue -= subset.blue;

      if (
        remainingCubes.red < 0 ||
        remainingCubes.green < 0 ||
        remainingCubes.blue < 0
      ) {
        break; 
      }
    }

    if (
      remainingCubes.red >= 0 &&
      remainingCubes.green >= 0 &&
      remainingCubes.blue >= 0
    ) {
      possibleGames.push(game.id);
    }
  }

  return possibleGames;
}

function processFile(filename: string, targetCubeCount: CubeCount): number {

  const games: GameRecord[] = fileContent
    .split('\n')
    .filter(line => line.trim() !== '')
    .map((line, index) => {
      const subsets = line.split(';').map(subset => {
        const cubeCounts = subset.trim().split(',').map(item => parseInt(item.trim()));
        return { red: cubeCounts[2] || 0, green: cubeCounts[1] || 0, blue: cubeCounts[0] || 0 };
      });
      return { id: index + 1, subsets };
    });

  const result = isPossibleGame(games, targetCubeCount);

  console.log(`For ${filename}, Possible games:`, result);
  console.log(`For ${filename}, Sum of IDs:`, result.reduce((sum, id) => sum + id, 0));

  return result.reduce((sum, id) => sum + id, 0);
}

const targetCubeCount: CubeCount = { red: 12, green: 13, blue: 14 };
const filename: string = 'input.txt'; 
const totalSum = processFile(filename, targetCubeCount);