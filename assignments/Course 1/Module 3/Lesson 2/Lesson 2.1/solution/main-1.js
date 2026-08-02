// SOLUTION: learner-written variable declarations and console.logs (the export block below is provided scaffolding)
const firstNumValue = 10;
const firstNumString = '10';
const secondNumValue = 20;
const secondNumString = '20';

const valueAddition = firstNumValue + secondNumValue;
console.log(valueAddition);

const stringAddition = firstNumString + secondNumString;
console.log(stringAddition);

export default {
    ...(typeof firstNumValue !== 'undefined' && { firstNumValue } ),
    ...(typeof firstNumString !== 'undefined' && { firstNumString } ),
    ...(typeof secondNumValue !== 'undefined' && { secondNumValue } ),
    ...(typeof secondNumString !== 'undefined' && { secondNumString } ),
    ...(typeof valueAddition !== 'undefined' && { valueAddition } ),
    ...(typeof stringAddition !== 'undefined' && { stringAddition } )
};
