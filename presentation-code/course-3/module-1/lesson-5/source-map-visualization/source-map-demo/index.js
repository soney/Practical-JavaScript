import { add, subtract } from './math';
import { log } from './logger';

const result1 = add(5, 3);
log(`5 + 3 = ${result1}`);

const result2 = subtract(10, 4);
log(`10 - 4 = ${result2}`);

// Natural error: trying to use a string method on a number
// This will throw "TypeError: result2.split is not a function"
log(result2.split(''));
