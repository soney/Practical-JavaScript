// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Create letters = ['A', 'B', 'C', 'D'] and reversedString = ''; use a for loop from letters.length - 1 down to 0 to append each letter to reversedString; then log reversedString.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
    ...(typeof letters !== 'undefined' && { letters }),
    ...(typeof reversedString !== 'undefined' && { reversedString })
};
