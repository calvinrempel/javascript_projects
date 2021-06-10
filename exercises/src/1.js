function multiply(a, b) {
    return a * b;
}
console.log(multiply(10, 4)); // should say '40'



function toTheNthPower(a, power) {
    // Part 2
    // eg toTheNthPower(2, 3) = 2^3 = 2 * 2 * 2
    
    let answer = 1;
    let i = 0;
    while (i < power) {
       answer = answer * a

        i = i + 1;
    }

    return answer;
}

function toTheNthPower1(a, power) {
    if (power === 1) {
        return a;
    }
    return a * toTheNthPower1(a, power - 1);
}

// toTheNthPower1(2, 3)
// toTheNthPower1(2, 2) => 4
// toTheNthPower1(2, 1) => 2

console.log(toTheNthPower(2, 3)); // should say '8'