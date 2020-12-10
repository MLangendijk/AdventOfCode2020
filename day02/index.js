var fs = require('fs');

var parser = {
    counter: 0,
    secondCounter: 0,

    parse: function (data) {
        return data.split('\n');
    },

    find: function (data) {
        var self = this;

        // Editor adds empty line to input.txt
        data.splice(data.length - 1);

        data.forEach(function (f, i) {

            self.matchPWD(f);
        });
    },

    matchPWD: function (p) {
        var split = p.split(' '),
            numbers = split[0].split('-'),
            letter = split[1][0],
            word = split[2],
            matched = word.matchAll(letter);

        var matches = [...matched];

        // Part one
        if (matches.length >= parseInt(numbers[0]) && matches.length <= parseInt(numbers[1])) {
            this.counter++;
        }

        // Part two
        var result = matches.filter(function (a) {

            // Minus 1 because index 1 based input.
            return a.index === parseInt(numbers[0]) - 1 || a.index === parseInt(numbers[1]) - 1;
        });

        if (result.length === 1) {
            this.secondCounter++;
        }
    }
};

fs.readFile('input.txt', 'utf8', function (e, data) {

    parser.find(parser.parse(data));
});
