// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

const LEVELS = ["Info", "Warning", "Error"];

function LogLevelPicker() {
  const [selectedLevel, setSelectedLevel] = React.useState("Info");
  const [activeLevel, setActiveLevel] = React.useState("Info");

  // This effect copies selectedLevel into activeLevel so the "Active level" line
  // below can show it.
  React.useEffect(() => {
    setActiveLevel(selectedLevel);
    // SOLUTION: list selectedLevel so the effect re-runs when it changes and the
    // "Active level" line stays in sync with the "Selected" line
  }, [selectedLevel]);

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Log Level Picker</h1>
      <div className="button-row">
        {LEVELS.map((level) => (
          <button
            className={selectedLevel === level ? "active" : "secondary"}
            key={level}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>
      <p className="status-line">Selected: {selectedLevel}</p>
      <p className={`status-line active-level level-${activeLevel.toLowerCase()}`} data-testid="active-line">
        Active level (updated by effect): <span className="level-name">{activeLevel}</span>
      </p>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<LogLevelPicker />);
