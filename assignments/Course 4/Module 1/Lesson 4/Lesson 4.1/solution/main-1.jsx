// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function Counter() {
  // SOLUTION: hold the count in state so changes re-render
  const [count, setCount] = React.useState(0);

  function addOne() {
    // SOLUTION: increment through the setter
    setCount((current) => current + 1);
  }

  // SOLUTION: add a handler that decrements the count
  function subtractOne() {
    setCount((current) => current - 1);
  }

  // SOLUTION: add a handler that resets the count to zero
  function resetCount() {
    setCount(0);
  }

  // SOLUTION: wire the Subtract and Reset buttons to their handlers
  return (
    <section className="panel">
      <h1>Practice Counter</h1>
      <p className="counter-value">{count}</p>
      <div className="button-row">
        <button onClick={addOne}>Add</button>
        <button className="secondary" onClick={subtractOne}>Subtract</button>
        <button className="danger" onClick={resetCount}>Reset</button>
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
