import fs from 'fs';

fs.readFile('input.txt', 'utf8', (e, r) => {

    let _instructions = r.split('\r\n');

    function run(instructions) {
        let i = 0,
            visited = [],
            accumulator = 0;

        while (!visited.includes(i) && i !== instructions.length - 1) {
            visited.push(i);

            let instruction = instructions[i].split(' '),
                method = instruction[0],
                calc = parseInt(instruction[1]);

            switch (method) {
                case 'nop':
                    i++;
                    break;
                case 'jmp':
                    i += calc;
                    break;
                case 'acc':
                    accumulator += calc;
                    i++;
                    break;
            }
        }

        if (i === instructions.length - 1) {
            return accumulator;
        }

        return null;
    }

    let i = 0;
    let found = false;
    let result = null;

    while (!found) {

        let inst = [..._instructions];

        for (; i < inst.length; i++) {
            if (inst[i].includes('nop')) {
                inst[i] = inst[i].replace('nop', 'jmp');
                break;
            } else if (inst[i].includes('jmp', 'nop')) {
                inst[i] = inst[i].replace('jmp', 'nop');
                break;
            }
        }

        i++;

        result = run(inst);

        if (result) {
            found = true;
        }
    }

    console.log(result);
});