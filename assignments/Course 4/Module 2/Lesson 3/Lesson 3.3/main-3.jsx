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

function useWindowWidth() {
  // TODO: create a width state with React.useState(window.innerWidth)
  // TODO: add a React.useEffect (empty dependency array []) that defines handleResize to setWidth(window.innerWidth), adds it as a "resize" listener on window, and returns a cleanup that removes that same "resize" listener
  // TODO: return the current width value (instead of 0)
  return 0;
}

function ResponsivePreview() {
  const width = useWindowWidth();
  const layout = width >= 700 ? "Desktop layout" : "Mobile layout";

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <section className="panel">
        <h1>Responsive Preview</h1>
        <p className="status-line" data-testid="layout">{layout}</p>
        <p>Window width: <span data-testid="width">{width}</span></p>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<ResponsivePreview />);
