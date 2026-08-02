// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Create firstNumValue = 10, firstNumString = '10', secondNumValue = 20, secondNumString = '20'; then valueAddition (number 30) and stringAddition (string '1020'), logging each with console.log.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
    ...(typeof firstNumValue !== 'undefined' && { firstNumValue } ),
    ...(typeof firstNumString !== 'undefined' && { firstNumString } ),
    ...(typeof secondNumValue !== 'undefined' && { secondNumValue } ),
    ...(typeof secondNumString !== 'undefined' && { secondNumString } ),
    ...(typeof valueAddition !== 'undefined' && { valueAddition } ),
    ...(typeof stringAddition !== 'undefined' && { stringAddition } )
};