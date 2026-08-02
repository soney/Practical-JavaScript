// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Create numbers = [8, 13, 4, 21, 10, 17] and filteredValues = []; use a for...of loop with an if to push each number greater than 10 into filteredValues.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
    ...(typeof numbers !== 'undefined' && { numbers }),
    ...(typeof filteredValues !== 'undefined' && { filteredValues })
};
