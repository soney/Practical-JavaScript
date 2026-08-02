import { add } from './math-utils.js';
import { subtract as minus } from './math-utils.js';
import * as math from './math-utils.js';

document.querySelector('#sum').textContent = add(2, 3);
document.querySelector('#difference').textContent = minus(10, 4);
document.querySelector('#product').textContent = math.multiply(3, 3);
