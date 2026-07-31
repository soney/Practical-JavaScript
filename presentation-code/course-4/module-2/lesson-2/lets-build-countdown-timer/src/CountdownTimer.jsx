import './style.css';
import React from "react";

const TIMER_AMOUNT = 5000;

export default function CountdownTimer() {
    const [endTimestamp, setEndTimestamp] = React.useState(Date.now() + TIMER_AMOUNT);
    const [timeLeft, setTimeLeft] = React.useState(TIMER_AMOUNT);
    const [runningTimer, setRunningTimer] = React.useState(false);

    React.useEffect(() => {
        let rafId;
        function step() {
            const remainingTime = endTimestamp - Date.now();

            if(remainingTime > 0) {
                setTimeLeft(remainingTime);
                rafId = requestAnimationFrame(step);
            } else {
                setTimeLeft(0);
            }
        }
        if(runningTimer) {
            rafId = requestAnimationFrame(step);
        }

        return () => {
            cancelAnimationFrame(rafId);
        }
    }, [runningTimer]);

    function onStart() {
        setEndTimestamp(Date.now() + timeLeft);
        setRunningTimer(true);
    }

    function onPause() {
        setRunningTimer(false);
    }

    function onReset() {
        setRunningTimer(false);
        setTimeLeft(TIMER_AMOUNT);
    }

    return <>
        <div className="display-timer">{displayTime(timeLeft)}</div>
        {!runningTimer && timeLeft > 0 && <button onClick={onStart}>Start</button> }
        {runningTimer && timeLeft > 0 && <button onClick={onPause}>Pause</button>}
        {(runningTimer || timeLeft < TIMER_AMOUNT) && <button onClick={onReset}>Reset</button>}
    </>;
}

function displayTime(ms) {
    const totalSeconds = Math.floor(ms/1000);
    const remainingMs = Math.floor((ms - totalSeconds*1000)/10);
    const minutes = Math.floor(totalSeconds/60);
    const remainingSeconds = totalSeconds%60;

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}.${String(remainingMs).padStart(2, "0")}`;
}