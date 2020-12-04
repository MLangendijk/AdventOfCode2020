import fs from 'fs';

class Passport {

    constructor (data) {
        this._data = data;
    }

    isValid () {
        // part 1 const valid = this._data.match(/^(?=.*ecl:[a-z0-9#])(?=.*pid:[a-z0-9#])(?=.*eyr:[a-z0-9#])(?=.*hcl:[a-z0-9#])(?=.*byr:[a-z0-9#])(?=.*iyr:[a-z0-9#])(?=.*hgt:[a-z0-9#]).*?$/gm) !== null;
        // part 2
        const valid = this._data.match(/^(?=.*ecl:(amb|blu|brn|gry|grn|hzl|oth)\b)(?=.*pid:[0-9]{9}\b)(?=.*eyr:20(2[0-9]|30)\b)(?=.*hcl:#[a-f0-9]{6}\b)(?=.*byr:(19[2-9][0-9]|200[0-2])\b)(?=.*iyr:20(1[0-9]|20)\b)(?=.*(hgt:(1([5-8][0-9]|9[0-3])cm)|hgt:(59|6[0-9]|7[0-6])in)\b).*?$/gm) !== null;

        if (valid) {
            console.log(this._data);
        }

        return valid;
    }
}

class PassportList {
    constructor (file) {
        const list = [];
        let newEntry = true;

        file = file.split('\r\n');

        file.forEach((r, i) => {

            if (r === '') {
                newEntry = true;
            } else {

                if (newEntry) {
                    newEntry = false;
                    list.push(r);
                } else {

                    list[list.length - 1] += ` ${r}`;
                }
            }
        });

        this._list = list;
        this.validPasswords = 0;
    }

    validate () {
        this._list.forEach(r => {

            if (new Passport(r).isValid()) this.validPasswords++;
        });

        console.log(this.validPasswords);
    }
}

fs.readFile('input.txt', 'utf8', (e, r) => {

    new PassportList(r).validate();
});