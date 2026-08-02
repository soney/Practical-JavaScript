// SOLUTION: learner-written variables and for loop (the export block below is provided scaffolding)
const numbers = [5, 10, 15, 20];
let total = 0;

for (let i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
}

console.log(total);

export default {
    ...(typeof numbers !== 'undefined' && { numbers }),
    ...(typeof total !== 'undefined' && { total }),
};
