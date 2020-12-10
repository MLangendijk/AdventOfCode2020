document.addEventListener('DOMContentLoaded', function () {
    const id = document.getElementById('output');
    const id1 = document.getElementById('output1');

    fetch('input.json')
        .then(r => r.json())
        .then(f => {
            let found = 0;
            let left = Math.round((f.length / 2));
            let right = left + 1;
            const find = 2020;
            let numberOne, numberTwo;

            f = f.sort((a, b) => { return a > b ? 1 : -1});

            // Part one
            while (!found) {
                let combined = f[left] + f[right];

                if (combined === find) {
                    found = true;
                    numberOne = f[left];
                    numberTwo = f[right];
                } else if (combined > find) {
                    left--;
                } else {
                    right++;
                }
            }

            id.innerHTML = `${numberOne} x ${numberTwo} = ${numberOne * numberTwo}`;

            // Part two

            left = 0;
            let middle = 1;
            right = 2;
            found = false;

            while (!found) {

                let combined = f[left] + f[middle] + f[right];

                if (combined === find) {
                    found = true;
                } else if (combined < find) {

                    right++;
                } else if (combined > find) {
                    left++;
                    middle++;
                    right = middle + 1;
                }
            }

            id1.innerHTML = `${f[left]} x ${f[middle]} x ${f[right]} = ${f[left] * f[middle] * f[right]}`;
        });
});