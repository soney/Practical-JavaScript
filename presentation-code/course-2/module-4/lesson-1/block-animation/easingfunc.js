function animate(duration, fromX, toX, easing, elem) {
    const animationStarted = Date.now(); // when animation started

    const ease = EasingFunctions[easing];

    const step = () => {
        const now = Date.now(); // now

        const pct = (now - animationStarted) / duration;
        // 0 (just started) -> 1 (finished)
        const pos = ease(pct);
        const x = fromX + pos * (toX - fromX)

        setX(x, elem);

        if(now <= animationStarted + duration) {
            requestAnimationFrame(step);
        }
    };

    step();
}

// Define a function that sets the x position of element
function setX(x, element) {
    if(x) { // if x was specified, use it as the new left position
        element.style.setProperty('left', `${x}px`);
    } else {
        element.style.removeProperty('left');
    }
}

//  Credit: https://gist.github.com/gre/1650294
const EasingFunctions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t*t,
    // decelerating to zero velocity
    easeOutQuad: t => t*(2-t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    // accelerating from zero velocity 
    easeInCubic: t => t*t*t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t)*t*t+1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    // accelerating from zero velocity 
    easeInQuart: t => t*t*t*t,
    // decelerating to zero velocity 
    easeOutQuart: t => 1-(--t)*t*t*t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    // accelerating from zero velocity
    easeInQuint: t => t*t*t*t*t,
    // decelerating to zero velocity
    easeOutQuint: t => 1+(--t)*t*t*t*t,
    // acceleration until halfway, then deceleration 
    easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t,
    easeInBounce: t => 1 - EasingFunctions.easeOutBounce(1 - t),
    easeOutBounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        
        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    },
    easeInOutBounce: t => t < 0.5 ? (1 - EasingFunctions.easeOutBounce(1 - 2 * t)) / 2 : (1 + EasingFunctions.easeOutBounce(2 * t - 1)) / 2
}