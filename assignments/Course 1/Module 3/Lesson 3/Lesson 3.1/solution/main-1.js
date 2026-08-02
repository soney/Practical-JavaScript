const flour = someFunctionToCheckIfFlourIsAvailable(); // Assume this function is defined elsewhere; do not modify this line
const egg   = someFunctionToCheckIfEggIsAvailable();   // Assume this function is defined elsewhere; do not modify this line
const sugar = someFunctionToCheckIfSugarIsAvailable(); // Assume this function is defined elsewhere; do not modify this line

// SOLUTION: learner-written boolean flags and if statements (setup consts above and export block below are provided)
let canMakeBread = false; // Your code may overwrite this variable below
let canMakePasta = false; // Your code may overwrite this variable below
let canMakeCake  = false; // Your code may overwrite this variable below

if (flour) {
    canMakeBread = true;
    console.log("Can make bread!");
}

if (flour && egg) {
    canMakePasta = true;
    console.log("Can make pasta!");
}

if (flour && egg && sugar) {
    canMakeCake = true;
    console.log("Can make cake!");
}

if (!canMakeBread && !canMakePasta && !canMakeCake) {
    console.log("Cannot make anything!");
}

export default {
    ...(typeof canMakeBread !== 'undefined' && { canMakeBread }),
    ...(typeof canMakePasta !== 'undefined' && { canMakePasta }),
    ...(typeof canMakeCake !== 'undefined' && { canMakeCake }),
    ...(typeof flour !== 'undefined' && { flour }),
    ...(typeof egg !== 'undefined' && { egg }),
    ...(typeof sugar !== 'undefined' && { sugar })
};
