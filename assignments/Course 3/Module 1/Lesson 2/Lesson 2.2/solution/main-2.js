// This file uses Lodash, which index.html loads from a CDN <script> tag, so the
// Lodash global `_` is available here. In a project with a bundler you would
// import it instead:
//   import _ from "lodash";
// There is no build step here (Lodash is pre-packaged from a CDN), so we use the
// global.

const prices = [12, 5, 20, 8, 15];

// SOLUTION: compute total/average/largest with Lodash and render each one
const total = _.sum(prices);
document.querySelector('#total').textContent = String(total);

const average = _.mean(prices);
document.querySelector('#average').textContent = String(average);

const largest = _.max(prices);
document.querySelector('#largest').textContent = String(largest);
