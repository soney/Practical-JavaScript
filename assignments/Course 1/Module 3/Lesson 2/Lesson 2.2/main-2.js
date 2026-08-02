// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Create shoppingList = ['apples', 'bread', 'milk'], newItem = 'eggs', and updatedList = shoppingList with newItem added at the end (spread or concat; do not mutate shoppingList); then log updatedList.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
  ...(typeof shoppingList !== 'undefined' && { shoppingList }),
  ...(typeof newItem !== 'undefined' && { newItem }),
  ...(typeof updatedList !== 'undefined' && { updatedList })
};