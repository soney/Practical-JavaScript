// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

// SOLUTION: accept the props and render name/role/status in place of the placeholders
function ProfileCard({ name, role, status }) {
  return (
    <article className="profile-card">
      <h2>{name}</h2>
      <p>{role}</p>
      <span className="pill">{status}</span>
    </article>
  );
}

function App() {
  // SOLUTION: pass each card its name/role/status props
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Project Team</h1>
      <section className="card-grid" aria-label="Team members">
        <ProfileCard name="Ada" role="Frontend engineer" status="Active" />
        <ProfileCard name="Grace" role="Accessibility reviewer" status="Reviewing" />
        <ProfileCard name="Linus" role="Release coordinator" status="Waiting" />
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
