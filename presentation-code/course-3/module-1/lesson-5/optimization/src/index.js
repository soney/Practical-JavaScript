import _ from 'lodash';
const btn = document.querySelector("button#confetti");
const COLORS = ["#F00", "#0F0", "#00F"];
//               red     green   blue

btn.addEventListener('click', () => {
    import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
            origin: { y: 1.0 },
            colors: [ _.sample(COLORS) ]
        });
    });
});