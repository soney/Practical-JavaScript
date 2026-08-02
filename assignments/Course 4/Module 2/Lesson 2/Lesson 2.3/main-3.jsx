// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function loadProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Ada Lovelace",
        role: "Mathematical collaborator",
      });
    }, 100);
  });
}

// ===== YOUR TASK =====
// Edit this file to complete the assignment (see the problem description).
// The spots to change are marked with TODO comments below. Leave the rest as-is.
// =====================
function ProfileLoader() {
  const [status, setStatus] = React.useState("Profile not loaded.");
  const [profile, setProfile] = React.useState(null);

  // TODO: add a React.useEffect (empty dependency array []) that sets status to "Loading profile...", calls loadProfile(), and when it resolves stores the result with setProfile and sets status to "Profile loaded."; return a cleanup that guards against setting state after cleanup (e.g. an ignore flag). Do not make the effect callback itself async.
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <section className="panel">
        <h1>Profile Loader</h1>
        <p className="status-line">{status}</p>
        {profile && (
          <article className="profile-card">
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
          </article>
        )}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<ProfileLoader />);
