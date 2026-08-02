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

// This counter should go up by one every time the user clicks anywhere on the
// page, not just on a single button. A click anywhere on the page bubbles up to
// the window, so the counter listens for clicks on window from inside an effect.
function ClickCounter() {
  const [count, setCount] = React.useState(0);

  // TODO: Add a React.useEffect call (with an empty dependency array, []) that
  // wires up a page-wide click counter:
  //   1. Define a handleClick function that increases the count by one. Use the
  //      functional updater form, setCount((current) => current + 1), so each
  //      click reads the latest count.
  //   2. Register handleClick as a click listener on the window object, using
  //      window.addEventListener with the event name "click".
  //   3. Return a cleanup function from the effect that removes that same click
  //      listener with window.removeEventListener, so re-mounting the component
  //      never stacks up duplicate listeners.

  return (
    <div className="counter">
      <p className="counter-value">
        <span id="count">{count}</span>
      </p>
    </div>
  );
}

function App() {
  return (
    <main className="assignment-shell" id="app-ready">
      <section className="panel">
        <h1>Page Click Counter</h1>
        <p className="subtle">Click anywhere on the page to add to the tally.</p>
        <ClickCounter />
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
