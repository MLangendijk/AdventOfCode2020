import fs from 'fs';

const Direction = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
};

const Action = {
    NORTH: 'N',
    EAST: 'E',
    SOUTH: 'S',
    WEST: 'W',
    LEFT: 'L',
    RIGHT: 'R',
    FORWARD: 'F'
};

class Navigation {

    constructor (instructions, direction) {
        this._instructions = instructions;
        this._direction = direction || 0;
        this._location = {
            horizontal: 0,
            vertical: 0
        };
        this._waypoint = {
            horizontal: 1,
            vertical: 10
        };
    }

    navigate (instruction) {
        const type = instruction.match(/([A-Z])/g)[0];
        const count = parseInt(instruction.match(/([0-9]+)/g)[0]);
        let changes, direction;

        switch (type) {
            case Action.NORTH:
                this._location.horizontal += count;
                break;
            case Action.EAST:
                this._location.vertical += count;
                break;
            case Action.SOUTH:
                this._location.horizontal -= count;
                break;
            case Action.WEST:
                this._location.vertical -= count;
                break;
            case Action.LEFT:
                changes = count / 90;
                direction = this._direction - changes;

                if (direction < Direction.NORTH) {
                    direction =  4 + direction; // Oh god
                }

                this._direction = direction;
                break;
            case Action.RIGHT:
                changes = count / 90;
                direction = Math.abs(this._direction + changes);

                if (direction > Direction.WEST) {
                    direction = direction - 4; // Oh god
                }

                this._direction = direction;
                break;
            case Action.FORWARD:

                switch (this._direction) {
                    case Direction.NORTH:
                        this._location.horizontal += count;
                        break;
                    case Direction.EAST:
                        this._location.vertical += count;
                        break;
                    case Direction.SOUTH:
                        this._location.horizontal -= count;
                        break;
                    case Direction.WEST:
                        this._location.vertical -= count;
                        break;
                }
                break;
        }
    }

    navigateByWaypoint (instruction) {
        const type = instruction.match(/([A-Z])/g)[0];
        const count = parseInt(instruction.match(/([0-9]+)/g)[0]);
        let changes, hor, vert;

        switch (type) {
            case Action.NORTH:
                this._waypoint.horizontal += count;
                break;
            case Action.EAST:
                this._waypoint.vertical += count;
                break;
            case Action.SOUTH:
                this._waypoint.horizontal -= count;
                break;
            case Action.WEST:
                this._waypoint.vertical -= count;
                break;
            case Action.LEFT:
                changes = count / 90;
                hor = this._waypoint.horizontal;
                vert = this._waypoint.vertical;

                for (let i = 0; i < changes; i++) {
                    let intermediateHor = hor;
                    let intermediateVert = vert;

                    // We are going north
                    if (intermediateHor > 0) {
                        vert = -intermediateHor;
                    } else {

                        // We are going south
                        vert = -intermediateHor;
                    }

                    // We are going east
                    if (intermediateVert > 0) {

                        hor = intermediateVert;
                    } else {

                        // We are going west
                        hor = intermediateVert;
                    }
                }

                this._waypoint.horizontal = hor;
                this._waypoint.vertical = vert;
                break;
            case Action.RIGHT:
                changes = count / 90;
                hor = this._waypoint.horizontal;
                vert = this._waypoint.vertical;

                for (let i = 0; i < changes; i++) {
                    let intermediateHor = hor;
                    let intermediateVert = vert;

                    // We are going north
                    if (intermediateHor > 0) {
                        vert = intermediateHor;
                    } else {

                        // We are going south
                        vert = intermediateHor;
                    }

                    // We are going east
                    if (intermediateVert > 0) {

                        hor = -intermediateVert;
                    } else {

                        // We are going west
                        hor = -intermediateVert;
                    }
                }

                this._waypoint.horizontal = hor;
                this._waypoint.vertical = vert;
                break;
            case Action.FORWARD:
                hor = this._waypoint.horizontal * count;
                vert = this._waypoint.vertical * count;

                this._location.horizontal += hor;
                this._location.vertical += vert;
                break;
        }
    }

    execute () {


        /* Part 1
        this._instructions.forEach(a => this.navigate(a));
        return Math.abs(this._location.vertical) + Math.abs(this._location.horizontal)
        */

        this._instructions.forEach(a => this.navigateByWaypoint(a));
        return Math.abs(this._location.vertical) + Math.abs(this._location.horizontal)
    }

}

fs.readFile('input.txt', 'utf8', (e, r) => {

    const instructions = r.split('\r\n');

    console.log(new Navigation(instructions, Direction.EAST).execute());
});