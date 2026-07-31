import _ from 'lodash';
import './style.css';

const btn = document.querySelector("button#confetti");
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FDCB6E", "#6C5CE7"];

function getConfettiColors() {
    // Use lodash to pick a random subset of colors
    return _.sampleSize(COLORS, 3);
}

btn.addEventListener('click', () => {
    import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
            origin: { y: 0.7 },
            colors: getConfettiColors(),
            spread: 100,
            particleCount: 150
        });
    });
});
