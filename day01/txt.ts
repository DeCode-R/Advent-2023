// Import the 'fs' module to work with the file system.
import * as fs from 'fs';

// Read the content of the file named 'input.txt' synchronously and store it as a string.
const text: string = fs.readFileSync('./input.txt', 'utf-8').trim();

// Initialize variables for two different problems (p1 and p2).
// The code currently focuses on solving problem p2, so p1 is commented out.
//let p1: number = 0;
let p2: number = 0;

// Loop through each line of the text obtained from the file.
for (const line of text.split('\n')) {

    // Initialize arrays to store digits for each problem.
    // The code currently focuses on solving problem p2, so p1Digits is commented out.
    //const p1Digits: string[] = [];
    const p2Digits: string[] = [];

    // Loop through each character in the current line.
    for (let i = 0; i < line.length; i++) {
        const c: string = line[i];

        // Check if the current character is a digit and add it to the corresponding array.
        if (c.match(/\d/)) {
            //p1Digits.push(c);
            p2Digits.push(c);
        }

        // Define an array of number words (e.g., 'one', 'two', ..., 'nine').
        const numberWords: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

        // Loop through each number word and check if it matches the current position in the line.
        for (let d = 0; d < numberWords.length; d++) {
            const val: string = numberWords[d];

            // If the current position in the line starts with the number word, add its numeric equivalent to the array.
            if (line.startsWith(val, i)) {
                p2Digits.push((d + 1).toString());
            }
        }
    }

    // Calculate the sum for problem p1 by converting the first and last digits in the array to a number and adding them.
    //p1 += parseInt(p1Digits[0] + p1Digits[p1Digits.length - 1], 10);

    // Calculate the sum for problem p2 by converting the first and last digits in the array to a number and adding them.
    p2 += parseInt(p2Digits[0] + p2Digits[p2Digits.length - 1], 10);
}

// Print the result for problem p2 to the console.
//console.log(p1);
console.log(p2);
