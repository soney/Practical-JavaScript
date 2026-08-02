// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function useWindowWidth() {
  // SOLUTION: track the window width in state
  const [width, setWidth] = React.useState(window.innerWidth);

  // SOLUTION: update on window resize, removing the listener on cleanup
  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // SOLUTION: return the current width
  return width;
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
