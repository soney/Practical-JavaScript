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
    // SOLUTION: use an updater so it is based on the latest score
    setScore((currentScore) => currentScore + 1);
  }

  function addTwo() {
    // SOLUTION: use updaters so the second increment sees the first
    setScore((currentScore) => currentScore + 1);
    setScore((currentScore) => currentScore + 1);
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
