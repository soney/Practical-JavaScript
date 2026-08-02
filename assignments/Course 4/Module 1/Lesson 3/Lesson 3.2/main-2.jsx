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

// Provided for you: showSubmittedNote displays the submitted note on the page.
// (For now it updates the page directly - you will learn the React way of
// showing data on screen, using state, in a later lesson.)
function showSubmittedNote(note) {
  window.lastSubmittedValue = note;
  const output = document.querySelector("#submitted-note");
  if (output) {
    output.textContent = note ? "You submitted: " + note : "";
  }
}

function handleKeyDown(event) {
  // TODO: when event.key is "Enter", call showSubmittedNote(event.target.value)
  // TODO: when event.key is "Escape", clear the input by setting event.target.value = ""
}

function QuickSubmit() {
  return (
    <section className="panel">
      <h1>Quick Submit</h1>
      {/* TODO: add onKeyDown={handleKeyDown} to this input (pass the function, do not call it) */}
      <input aria-label="Quick note" placeholder="Type a note and press Enter" />
      <p className="subtle">Use Enter to submit or Escape to clear.</p>
      <p id="submitted-note" className="subtle"></p>
    </section>
  );
}

function App() {
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <QuickSubmit />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
