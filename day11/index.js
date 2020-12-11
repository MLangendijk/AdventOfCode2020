import fs from 'fs';

const updateSeats1 = (grid) => {
    const maxAdjacent = 4;
    const occupied = '#';
    const empty = 'L';
    const floor = '.';
    let changes = false;
    let area = [-1, 0, 1];

    let updateableGrid = grid.map(r => r.slice());

    const updateSeat = (gridIndex, rowIndex) => {
        let adjacentSeats = 0;

        area
            .map(row => grid[gridIndex + row])
            .filter(row => row)
            .forEach(row => {
                area.map(index => row[rowIndex + index])
                    .filter(seat => seat)
                    .forEach(seat => seat === occupied && adjacentSeats++);
            });

        if (grid[gridIndex][rowIndex] === occupied) {

            // Don't want to count itself.
            adjacentSeats--;
        }

        if (adjacentSeats >= maxAdjacent) {
            if (updateableGrid[gridIndex][rowIndex] !== empty) {
                updateableGrid[gridIndex][rowIndex] = empty;
                changes = true;
            }
        } else if (adjacentSeats === 0) {
            if (updateableGrid[gridIndex][rowIndex] !== occupied) {
                updateableGrid[gridIndex][rowIndex] = occupied;
                changes = true;
            }
        }
    };

    for (let i = 0; i < grid.length; i++) {

        for (let j = 0; j < grid[i].length; j++) {

            if (grid[i][j] !== floor) {
                updateSeat(i, j);
            }
        }
    }

    return {
        grid: updateableGrid,
        changes: changes
    }
};

const updateSeats = (grid) => {
    const maxAdjacent = 5;
    const occupied = '#';
    const empty = 'L';
    const floor = '.';
    let changes = false;

    let updateableGrid = grid.map(r => r.slice());

    const updateSeat = (gridIndex, rowIndex) => {

        const getAdjacentSeatCount =() => {
            let row = grid[gridIndex];
            let adjacentSeats = 0;

            // Left
            for (let i = rowIndex - 1; i >= 0; i--) {

                let seat = row[i];

                if (seat) {

                    if (seat === empty || seat === occupied) {
                        if (seat === occupied) {
                            adjacentSeats++;
                        }
                        break;
                    }
                }
            }

            // Right
            for (let i = rowIndex + 1; i < row.length; i++) {

                let seat = row[i];

                if (seat) {

                    if (seat === empty || seat === occupied) {

                        if (seat === occupied) {
                            adjacentSeats++;
                        }
                        break;
                    }
                }
            }

            // Up
            for (let i = gridIndex - 1; i >= 0; i--) {
                let seat = grid[i][rowIndex];

                if (seat) {
                    if (seat === occupied || seat === empty) {

                        if (seat === occupied) {
                            adjacentSeats++;
                        }

                        break;
                    }
                }
            }

            // Down
            for (let i = gridIndex + 1; i < grid.length; i++) {
                let seat = grid[i][rowIndex];

                if (seat) {
                    if (seat === occupied || seat === empty) {

                        if (seat === occupied) {
                            adjacentSeats++;
                        }

                        break;
                    }
                }
            }

            // Left Up
            for (let i = rowIndex - 1, j = gridIndex - 1; i >= 0 && j >= 0; i--,j--) {
                let row = grid[j];

                if (!row) {
                    break;
                }

                let seat = grid[j][i];

                if (seat) {
                    if (seat === occupied || seat === empty) {

                        if (seat === occupied) {
                            adjacentSeats++;
                        }

                        break;
                    }
                }
            }

            // Left Down
            for (let i = rowIndex - 1, j = gridIndex + 1; i >= 0 && j < grid.length; i--, j++) {
                let row = grid[j];

                if (!row) {
                    break;
                }

                let seat = grid[j][i];

                if (seat) {
                    if (seat === occupied || seat === empty) {

                        if (seat === occupied) {
                            adjacentSeats++;
                        }

                        break;
                    }
                }
            }

            // Right Down
            for (let i = rowIndex + 1, j = gridIndex + 1; i < grid[gridIndex].length && j < grid.length; i++, j++) {
                let row = grid[j];

                if (!row) {
                    break;
                }

                let seat = grid[j][i];

                if (seat) {
                    if (seat === occupied || seat === empty) {

                        if (seat === occupied) {
                            adjacentSeats++;
                        }

                        break;
                    }
                }
            }

            // Right Up
            for (let i = rowIndex + 1, j = gridIndex - 1; i < grid[gridIndex].length && j >= 0; i++, j--) {
                let row = grid[j];

                if (!row) {
                    break;
                }

                let seat = grid[j][i];

                if (seat) {
                    if (seat === occupied || seat === empty) {

                        if (seat === occupied) {


                            adjacentSeats++;
                        }

                        break;
                    }
                }
            }

            return adjacentSeats;
        };

        let adjacentSeats = getAdjacentSeatCount();


        if (adjacentSeats >= maxAdjacent) {
            if (updateableGrid[gridIndex][rowIndex] !== empty) {
                updateableGrid[gridIndex][rowIndex] = empty;
                changes = true;
            }
        } else if (adjacentSeats === 0) {
            if (updateableGrid[gridIndex][rowIndex] !== occupied) {
                updateableGrid[gridIndex][rowIndex] = occupied;
                changes = true;
            }
        }
    };

    for (let i = 0; i < grid.length; i++) {

        for (let j = 0; j < grid[i].length; j++) {

            if (grid[i][j] !== floor) {
                updateSeat(i, j);
            }
        }
    }

    return {
        grid: updateableGrid,
        changes: changes
    }
};

fs.readFile('input.txt', 'utf8', (e, r) => {

    let grid = r.split('\r\n').map(l => l.split(''));

    // Part one
    /*let response = updateSeats1(grid);

    while (response.changes) {
        response = updateSeats1(response.grid);
    }

    console.log(response.grid.map(r => r.filter(a => a === '#').join('')).join('').length);
    */

    // Part 2
    let response = updateSeats(grid);

    while (response.changes) {
        response = updateSeats(response.grid);
    }

    console.log(response.grid.map(r => r.filter(a => a === '#').join('')).join('').length);
    //console.log(response.grid.map(r => r.join('')).join('\r\n'));
});