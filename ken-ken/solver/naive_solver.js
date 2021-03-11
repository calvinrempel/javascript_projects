import { Operation } from '../kenken.js';

export class NaiveSolver {
    solve(cells, groups) {
        /**
         * Brute-force backtracking solver:
         * 1. Put a number (1...size) in the next available cell
         * 1.a. If solution is invalid
         * 1.a.1. Remove the value placed in the cell.
         * 1.a.2. Go to 1 and try the next number. If no numbers left, no valid solutions, go back to previous cell
         * 1.b. If solution is valid
         * 1.b.1 Visit next cell and go to 1. If no more cells, then a solution is found
         */
 
         // keep track of values inserted, start with all 0s
         let values = [];
         values.length = cells.length * cells.length;
         values.fill(0);
 
         const MaxVal = cells.length;
 
         let vIdx = 0;
         while (vIdx < values.length) {
             if (values[vIdx] < MaxVal) {
                 // Try next value
                 values[vIdx] += 1;
 
                 // If it's valid, go to the next cell. If it's not valid, we'll retry this cell.
                 if (this._isValid(values, cells.length, groups)) {
                     vIdx += 1;
                 }
             } else {
                 // Go back to previous cell
                 values[vIdx] = 0; // reset current cell first!
                 vIdx -= 1;
 
                 if (vIdx < 0) {
                     throw new Error('No solution possible');
                 }
             }
         }
 
         // If we got here, we must have a valid solution!
         return this._unflatten(values, cells.length);
    }

    _isValid(values, size, groups) {
        const valueGrid = this._unflatten(values, size);

        // Quick check to make sure no rows/cols have duplicates
        for (let y = 0; y < size; y++) {
            const existingVals = new Set();
            for (let x = 0; x < size; x++) {
                const val = valueGrid[y][x];
                if (val !== 0) {
                    if (existingVals.has(val)) {
                        return false;
                    }
                    existingVals.add(val);
                }
            }
        }

        for (let x = 0; x < size; x++) {
            const existingVals = new Set();
            for (let y = 0; y < size; y++) {
                const val = valueGrid[y][x];
                if (val !== 0) {
                    if (existingVals.has(val)) {
                        return false;
                    }
                    existingVals.add(val);
                }
            }
        }

        // If we get here then all row/col values are distinct. Now check the groups
        groupLoop: for (const group of groups) {
            let groupValues = [];
            for (const cell of group.cells) {
                const val = valueGrid[cell.y][cell.x];
                if (val === 0) {
                    // If the group isn't fully filled out, exit early
                    continue groupLoop;
                }

                groupValues.push(val);
            }
            const sortedVals = groupValues.sort().reverse(); // Biggest to smallest to simplify sub/div
            let op;
            switch (group.operation) {
                case Operation.ADD:
                    op = (total, cur) => total + cur;
                    break;
                case Operation.SUB:
                    op = (total, cur) => total - cur;
                    break;
                case Operation.DIV:
                    op = (total, cur) => total / cur;
                    break;
                case Operation.MUL:
                    op = (total, cur) => total * cur;
                    break;
                default:
                    return false;
            }

            const groupVal = sortedVals.reduce(op);
            if (groupVal !== group.target) {
                return false;
            }
        }

        return true;
    }

    _unflatten(flat, size) {
        if (flat.length !== (size * size)) {
            throw new Error('Size mismatch');
        }

        const retval = [];
        let i = 0;
        for (let y = 0; y < size; y++) {
            const row = [];
            for (let x = 0; x < size; x++) {
                row.push(flat[i]);
                i += 1;
            }
            retval.push(row);
        }
        return retval;
    }
}