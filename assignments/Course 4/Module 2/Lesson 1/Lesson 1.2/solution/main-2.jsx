// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function RSVPForm() {
  const [name, setName] = React.useState("");
  const [attendance, setAttendance] = React.useState("yes");
  const [needsMeal, setNeedsMeal] = React.useState(false);

  // A meal only applies when the guest is attending, so derive it from both
  // pieces of state and reuse it for the checkbox and the summary line below.
  const mealRequested = attendance === "yes" && needsMeal;

  // SOLUTION: each input is controlled (value/checked come from state, onChange
  // updates state) and the meal checkbox is disabled while not attending.
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Workshop RSVP</h1>
      <section className="field-stack">
        <label>
          Name
          <input
            aria-label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <div className="radio-row">
          <label>
            <input
              type="radio"
              name="attendance"
              value="yes"
              checked={attendance === "yes"}
              onChange={(event) => setAttendance(event.target.value)}
            />
            Attending
          </label>
          <label>
            <input
              type="radio"
              name="attendance"
              value="no"
              checked={attendance === "no"}
              onChange={(event) => setAttendance(event.target.value)}
            />
            Not attending
          </label>
        </div>
        <label>
          <input
            type="checkbox"
            aria-label="Meal needed"
            checked={mealRequested}
            disabled={attendance === "no"}
            onChange={(event) => setNeedsMeal(event.target.checked)}
          />
          Meal needed
        </label>
        <p className="status-line">
          {name || "Guest"}: {attendance === "yes" ? "attending" : "not attending"}.
          Meal: {mealRequested ? "yes" : "no"}.
        </p>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<RSVPForm />);
