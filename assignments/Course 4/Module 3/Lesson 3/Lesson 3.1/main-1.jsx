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

// This module-level counter goes up by 1 every time App runs its render.
// React.StrictMode intentionally renders components an extra time in
// development to help surface bugs, so wrapping <App /> in StrictMode makes
// this counter reach 2 instead of 1. That is the visible proof StrictMode is on.
let renderCount = 0;

function App() {
  renderCount = renderCount + 1;
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <section className="panel">
        <h1>Strict Mode Check</h1>
        <p>Development checks are ready.</p>
        <p className="status-line" data-testid="render-count">
          Render count (Strict Mode double-invokes): {renderCount}
        </p>
      </section>
    </main>
  );
}

// TODO: wrap <App /> in <React.StrictMode>...</React.StrictMode> inside this render call
ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
