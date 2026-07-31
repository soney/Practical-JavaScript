function animateWithFramerate(fps) {
    let x = 0;
    const to_x = 500;
    const step = () => {
        setX(x); // move the block to `x`
        x += 1;
        if(x < to_x) {
            setTimeout(step, 1000/fps);
        }
    };
    step();
}