// Three simulated servers that respond at different speeds (provided for you).
const serverA = new Promise(res => setTimeout(() => res('Server A'), 1500));
const serverB = new Promise(res => setTimeout(() => res('Server B'), 800));
const serverC = new Promise(res => setTimeout(() => res('Server C'), 2000));

const runBtn = document.querySelector('#runBtn');
const display = document.querySelector('#console');

runBtn.addEventListener('click', () => {
    display.innerText = 'Racing...';

    // TODO: Use the built-in Promise.race to get whichever server responds FIRST.
    // Call Promise.race([serverA, serverB, serverC]), then chain
    // .then((winner) => { ... }) and show the winner, for example:
    //   display.innerText = 'Fastest: ' + winner;
});
