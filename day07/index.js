import fs from 'fs';

class Bag {
    constructor (name) {
        this.name = name;

        this.containingBags = {};
    }

    addContainingBag (bag, count) {
        this.containingBags[bag.name] = {
            bag: bag,
            count: count
        }
    }

    containsBag (find) {
        if (this.containingBags[find]) {
            return true;
        }

        for (let bag in this.containingBags) {

            if (this.containingBags[bag].bag.containsBag(find)) {
                return true;
            }
        }
    }

    getBagCount () {
        let count = 0;

        for (let bag in this.containingBags) {

            count += this.containingBags[bag].count;
            count += (this.containingBags[bag].count * this.containingBags[bag].bag.getBagCount());
        }

        return count;
    }
}

class Rules {

    constructor (rules) {
        this.bags = {};

        rules.forEach((rule) => {

            let split = rule.split('contain');
            let upper = split[0];
            let containing = split[1];

            upper = upper.replace(/bags/g, '').replace(/bag/g, '').trim();

            if (!this.bags[upper]) {
                this.bags[upper] = new Bag(upper);
            }

            containing.trim().split(',')
                .map(r => {

                    r = r.replace('.', '').replace(/bags/g, '').replace(/bag/g, '').trim();

                    const count = parseInt(r.slice(0, 1));
                    const bag = r.slice(2);

                    if (isNaN(count)) {
                        return;
                    }

                    if (!this.bags[bag]) {
                        this.bags[bag] = new Bag(bag);
                    }

                    this.bags[upper].addContainingBag(this.bags[bag], count);
                });

        });
    }

    findContainingBags (find) {
        let count = 0;

        for (let bagsKey in this.bags) {

            if (this.bags[bagsKey].containsBag(find)) {
                count++;
            }
        }

        // Part 1
        console.log(count);
    }

    findContainingBagsTotal (find) {

        if (!this.bags[find]) {
            return;
        }

        const count = this.bags[find].getBagCount();

        // Part 2
        console.log(count);
    }
}

fs.readFile('input.txt', 'utf8', (e, r) => {
    const rules = r.split('\r\n');

    new Rules(rules).findContainingBagsTotal('shiny gold');
});