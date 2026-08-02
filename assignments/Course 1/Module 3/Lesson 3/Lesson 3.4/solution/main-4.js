const score = someFunctionToGetScore(); // Assume this function is defined elsewhere; do not modify this line
const bonusPoints = someFunctionToGetBonusPoints(); // Assume this function is defined elsewhere; do not modify this line

// SOLUTION: learner-written code - message plus the if / else if and console.log (setup consts above and export block below are provided)
let message = '';

if (score > 80 || bonusPoints > 5) {
  message = 'High score!';
} else if (score <= 80 && bonusPoints <= 5) {
  message = 'Keep trying';
}

console.log(message);

export default {
  ...(typeof score !== 'undefined' && { score }),
  ...(typeof bonusPoints !== 'undefined' && { bonusPoints }),
  ...(typeof message !== 'undefined' && { message })
};
