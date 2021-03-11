export class HeuristicSolver {
    solve(cells, groups) {
        const MaxVal = cells.length;
        const size = cells.length;
        
        // Build HCells structure (flat list)
        const hcells = [];
        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells.length; x++) {
                hcells.push(new HCell(x, y));
            }
        }

        // Add all possibilities to HCells
        for (const group of groups) {
            const op = group.operation;
            const target = group.target;
            const numCells = group.cells.length;

            const possibilities = this._getPossibilities(target, op, numCells, MaxVal);
            for (const cell of group.cells) {
                const hcell = this._getHCell(cell.x, cell.y, size, hcells);

                for (const p of possibilities) {
                    hcell.addPossibility(p);
                }
            }
        }

        // Find cells that have only one possibility
        const sortedLeastPossibilities = hcells.slice();
        sortedLeastPossibilities.sort(this._sortByLeastPossibilities);

        while (sortedLeastPossibilities.length > 0) {
            const hcell = sortedLeastPossibilities[0];
            if (hcell.count() === 0) {
                // TODO: No Solution
            } else if (hcell.count() === 1) {
                // Only one possibility. Write it in!
                this._solidify(hcell, hcells, size);
                sortedLeastPossibilities.splice(1, 1);
                sortedLeastPossibilities.sort(this._sortByLeastPossibilities);
            } else {
                // TODO: There are no single-possibility cells, we'll need to take a guess and see what happens!
            }
        }
        
        const solution = [];
        for (let y = 0; y < cells.length; y++) {
            const row = [];
            for (let x = 0; x < cells.length; x++) {
                row.push(this._getHCell(x, y, size, hcells).getValue());
            }
            solution.push(row);
        }
        return solution;
    }

    _solidify(hcell, hcells, size) {
        hcell.solidify()
        const value = hcell.getValue();
        const x = hcell.x;
        const y = hcell.y;

        // Remove the option from all cells in the same column
        for (let _y = 0; _y < size; _y++) {
            if (_y != y) {
                const h = this._getHCell(x, _y, size, hcells);
                h.removePossibility(value);
            }
        }

        // Remove the option from all cells in the same row
        for (let _x = 0; _x < size; _x++) {
            if (_x != x) {
                const h = this._getHCell(_x, y, size, hcells);
                h.removePossibility(value);
            }
        }
    }

    _getPossibilities(target, op, cellCount, maxVal) {
        // TODO: get all possible values for a cell based on the group target and operation
    }

    _getHCell(x, y, size, hcells) {
        let idx = (size * y) + x;
        return hcells[idx];
    }

    _sortByLeastPossibilities(a, b) {
        const ac = a.count();
        const bc = b.count();
        return (ac < bc) ? -1 : (ac > bc) ? 1 : 0;
    }
}

export class HCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this._possibilities = new Set();
        this._solid = false;
        this._value = undefined;
    }

    count() {
        return this._possibilities.size();
    }

    addPossibility(p) {
        this._possibilities.add(p);
    }

    removePossibility(p) {
        this._possibilities.delete(p);
    }

    getPossibilities() {
        return Object.values(this._possibilities);
    }

    solidify() {
        this._value = this.getPossibilities()[0];
        this._solid = true;
        this._possibilities.clear();
    }

    getValue() {
        return this._value;
    }
}