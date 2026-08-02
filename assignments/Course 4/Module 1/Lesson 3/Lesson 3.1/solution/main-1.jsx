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
  // SOLUTION: wire each button's onClick to the matching handler (pass, do not call)
  return (
    <section className="panel">
      <h1>Post Actions</h1>
      <div className="button-row">
        <button onClick={saveDraft}>Save draft</button>
        <button className="secondary" onClick={publishPost}>Publish</button>
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
