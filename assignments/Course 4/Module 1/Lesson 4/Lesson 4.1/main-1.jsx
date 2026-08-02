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

function Counter() {
  // TODO: replace this with state so React re-renders on change: const [count, setCount] = React.useState(0);
  let count = 0;

  function addOne() {
    // TODO: use the setter to increase the count, e.g. setCount((current) => current + 1);
    count = count + 1;
  }

  return (
    <section className="panel">
      <h1>Practice Counter</h1>
      <p className="counter-value">{count}</p>
      <div className="button-row">
        <button onClick={addOne}>Add</button>
        {/* TODO: add an onClick that decreases the count by 1 (call setCount, e.g. a subtractOne handler) */}
        <button className="secondary">Subtract</button>
        {/* TODO: add an onClick that resets the count to 0 (call setCount, e.g. a resetCount handler) */}
        <button className="danger">Reset</button>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <Counter />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
