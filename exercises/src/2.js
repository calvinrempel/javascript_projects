const people = [
    { name: 'Alice', age: 20 },
    { name: 'Bob', age: 40 },
    { name: 'Charlie', age: 50, hairColor: 'black' }
];


function findPersonByName(name) {
    for (const p of people) {
        if (p.name === n) {
            return p;
        }
    }
}

findPersonByName('Charlie').age;