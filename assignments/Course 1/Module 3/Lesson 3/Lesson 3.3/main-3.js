const age = someFunctionToGetAge(); // Assume this function is defined elsewhere; do not modify this line

// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, using the provided age above; do not modify the setup line or the export block at the bottom.
// TODO: Create minAge = 21, canDrive (age >= minAge), and isMinor (age < minAge); then log canDrive and isMinor.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
// DO NOT MODIFY OR REMOVE:
// ============================================================
export default {
  ...(typeof age !== 'undefined' && { age }),
  ...(typeof minAge !== 'undefined' && { minAge }),
  ...(typeof canDrive !== 'undefined' && { canDrive }),
  ...(typeof isMinor !== 'undefined' && { isMinor })
};
