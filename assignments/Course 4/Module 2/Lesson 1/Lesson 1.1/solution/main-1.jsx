// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function RefPractice() {
  // SOLUTION: create the refs - the input DOM node and the last submitted value
  const inputRef = React.useRef(null);
  const lastSubmittedRef = React.useRef("");
  const [submittedValue, setSubmittedValue] = React.useState("");
  const [submitCount, setSubmitCount] = React.useState(0);

  function focusInput() {
    // SOLUTION: focus the input through its ref
    inputRef.current.focus();
  }

  function saveValue() {
    // SOLUTION: save the input value into the ref, then mirror it into state
    lastSubmittedRef.current = inputRef.current.value;
    setSubmittedValue(lastSubmittedRef.current);
    setSubmitCount((current) => current + 1);
  }

  // SOLUTION: attach inputRef to the input
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Ref Practice</h1>
      <section className="field-stack">
        <input ref={inputRef} placeholder="Type a value" aria-label="Practice value" />
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
