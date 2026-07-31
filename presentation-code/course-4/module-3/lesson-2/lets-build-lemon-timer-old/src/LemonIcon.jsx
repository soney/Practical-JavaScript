import React from "react";

/**
 * A single lemon emoji. When `blinking` is true it fades in and out so the user
 * can tell which session is currently in progress.
 *
 * This is a second, smaller example of the same useEffect pattern as the
 * countdown: start an interval, and return a cleanup function that stops it.
 * Notice that the effect's behavior depends on the `blinking` prop, so
 * `blinking` is in the dependency array.
 */
function LemonIcon({ blinking }) {
  const [solid, setSolid] = React.useState(true);

  React.useEffect(() => {
    // If we're not blinking there is no interval to start, so there is also
    // nothing to clean up.
    if (!blinking) {
      return;
    }

    const intervalId = setInterval(() => {
      setSolid((s) => !s); // toggle the lemon on/off every half second
    }, 500);

    return () => clearInterval(intervalId);
  }, [blinking]);

  return (
    <span className="lemon" style={{ opacity: blinking && !solid ? 0.25 : 1 }}>
      🍋
    </span>
  );
}

export default LemonIcon;
