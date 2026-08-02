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

function RSVPForm() {
  const [name, setName] = React.useState("");
  const [attendance, setAttendance] = React.useState("yes");
  const [needsMeal, setNeedsMeal] = React.useState(false);

  // A meal only applies when the guest is attending. This derived value is
  // already written for you -- use it for the checkbox and the summary line.
  const mealRequested = attendance === "yes" && needsMeal;

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Workshop RSVP</h1>
      <section className="field-stack">
        <label>
          Name
          {/* TODO: make this a controlled input - add value={name} and onChange={(event) => setName(event.target.value)} */}
          <input aria-label="Name" />
        </label>
        <div className="radio-row">
          <label>
            {/* TODO: add checked={attendance === "yes"} and onChange={(event) => setAttendance(event.target.value)} */}
            <input type="radio" name="attendance" value="yes" />
            Attending
          </label>
          <label>
            {/* TODO: add checked={attendance === "no"} and onChange={(event) => setAttendance(event.target.value)} */}
            <input type="radio" name="attendance" value="no" />
            Not attending
          </label>
        </div>
        <label>
          {/* TODO: add checked={mealRequested}, disabled={attendance === "no"}, and onChange={(event) => setNeedsMeal(event.target.checked)} */}
          <input type="checkbox" aria-label="Meal needed" />
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
