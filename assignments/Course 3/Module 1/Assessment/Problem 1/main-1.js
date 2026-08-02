// This file uses Lodash, which index.html loads from a CDN <script> tag, so the
// Lodash global `_` is available here. In a project with a bundler you would
// import it instead:
//   import _ from "lodash";
// There is no build step here (Lodash is pre-packaged from a CDN), so we use the
// global.

const transactions = [
    { category: 'Food',      amount: 12 },
    { category: 'Transport', amount: 8  },
    { category: 'Food',      amount: 20 },
    { category: 'Utilities', amount: 40 },
];

// TODO: Using the Lodash global `_`, compute:
//   total   = the sum of every `amount` value
//   average = the mean of every `amount` value
//   largest = the `amount` of the transaction with the highest `amount`

// TODO: Render the results into the element with ID `summary` using:
//   summary.innerHTML = `<p>Total: ${total}</p><p>Average: ${average}</p><p>Largest: ${largest}</p>`;
