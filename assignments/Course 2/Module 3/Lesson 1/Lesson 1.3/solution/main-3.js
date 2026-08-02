// Three simulated requests that finish at different times (provided for you).
const p1 = new Promise(res => setTimeout(() => res('Blue'), 1000));
const p2 = new Promise(res => setTimeout(() => res('Red'), 2000));
const p3 = new Promise(res => setTimeout(() => res('Green'), 1500));

const runBtn = document.querySelector('#runBtn');
const display = document.querySelector('#console');

runBtn.addEventListener('click', () => {
    display.innerText = 'Running...';

    // SOLUTION: learner replaces the TODO with the Promise.all block below
    // Wait for all three requests to finish, then show their results in order.
    Promise.all([p1, p2, p3])
        .then((results) => {
            display.innerText = results.join(', ');
        })
        .catch((error) => {
            display.innerText = 'Error: ' + error;
        });
});
