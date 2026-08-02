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

// TODO: accept props here, e.g. function ProfileCard({ name, role, status })
function ProfileCard() {
  return (
    <article className="profile-card">
      {/* TODO: show the name prop, e.g. {name} */}
      <h2>Name</h2>
      {/* TODO: show the role prop, e.g. {role} */}
      <p>Role</p>
      {/* TODO: show the status prop, e.g. {status} */}
      <span className="pill">Status</span>
    </article>
  );
}

function App() {
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Project Team</h1>
      <section className="card-grid" aria-label="Team members">
        {/* TODO: pass props to render Ada, Frontend engineer, Active */}
        <ProfileCard />
        {/* TODO: pass props to render Grace, Accessibility reviewer, Reviewing */}
        <ProfileCard />
        {/* TODO: pass props to render Linus, Release coordinator, Waiting */}
        <ProfileCard />
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
