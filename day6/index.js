import fs from 'fs';

fs.readFile('input.txt', 'utf8', (e, r) => {

    const data = r.replace(/\n\r/g, "\n")
        .split('\n\n'); // FU Windows

    let p1 = 0;

    // Part 1
    data.forEach(l => p1 += new Set(l.trim().replace(/\r\n/g, '')).size); // FU Windows

    let p2 = 0;

    data.forEach(l => {
        let answers = [...new Set(l.trim().replace(/\r\n/g, ''))]; // FU Windows
        const line = l.trim().split('\r\n');

        answers.forEach(a => line.every((f) => f.includes(a)) && p2++);
    });

    console.log(p1, p2);

});