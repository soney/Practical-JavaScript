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

const LEVELS = ["Info", "Warning", "Error"];

function LogLevelPicker() {
  const [selectedLevel, setSelectedLevel] = React.useState("Info");
  const [activeLevel, setActiveLevel] = React.useState("Info");

  // This effect copies selectedLevel into activeLevel so the "Active level" line
  // below can show it. The effect should run again every time selectedLevel
  // changes, but right now the dependency array is empty, so it only runs once.
  // That is why clicking a different level leaves the "Active level" line stuck
  // on the first value while the "Selected" line updates.
  React.useEffect(() => {
    setActiveLevel(selectedLevel);
    // TODO: change the empty [] below to [selectedLevel] so the effect re-runs
    // whenever selectedLevel changes and the "Active level" line stays in sync
  }, []);

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
