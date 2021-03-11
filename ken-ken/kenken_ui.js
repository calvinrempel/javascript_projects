class KenKenUI {
    constructor(containerId) {
        this._container = document.getElementById(containerId);
        this._size = 0;
        this._groupCount = 0;
        this._solution = undefined;
    }

    init(size) {
        this.reset(size);
    }

    reset(size) {
        this._size = parseInt(size);
        if (isNaN(this._size)) {
            alert('Size must be a number.');
            this._size = 0;
        }

        this._solution = undefined;
        this._buildDOM();
    }

    solve() {
        const kenken = new KenKen(this._size);
        const groups = this._getGroupsForSolver();
        for (const group of groups) {
            kenken.groupCells(group.cells, group.target, group.operation);
        }

        try {
            this._solution = kenken.solve();
            console.log('Solved: ', this._solution);
            this._updateDOM();
        } catch (err) {
            window.alert('No Solution Possible');
            console.error('Solving error', err);
        }
    }

    deselectAll() {
        this._getSelected().forEach((cell) => {
            cell.classList.remove('selected');
        });
    }

    groupSelected() {
        // Solution is no longer valid
        this._solution = undefined;
        const selected = this._getSelected();

        const target = this._promptTarget();
        let operation = '+';
        if (selected.length > 1) {
            operation = this._promptOperation();
        }
        const color = this._makeRandomColor(0.25);
        
        this._getSelected().forEach((cell) => {
            cell.dataset.group = this._groupCount;
            cell.dataset.target = target;
            cell.dataset.operation = operation;
            cell.dataset.color = color;
        });
        this._groupCount++;
        this.deselectAll();

        this._updateDOM();
    }

    _toggleSelected(cell) {
        const isSelected = cell.classList.contains('selected');
        if (isSelected) {
            cell.classList.remove('selected');
        } else {
            cell.classList.add('selected');
        }
    }

    _clearDOM() {
        this._container.innerHTML = '';
    }

    _buildDOM() {
        this._clearDOM();

        for (let y = 0; y < this._size; y++) {
            const row = document.createElement('div');
            row.classList.add('row');
            this._container.appendChild(row);

            for (let x = 0; x < this._size; x++) {
                const cell = document.createElement('div');
                cell.id = this._getCellElementId(x, y);
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.classList.add('cell');

                // Add event listeners to the cell div
                cell.addEventListener('click', () => {
                    this._toggleSelected(cell);
                });

                row.appendChild(cell);
            }
        }
    }

    _updateDOM() {
        const groupClasses = [
            'border-top',
            'border-right',
            'border-bottom',
            'border-left',
        ];

        // Clear each cell, and find the group that each cell is in
        const groups = {};
        this._iterEl(cell => {
            // Clear the classes and contents of the cell. We'll set them to updated values next
            cell.innerHTML = '';
            cell.classList.remove(...groupClasses);

            const group = cell.dataset.group;
            if (group) {
                if (groups.hasOwnProperty(group)) {
                    groups[group].push(cell);
                } else {
                    groups[group] = [ cell ];
                }
            }
        });

        for (const groupId in groups) {
            if (groups.hasOwnProperty(groupId)) {
                const group = groups[groupId];
                const labeledCell = this._getLabeledCell(group);

                for (const cell of group) {
                    cell.style.background = cell.dataset.color;
                    const neighbours = this._getNeighbours(cell, group);

                    (neighbours.top === undefined) && cell.classList.add('border-top');
                    (neighbours.right === undefined) && cell.classList.add('border-right');
                    (neighbours.bottom === undefined) && cell.classList.add('border-bottom');
                    (neighbours.left === undefined) && cell.classList.add('border-left');

                    if (cell === labeledCell) {
                        const label = document.createElement('span');
                        label.classList.add('label');
                        const op = group.length > 1 ? cell.dataset.operation : '';
                        label.innerHTML = `${cell.dataset.target}${op}`;
                        cell.appendChild(label);
                    }

                    if (this._solution) {
                        const x = parseInt(cell.dataset.x);
                        const y = parseInt(cell.dataset.y);
                        const solvedValue = this._solution[y][x];

                        const solvedValueEl = document.createElement('span');
                        solvedValueEl.classList.add('solved');
                        solvedValueEl.innerHTML = solvedValue;
                        cell.appendChild(solvedValueEl);
                    }
                }
            }
        }
    }

    _getNeighbours(cell, cells) {
        const neighbours = {
            top: undefined,
            right: undefined,
            bottom: undefined,
            left: undefined,
        };
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        cells.forEach(candidate => {
            const x2 = parseInt(candidate.dataset.x);
            const y2 = parseInt(candidate.dataset.y);

            if (x === x2) {
                if (y === y2 - 1) {
                    neighbours.bottom = candidate;
                } else if (y === y2 + 1) {
                    neighbours.top = candidate;
                }
            } else if (y === y2) {
                if (x === x2 - 1) {
                    neighbours.right = candidate;
                } else if (x === x2 + 1) {
                    neighbours.left = candidate;
                }
            }
        });
        return neighbours;
    }

    _getLabeledCell(cells) {
        let labeledCell;
        let labeledX = this._size;
        let labeledY = this._size;

        cells.forEach(cell => {
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);

            if ((y < labeledY) ||
                (y === labeledY && x < labeledX)
            ) {
                labeledCell = cell;
                labeledX = x;
                labeledY = y;
            }
        });

        return labeledCell;
    }

    _getCellElementId(x, y) {
        return `cell-${x},${y}`;
    }

    _getCellElement(x, y) {
        return document.getElementById(this._getCellElementId(x, y));
    }

    _toggleSelected(cell) {
        const isSelected = cell.classList.contains('selected');
        if (isSelected) {
            cell.classList.remove('selected');
        } else {
            cell.classList.add('selected');
        }
    }

    _getSelected() {
        const selected = [];
        this._iterEl((cell) => {
            if (cell.classList.contains('selected')) {
                selected.push(cell);
            }
        });
        return selected;
    }

    _getGroupsForSolver() {
        const ops = {
            '+': Operation.ADD,
            '-': Operation.SUB,
            'x': Operation.MUL,
            '/': Operation.DIV
        };

        // Clear each cell, and find the group that each cell is in
        const groups = {};
        this._iterEl(cell => {
            const groupId = cell.dataset.group;
            if (groupId) {
                const cellPos = {
                    x: parseInt(cell.dataset.x),
                    y: parseInt(cell.dataset.y)
                }

                if (groups.hasOwnProperty(groupId)) {
                    groups[groupId].cells.push(cellPos);
                } else {
                    groups[groupId] = {
                        cells: [cellPos],
                        target: parseInt(cell.dataset.target),
                        operation: ops[cell.dataset.operation]
                    }
                }
            }
        });

        return Object.values(groups);
    }

    _iter(callback) {
        for (let y = 0; y < this._size; y++) {
            for (let x = 0; x < this._size; x++) {
                callback(x, y);
            }
        }
    }

    _iterEl(callback) {
        this._iter((x, y) => {
            const cell = this._getCellElement(x, y);
            callback(cell);
        });
    }

    _promptTarget() {
        let targetNum = NaN;
        while (isNaN(targetNum) || targetNum < 0) {
            const input = window.prompt('Enter the target value for the group. Value must be a number greater than 0.')
            targetNum = parseInt(input);
        }
        return targetNum;
    }

    _promptOperation() {
        const allowedInputs = ['+', '-', 'x', '/'];

        let op = '';
        while (allowedInputs.indexOf(op) < 0) {
            const input = window.prompt('Enter the math operator for the group. Allowed values are: ' + allowedInputs.join(', '));
            op = input.trim();
        }
        return op;
    }

    _makeRandomColor(alpha) {
        const r = Math.trunc(Math.random() * 255);
        const g = Math.trunc(Math.random() * 255);
        const b = Math.trunc(Math.random() * 255);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}