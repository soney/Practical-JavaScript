// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Create rectLength = 8 and rectWidth = 5; then area (length * width), perimeter (2 * (length + width)), and areaSentence, logging each with console.log.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
    ...(typeof rectLength !== 'undefined' && { rectLength }),
    ...(typeof rectWidth !== 'undefined' && { rectWidth }),
    ...(typeof area !== 'undefined' && { area }),
    ...(typeof perimeter !== 'undefined' && { perimeter }),
    ...(typeof areaSentence !== 'undefined' && { areaSentence })
};
