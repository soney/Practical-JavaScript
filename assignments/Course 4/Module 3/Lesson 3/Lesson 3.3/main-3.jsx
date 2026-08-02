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

function DeployLog() {
  const [deploys, setDeploys] = React.useState(["Deploy #1", "Deploy #2"]);

  // This handler should add one entry each time you click "Record deploy", but
  // it has a bug. deploys.push(next) changes the existing array in place. React
  // decides whether to re-render by checking whether the value passed to
  // setDeploys is a NEW array; because push reuses the same array, React sees no
  // change and skips the re-render, so clicking the button appears to do nothing.
  function recordDeploy() {
    const next = "Deploy #" + (deploys.length + 1);
    // TODO: these two lines mutate the existing array, so the list never updates.
    // Replace them with a single setDeploys call that builds a NEW array from the
    // existing deploys plus next, for example: setDeploys([...deploys, next])
    deploys.push(next);
    setDeploys(deploys);
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
