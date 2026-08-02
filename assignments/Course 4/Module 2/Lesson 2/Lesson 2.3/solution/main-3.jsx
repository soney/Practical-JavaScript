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

function ProfileLoader() {
  const [status, setStatus] = React.useState("Profile not loaded.");
  const [profile, setProfile] = React.useState(null);

  // SOLUTION: load the profile once on mount, ignoring the result if unmounted
  React.useEffect(() => {
    let ignore = false;

    setStatus("Loading profile...");
    loadProfile().then((loadedProfile) => {
      if (!ignore) {
        setProfile(loadedProfile);
        setStatus("Profile loaded.");
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

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
