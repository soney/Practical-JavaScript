// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Create score1 = 45, score2 = 55, score3 = 50; then totalScore, averageScore, negativeScore (-score1), and averageSentence, logging each with console.log.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
    ...(typeof score1 !== 'undefined' && { score1 }),
    ...(typeof score2 !== 'undefined' && { score2 }),
    ...(typeof score3 !== 'undefined' && { score3 }),
    ...(typeof totalScore !== 'undefined' && { totalScore }),
    ...(typeof averageScore !== 'undefined' && { averageScore }),
    ...(typeof negativeScore !== 'undefined' && { negativeScore }),
    ...(typeof averageSentence !== 'undefined' && { averageSentence })
};