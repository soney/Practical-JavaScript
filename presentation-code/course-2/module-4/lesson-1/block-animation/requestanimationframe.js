function animate(duration, fromX, toX) {
    const animationStarted = Date.now(); // timestamp of when the animation started

    const step = () => {
        const now = Date.now(); // timestamp of now

        const pct = (now - animationStarted) / duration;
        // percentage of the way through the animation
        // 0 (just started) -> 1 (finished)

        const x = pct * (toX - fromX) + fromX;

        setX(x);

        if(now <= animationStarted + duration) {
            requestAnimationFrame(step);
        }
    };

    step();
}