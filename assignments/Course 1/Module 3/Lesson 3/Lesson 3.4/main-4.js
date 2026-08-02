const score = someFunctionToGetScore(); // Assume this function is defined elsewhere; do not modify this line
const bonusPoints = someFunctionToGetBonusPoints(); // Assume this function is defined elsewhere; do not modify this line

// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, using the provided score/bonusPoints above; do not modify the setup lines or the export block at the bottom.
// TODO: Create message (empty string), then use if / else if to set it to "High score!" (score > 80 || bonusPoints > 5) or "Keep trying" (score <= 80 && bonusPoints <= 5); then log message.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
// DO NOT MODIFY OR REMOVE:
// ============================================================
export default {
  ...(typeof score !== 'undefined' && { score }),
  ...(typeof bonusPoints !== 'undefined' && { bonusPoints }),
  ...(typeof message !== 'undefined' && { message })
};
