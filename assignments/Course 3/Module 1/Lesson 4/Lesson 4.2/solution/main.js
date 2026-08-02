// SOLUTION: import greeting here; export makeWelcome as the default at the bottom
import greeting from './greeting.js';

function makeWelcome(name) {
  return greeting(name) + ' Welcome to Node.';
}

export default makeWelcome;
