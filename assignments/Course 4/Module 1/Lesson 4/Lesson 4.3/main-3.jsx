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

function ScoreKeeper() {
  const [score, setScore] = React.useState(0);

  function addOne() {
    // TODO: use an updater function instead of reading score directly: setScore((currentScore) => currentScore + 1);
    setScore(score + 1);
  }

  function addTwo() {
    // TODO: use an updater function for BOTH calls so the second sees the first update: setScore((currentScore) => currentScore + 1);
    setScore(score + 1);
    setScore(score + 1);
  }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <section className="panel">
        <h1>Score Keeper</h1>
        <p className="counter-value">{score}</p>
        <div className="button-row">
          <button onClick={addOne}>Add one</button>
          <button className="secondary" onClick={addTwo}>Add two</button>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<ScoreKeeper />);
