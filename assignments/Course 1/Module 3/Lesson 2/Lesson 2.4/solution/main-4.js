// SOLUTION: learner-written variable declarations and console.logs (the export block below is provided scaffolding)
const score1 = 45;
const score2 = 55;
const score3 = 50;

const totalScore = score1 + score2 + score3;
console.log(totalScore);

const averageScore = totalScore / 3;
console.log(averageScore);

const negativeScore = -score1;
console.log(negativeScore);

const averageSentence = 'The average of ' + score1 + ', ' + score2 + ', and ' + score3 + ' is ' + averageScore + '.';
console.log(averageSentence);

export default {
    ...(typeof score1 !== 'undefined' && { score1 }),
    ...(typeof score2 !== 'undefined' && { score2 }),
    ...(typeof score3 !== 'undefined' && { score3 }),
    ...(typeof totalScore !== 'undefined' && { totalScore }),
    ...(typeof averageScore !== 'undefined' && { averageScore }),
    ...(typeof negativeScore !== 'undefined' && { negativeScore }),
    ...(typeof averageSentence !== 'undefined' && { averageSentence })
};