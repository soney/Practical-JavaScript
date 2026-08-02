// SOLUTION: learner-written variable declarations and console.logs (the export block below is provided scaffolding)
const rectLength = 8;
const rectWidth = 5;

const area = rectLength * rectWidth;
console.log(area);

const perimeter = 2 * (rectLength + rectWidth);
console.log(perimeter);

const areaSentence = 'The area of a rectangle with length ' + rectLength + ' and width ' + rectWidth + ' is ' + area + '.';
console.log(areaSentence);

export default {
    ...(typeof rectLength !== 'undefined' && { rectLength }),
    ...(typeof rectWidth !== 'undefined' && { rectWidth }),
    ...(typeof area !== 'undefined' && { area }),
    ...(typeof perimeter !== 'undefined' && { perimeter }),
    ...(typeof areaSentence !== 'undefined' && { areaSentence })
};
