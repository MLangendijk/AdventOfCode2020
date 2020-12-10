import fs from 'fs';

fs.readFile('input.txt', 'utf8', (e, r) => {

    let data = r.split('\r\n').map(x => parseInt(x)).sort((a, b) => a - b);
    let oneDiff = 1;
    let threeDiff = 1;

    data.forEach((a, i) => {

        if (i !== data.length - 1) {

            data[i + 1] - a === 1 ? oneDiff++ : threeDiff++;
        }
    });

    // Part one
    //console.log(oneDiff, threeDiff, oneDiff * threeDiff);


    data = [0, ...data, data[data.length - 1] + 3];

    let diff = [1, 2, 3];
    let count = [];

    count[data.length - 1] = 1;

    for (let i = data.length - 2; i >= 0; i--) {
        let current = data[i];
        let each = [];

        diff.forEach(a => {
            if (data[i + a] - current <= 3) {
                each.push(i + a);
                console.log(i + a, i, count[i + a]);
            }
        });

        //console.log(each, count);

        /* For each possible option, take the amount of branches already calculated for the option
        / E.g. number 4 has 3 branches spawning from it (5, 6 and 7),
        / take the amount of branches possible for 5, 6 and 7 and sum them.
        */
        count[i] = Math.max(1, each.map(a => count[a])
            .reduce((a, b) => {
            //console.log(a, b);
            return a + b
        }, 0));
    }

    // Part 2 = count[0]
    console.log(count);
});