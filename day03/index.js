import fs from 'fs';

class Puzzle {

    constructor (data) {
        this.formatData(data)
    }

    formatData (data) {
        this.data = data.split('\r\n');
    }

    solve (directions) {
        const data = this.data,
            length = data.length,
            maxLinePos = data[0].length - 1,
            tree = '#';

        const {
            right, down
        } = directions;

        let pos = 0, counter = 0;

        for (let i = down; i < length; i+=down) {

            let line = data[i];
            if (line) {
                if (pos + right > maxLinePos) {
                    pos = (pos + right) - maxLinePos - 1; // 0 index based.
                } else {
                    pos += right;
                }

                if (line.charAt(pos) === tree) {
                    counter++;
                }
            }
        }

        return counter;
    }

    solveAll (directions) {
        let i = 1;

        directions.forEach(r => i = i * this.solve(r));
    }
}

fs.readFile('input.txt', 'utf8', (e, r) => {
    const directions = [{right: 1, down: 1}, {right:3, down: 1}, {right: 5, down: 1}, {right: 7, down: 1}, {right: 1, down:2}];

    new Puzzle(r).solveAll(directions);
});