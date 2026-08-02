// SOLUTION: learner-written variables and reverse for loop (the export block below is provided scaffolding)
const letters = ['A', 'B', 'C', 'D'];

let reversedString = '';

for (let index = letters.length - 1; index >= 0; index--) {
    reversedString = reversedString + letters[index];
}

console.log(reversedString);

export default {
    ...(typeof letters !== 'undefined' && { letters }),
    ...(typeof reversedString !== 'undefined' && { reversedString })
};
