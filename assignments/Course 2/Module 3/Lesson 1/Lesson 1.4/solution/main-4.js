// Three simulated servers that respond at different speeds (provided for you).
const serverA = new Promise(res => setTimeout(() => res('Server A'), 1500));
const serverB = new Promise(res => setTimeout(() => res('Server B'), 800));
const serverC = new Promise(res => setTimeout(() => res('Server C'), 2000));

const runBtn = document.querySelector('#runBtn');
const display = document.querySelector('#console');

runBtn.addEventListener('click', () => {
    display.innerText = 'Racing...';

    // SOLUTION: learner replaces the TODO with the Promise.race block below
    // Get whichever server responds first, then show the winner.
    Promise.race([serverA, serverB, serverC])
        .then((winner) => {
            display.innerText = 'Fastest: ' + winner;
        })
        .catch((error) => {
            display.innerText = 'Error: ' + error;
        });
});
