import { NaiveSolver } from './solver/naive_solver.js';
import { HeuristicSolver } from './solver/heuristic_solver.js';

export const Operation = {
    ADD: 0,
    SUB: 1,
    MUL: 2,
    DIV: 3
}

export class KenKen {
    constructor(size) {
        this._size = size;
        this._groups = [];

        // Initialize cells array (2D array)
        this._cells = [];
        for (let y = 0; y < this._size; y++) {
            const row = [];
            for (let x = 0; x < this._size; x++) {
                row.push({ x, y });
            }
            this._cells.push(row);
        }
    }

    /**
     * Group the given cells into a single ken-ken group
     * @param { {x, y}[] } cells 
     * @param { number } groupTarget the target value for the group 
     * @param { Operation } the operation for the group (ie ADD, SUB, MUL, DIV)
     */
    groupCells(cellPositions, groupTarget, groupOperation) {
        const group = {
            cells: [],
            target: groupTarget,
            operation: groupOperation
        };
        cellPositions.forEach(cellPos => {
            const cell = this._getCell(cellPos.x, cellPos.y);
            this._removeCellFromGroup(cell); // Remove cell from any existing group
            this._addCellToGroup(cell, group);
        });

        this._groups.push(group);
    }

    solve() {
        const solver = new HeuristicSolver();
        return solver.solve(this._cells, this._groups);
    }

    _getCell(x, y) {
        return this._cells[y][x];
    }

    _addCellToGroup(cell, group) {
        group.cells.push(cell);
        cell.group = group;
    }

    _removeCellFromGroup(cell) {
        const group = cell.group;
        if (group) {
            // Remove the cell from the group
            const idx = group.cells.indexOf(cell);
            if (idx >= 0) {
                group.cells.splice(idx, 1);
            }

            // If the group is now empty, delete it
            if (group.cells.length === 0) {
                const groupIdx = this._groups.indexOf(group);
                if (groupIdx >= 0) {
                    this._groups.splice(groupIdx, 1);
                }
            }

            // Delete the reference to the group from the cell
            cell.group = undefined;
        }
    }
}