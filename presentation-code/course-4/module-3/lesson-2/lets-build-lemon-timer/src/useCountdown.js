import './style.css';
import React from "react";

export default function useCountdown({ onDone }) {
    const [endTimestamp, setEndTimestamp] = React.useState(Date.now());
    const [timeLeft, setTimeLeft] = React.useState(0);
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
                setRunningTimer(false);
                if(onDone) {
                    onDone();
                }
            }
        }
        if(runningTimer) {
            rafId = requestAnimationFrame(step);
        }

        return () => {
            cancelAnimationFrame(rafId);
        }
    }, [runningTimer, endTimestamp]);

    function start(ms) {
        setTimeLeft(ms);
        setEndTimestamp(Date.now() + ms);
        setRunningTimer(true);
    }

    return { timeLeft, start };
}

export function displayTime(ms) {
    const totalSeconds = Math.floor(ms/1000);
    const remainingMs = Math.floor((ms - totalSeconds*1000)/10);
    const minutes = Math.floor(totalSeconds/60);
    const remainingSeconds = totalSeconds%60;

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}.${String(remainingMs).padStart(2, "0")}`;
}