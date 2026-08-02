// ===== YOUR TASK =====
// Fill in the triggerNotification function below. setupNotificationDemo is
// already written for you - it wires the button up to your function.
// =====================

// TODO: fill in triggerNotification so it animates the given element.
// See the problem description for the keyframes and the options object.
export function triggerNotification(element) {
    // Your code here:
    // 1. Build the keyframes array (start, middle with offset 0.1, end).
    // 2. Build the options object (duration, easing, fill).
    // 3. const anim = element.animate(keyframes, options);
    // 4. When anim.finished resolves, console.log("Notification cleared").
}

// ----- Provided for you (you do not need to change this) -----
export function setupNotificationDemo() {
    const btn = document.querySelector('#notifyBtn');
    const note = document.querySelector('#notification');

    btn.addEventListener('click', () => {
        triggerNotification(note);
    });
}


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================
export default {
    triggerNotification,
    setupNotificationDemo
};
