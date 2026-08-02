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

function RefPractice() {
  // TODO: create inputRef with React.useRef(null) and lastSubmittedRef with React.useRef("")
  const [submittedValue, setSubmittedValue] = React.useState("");
  const [submitCount, setSubmitCount] = React.useState(0);

  function focusInput() {
    // TODO: call inputRef.current.focus() to move focus into the input
  }

  function saveValue() {
    // TODO: store inputRef.current.value in lastSubmittedRef.current, then pass that saved value to setSubmittedValue (currently it saves "")
    setSubmittedValue("");
    setSubmitCount(submitCount + 1);
  }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Ref Practice</h1>
      <section className="field-stack">
        {/* TODO: attach the ref - add ref={inputRef} to this input */}
        <input placeholder="Type a value" aria-label="Practice value" />
        <div className="button-row">
          <button onClick={focusInput}>Focus input</button>
          <button className="secondary" onClick={saveValue}>Save value</button>
        </div>
        <p className="status-line">Last submitted: {submittedValue || "none"}</p>
        <p>Submit count: <span data-testid="submit-count">{submitCount}</span></p>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<RefPractice />);
