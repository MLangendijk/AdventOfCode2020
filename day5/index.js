import fs from 'fs';

class BoardingPass {
    constructor (data) {
        const seatMultiplier = 8;

        let maxRowIndex = 127;
        let minRowIndex = 0;
        let maxColumnIndex = 7;
        let minColumnIndex = 0;

        let rowIndex;
        let columIndex;

        for (let i = 0; i < data.length; i++) {

            switch (data[i]) {
                case 'F':

                    maxRowIndex = Math.floor((maxRowIndex + minRowIndex) / 2);
                    rowIndex = maxRowIndex;
                    break;
                case 'B':

                    minRowIndex = Math.ceil((maxRowIndex + minRowIndex) / 2);
                    rowIndex = minRowIndex;
                    break;
                case 'L':

                    maxColumnIndex = Math.floor((maxColumnIndex + minColumnIndex) / 2);
                    columIndex = maxColumnIndex;
                    break;
                case 'R':

                    minColumnIndex = Math.ceil((maxColumnIndex + minColumnIndex) / 2);
                    columIndex = minColumnIndex;
                    break;
            }
        }

        this._row = rowIndex;
        this._column = columIndex;
        this._seatId = (this._row * seatMultiplier) + this._column;
    }

    getSeatId () {
        return this._seatId;
    }
}

class BoardingPassList {

    constructor (data) {

        this.list = [];

        data.forEach(f => this.list.push(new BoardingPass(f)));

        this.list.sort((a, b) => a.getSeatId() > b.getSeatId() ? 1 : - 1);

        this.getMissingSeat();
    }

    getMissingSeat () {
        const firstSeat = this.list[0].getSeatId();

        for (let i = 0, j = this.list.length; i < j; i++) {

            if (this.list[i].getSeatId() !== firstSeat + i) {
                console.log(firstSeat + i);
                break;
            }
        }
    }
}

fs.readFile('input.txt', 'utf-8', (e, r) => {

    new BoardingPassList(r.split('\r\n'));
});