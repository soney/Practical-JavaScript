// SOLUTION: learner-written variables and for...of loop with filter (the export block below is provided scaffolding)
const numbers = [8, 13, 4, 21, 10, 17];

const filteredValues = [];

for (const number of numbers) {
    if (number > 10) {
        filteredValues.push(number);
    }
}

export default {
    ...(typeof numbers !== 'undefined' && { numbers }),
    ...(typeof filteredValues !== 'undefined' && { filteredValues })
};
