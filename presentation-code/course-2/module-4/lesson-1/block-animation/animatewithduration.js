function animateWithDuration(fps, duration) {
    const to_x = 500;

    const animationStarted = Date.now(); // timestamp of when the animation started

    const step = () => {
        const now = Date.now(); // timestamp of now

        const pct = (now - animationStarted) / duration;
        // percentage of the way through the animation
        // 0 (just started) -> 1 (finished)

        setX( pct * to_x);

        if(now < animationStarted + duration) {
            setTimeout(step, 1000/fps);
        }
    };
    step();
}