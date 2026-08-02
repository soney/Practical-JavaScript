// SOLUTION: learner-defined feetToInches function (the export block below is provided scaffolding)
function feetToInches(feet) {
  const inches = feet * 12;
  console.log(inches);
  return inches;
}

export default {
  ...(typeof feetToInches !== 'undefined' && { feetToInches })
};
