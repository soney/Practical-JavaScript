// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function CountdownTimer() {
  const [seconds, setSeconds] = React.useState(3);
  const [running, setRunning] = React.useState(false);

  // SOLUTION: tick down once a second while running, clearing the interval on cleanup
  React.useEffect(() => {
    if (!running || seconds === 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [running, seconds]);

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <section className="panel">
        <h1>Countdown Timer</h1>
        <p className="counter-value" data-testid="seconds">{seconds}</p>
        <div className="button-row">
          <button onClick={() => setRunning(true)}>Start</button>
          <button className="secondary" onClick={() => {
            setSeconds(3);
            setRunning(false);
          }}>Reset</button>
        </div>
        <p className="subtle">{running ? "Running" : "Paused"}</p>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<CountdownTimer />);
