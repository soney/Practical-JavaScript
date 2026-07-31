function runSimpleAnimation() {
const fromX = 0, toX = 17, fps = 60, duration = 5000;
const animationStarted = Date.now();

function step() {
    const pct = (Date.now() - animationStarted) / duration;
    const x = fromX + (toX - fromX) * pct;
    setX(x);
    if(x < toX) { setTimeout(step, 1/fps); }
    const ease = () => 
}
step();
}