// ===== YOUR TASK =====
// Edit this file to complete the assignment (see the problem description).
// The spots to change are marked with TODO comments below. Leave the rest as-is.
// =====================

// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function Stopwatch() {
  // TODO: create state with React.useState - elapsedSeconds (start 0) and running (start false)

  // TODO: add a React.useEffect - while running is true, start a setInterval that runs
  //       setElapsedSeconds((currentSeconds) => currentSeconds + 1) once every 1000ms;
  //       return a cleanup function that calls clearInterval; use [running] as the dependency array

  return (
    <main className="assignment-shell" id="app-ready">
      <section className="panel">
        <h1>Stopwatch</h1>

        {/* TODO: show the live elapsedSeconds value here instead of the hardcoded 0 */}
        <p className="counter-value" id="elapsed">0</p>

        <div className="button-row">
          {/* TODO: add onClick handlers - Start sets running to true, Pause sets running to
                    false, and Reset sets elapsedSeconds back to 0 and running to false */}
          <button>Start</button>
          <button className="secondary">Pause</button>
          <button className="secondary">Reset</button>
        </div>

        {/* TODO: show "Running" when running is true, otherwise "Paused" */}
        <p className="subtle">Paused</p>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<Stopwatch />);
