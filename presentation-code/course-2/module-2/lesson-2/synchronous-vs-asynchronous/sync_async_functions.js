function synchronousPause(time) {
    const startTime = Date.now();
    while (Date.now() - startTime < time) {
        // Do nothing
    }
}

function asynchronousPause(time, callback) {
    setTimeout(callback, time);
}
