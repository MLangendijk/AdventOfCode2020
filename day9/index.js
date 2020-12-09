import fs from 'fs';

// eXchange-Masking Addition System
class XMAS {

    findFirstFailingPreamble (o) {
        let {
            preamble,
            data
        } = o;

        let found = false;
        let find;
        let begin = 0;
        let end = preamble;
        let dataset;

        while (!found) {

            dataset = data.slice(begin, end);
            find = data.slice(end, end + 1)[0];

            let result = dataset.filter(a => dataset.includes(find - a));

            if (!result.length) {
                found = true;
            }

            begin++;
            end++;
        }

        // Part 1
        return find;
    }

    findContiguousSet (o) {
        let {
            find,
            data
        } = o;

        let lower = 0;
        let set;

        for (let i = 1; i < data.length; i++) {
            set = data.slice(lower, i);
            let count = set.reduce((a, b) => a + b, 0);

            if (count === find) {
                break;
            } else if (count > find) {
                lower++;
                i = lower + 1;
            }
        }

        return set;
    }
}

fs.readFile('input.txt', 'utf8', (e, r) => {
    const xmas = new XMAS();
    const data =  r.split('\r\n').map(x => parseInt(x));

    const result = xmas.findFirstFailingPreamble({
        preamble: 25,
        data: data
    });

    // Part 1
    console.log(result);

    const set = xmas.findContiguousSet({
        find: result,
        data: data
    }).sort((a, b) => a - b);

    // Part 2
    console.log(set, set[0] + set[set.length - 1]);

});