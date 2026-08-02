// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function Preferences() {
  const [name, setName] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(false);

  // SOLUTION: toggle the dark-mode body class, cleaning it up on unmount
  React.useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Welcome, {name || "guest"}</h1>
      <section className="field-stack">
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} aria-label="Name" />
        </label>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(event) => setDarkMode(event.target.checked)}
            aria-label="Dark mode"
          />
          Dark mode
        </label>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<Preferences />);
