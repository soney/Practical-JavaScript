export function triggerNotification(element) {
    // SOLUTION: learner fills in the triggerNotification body below
    // 1. Define keyframes
    const keyframes = [
        { opacity: 0, transform: 'translateY(-20px)' },         // start
        { opacity: 1, transform: 'translateY(0)', offset: 0.1 }, // middle
        { opacity: 0, transform: 'translateY(20px)' }           // end
    ];

    // 2. Define options
    const options = {
        duration: 3000,
        easing: 'ease-in', // as requested
        fill: 'forwards'
    };

    // 3. Run animation
    const anim = element.animate(keyframes, options);

    // 4. Handle completion
    anim.finished.then(() => {
        console.log("Notification cleared");
    });
};

export function setupNotificationDemo() {
    const btn = document.querySelector('#notifyBtn');
    const note = document.querySelector('#notification');

    btn.addEventListener('click', () => {
        triggerNotification(note);
    });
}

export default { triggerNotification, setupNotificationDemo };