const age = someFunctionToGetAge(); // Assume this function is defined elsewhere; do not modify this line
// SOLUTION: learner-written code - minAge, canDrive, isMinor, and console.logs (const age above and export block below are provided)
const minAge = 21;

const canDrive = age >= minAge;
const isMinor = age < minAge;

console.log(canDrive);
console.log(isMinor);

export default {
  ...(typeof age !== 'undefined' && { age }),
  ...(typeof minAge !== 'undefined' && { minAge }),
  ...(typeof canDrive !== 'undefined' && { canDrive }),
  ...(typeof isMinor !== 'undefined' && { isMinor })
};
