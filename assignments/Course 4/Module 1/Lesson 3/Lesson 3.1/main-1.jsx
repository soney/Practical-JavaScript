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

function saveDraft() {
  window.lastAction = "saved";
}

function publishPost() {
  window.lastAction = "published";
}

function ActionButtons() {
  return (
    <section className="panel">
      <h1>Post Actions</h1>
      <div className="button-row">
        {/* TODO: add onClick={saveDraft} to this button (pass the function, do not call it) */}
        <button>Save draft</button>
        {/* TODO: add onClick={publishPost} to this button (pass the function, do not call it) */}
        <button className="secondary">Publish</button>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <ActionButtons />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
