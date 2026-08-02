// SOLUTION: learner-written variables, while loop, and if statement (the export block below is provided scaffolding)
const dailyRevenue = [52, 47, 105, 71];
let daysPassed = 0;
const newUniformsCost = 270;
let fundsRaised = 0;

while (daysPassed < dailyRevenue.length) {
    fundsRaised += dailyRevenue[daysPassed];
    daysPassed++;
}

if (fundsRaised > newUniformsCost) {
    console.log("Raised enough funds for new uniforms after " + daysPassed + " days!");
}

export default {
    ...(typeof dailyRevenue !== 'undefined' && { dailyRevenue }),
    ...(typeof daysPassed !== 'undefined' && { daysPassed }),
    ...(typeof newUniformsCost !== 'undefined' && { newUniformsCost }),
    ...(typeof fundsRaised !== 'undefined' && { fundsRaised })
};