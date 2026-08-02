// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function DeployLog() {
  const [deploys, setDeploys] = React.useState(["Deploy #1", "Deploy #2"]);

  function recordDeploy() {
    const next = "Deploy #" + (deploys.length + 1);
    // SOLUTION: build a NEW array with the spread syntax ([...deploys, next])
    // rather than mutating the existing array in place. Mutating it would keep
    // the same array reference, so React would skip the re-render. A new array
    // is a changed value, so React re-renders and the new entry appears.
    setDeploys([...deploys, next]);
  }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <section className="panel">
        <h1>Deploy Log</h1>
        <p className="subtle">Each deploy is added to the list below.</p>
        <ul className="lesson-list" aria-label="Recorded deploys">
          {deploys.map((deploy, index) => (
            <li className="lesson-item" key={`${deploy}-${index}`}>{deploy}</li>
          ))}
        </ul>
        <div className="button-row">
          <button onClick={recordDeploy}>Record deploy</button>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<DeployLog />);
