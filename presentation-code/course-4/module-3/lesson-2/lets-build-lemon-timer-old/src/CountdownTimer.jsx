import React from "react";

/**
 * Counts down to `target` (a timestamp in milliseconds, like the ones Date.now()
 * returns) and calls `onDone` once it reaches zero.
 *
 * The interesting part is the useEffect: starting a `setInterval` is a *side
 * effect* (it reaches outside React to schedule repeating work), so it belongs
 * in an effect — never in the body of the component.
 */
function CountdownTimer({ target, onDone }) {
  // How many milliseconds are left right now. We recompute this from `target`
  // on every tick instead of counting down a number ourselves, so the timer
  // stays accurate even if the browser delays our interval.
  const [remaining, setRemaining] = React.useState(target - Date.now());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const timeLeft = target - Date.now();
      setRemaining(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        onDone();
      }
    }, 1000);

    // The cleanup function runs when this component unmounts, and also right
    // before the effect runs again (i.e. when `target` or `onDone` change).
    // Without it, old intervals would keep firing forever.
    return () => clearInterval(intervalId);
  }, [target, onDone]);

  return <span className="countdown">{millisecondsToHumanString(remaining)}</span>;
}

/**
 * Convert a number of milliseconds into an "MM:SS" string.
 *
 * @param {number} ms milliseconds remaining
 * @returns {string} e.g. 90000 -> "01:30"
 */
export function millisecondsToHumanString(ms) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default CountdownTimer;
