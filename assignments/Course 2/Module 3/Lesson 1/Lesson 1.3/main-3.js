// Three simulated requests that finish at different times (provided for you).
const p1 = new Promise(res => setTimeout(() => res('Blue'), 1000));
const p2 = new Promise(res => setTimeout(() => res('Red'), 2000));
const p3 = new Promise(res => setTimeout(() => res('Green'), 1500));

const runBtn = document.querySelector('#runBtn');
const display = document.querySelector('#console');

runBtn.addEventListener('click', () => {
    display.innerText = 'Running...';

    // TODO: Use the built-in Promise.all to wait for p1, p2, and p3 to ALL finish.
    // Call Promise.all([p1, p2, p3]), then chain .then((results) => { ... }) and
    // show the three results joined with ', ', for example:
    //   display.innerText = results.join(', ');
});
