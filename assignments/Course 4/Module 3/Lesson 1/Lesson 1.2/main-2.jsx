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

// TODO: create PreferencesContext with React.createContext(null)
// TODO: create a PreferencesProvider component that holds theme ("light") and compact (false) state
//       and supplies { theme, compact, toggleTheme, toggleCompact } as the provider value

function Toolbar() {
  // TODO: read the shared preferences from context with React.useContext(PreferencesContext)
  return (
    <div className="toolbar">
      {/* TODO: call toggleTheme when this button is clicked */}
      <button>Toggle theme</button>
      {/* TODO: call toggleCompact when this button is clicked */}
      <button className="secondary">Toggle compact</button>
    </div>
  );
}

function PreviewPanel() {
  // TODO: read the shared preferences from context with React.useContext(PreferencesContext)
  // TODO: build a className that keeps "preview-panel" and adds the current theme (light or dark),
  //       plus "compact" when compact is on, and use it on the <section> below
  return (
    <section className="preview-panel light">
      <h2>Reading Preview</h2>
      {/* TODO: show the current theme (light or dark) here instead of the hard-coded "light" */}
      <p>Theme: light</p>
      {/* TODO: show the current layout ("compact" or "comfortable") here instead of the hard-coded "comfortable" */}
      <p>Layout: comfortable</p>
    </section>
  );
}

function App() {
  // TODO: wrap the <main> below in <PreferencesProvider> so Toolbar and PreviewPanel can read the context
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Reader Preferences</h1>
      <Toolbar />
      <PreviewPanel />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
