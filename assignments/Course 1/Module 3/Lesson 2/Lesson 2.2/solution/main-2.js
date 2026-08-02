// SOLUTION: learner-written variable declarations and console.log (the export block below is provided scaffolding)
const shoppingList = ['apples', 'bread', 'milk'];
const newItem = 'eggs';
const updatedList = [...shoppingList, newItem];

console.log(updatedList);

export default {
  ...(typeof shoppingList !== 'undefined' && { shoppingList }),
  ...(typeof newItem !== 'undefined' && { newItem }),
  ...(typeof updatedList !== 'undefined' && { updatedList })
};