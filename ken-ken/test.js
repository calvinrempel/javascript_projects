import { Operation, KenKen } from './kenken.js';

const test1 = {
    name: "Test 1",
    groups: [
        [ 1, 1, 2 ],
        [ 3, 4, 2 ],
        [ 3, 3, 5 ],
    ],
    targets: {
        1: [ 3, Operation.MUL ],
        2: [ 6, Operation.MUL ],
        3: [ 6, Operation.MUL ],
        4: [ 2, Operation.MUL ],
        5: [ 1, Operation.ADD ]
    },
    answer: [
        [ 3, 1, 2 ],
        [ 1, 2, 3 ],
        [ 2, 3, 1 ]
    ]
};


executeTest(test1);

function executeTest(test) {
    const kk = new KenKen(test.groups.length);
    for (const groupNum in test.targets) {
        if (test.targets.hasOwnProperty(groupNum)) {
            const target = test.targets[groupNum];
            const cells = [];

            for (let y = 0; y < test.groups.length; y++) {
                for (let x = 0; x < test.groups.length; x++) {
                    if (test.groups[y][x] == groupNum) {
                        cells.push({ x, y });
                    }
                }
            }

            kk.groupCells(cells, target[0], target[1]);
        }
    }

    try {
        const solution = kk.solve();
        const expected = test.answer;
        for (let y = 0; y < expected.length; y++) {
            for (let x = 0; x < expected.length; x++) {
                if (expected[y][x] != solution[y][x]) {
                    console.log(`Failed: ${test.name}. Solution incorrect.`);
                    console.log('Expected: ', expected);
                    console.log('Actual: ', solution);
                    return;
                }
            }
        }
        console.log(`Success: ${test.name}`);
    } catch (e) {
     console.log(`Failed: ${test.name}. No Solution found`);
     console.error(e);
    }
}