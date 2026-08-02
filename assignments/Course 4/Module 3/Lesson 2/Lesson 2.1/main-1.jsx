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

// The router pieces come from react-router-dom, which index.html loads as a
// global (window.ReactRouterDOM) from a <script> tag. In a project with a bundler
// you would import them instead:
//   import { HashRouter, Switch, Route, NavLink } from "react-router-dom";
// There is no build step here, so we destructure them off the global instead of
// importing. This line is provided for you.
const { HashRouter, Switch, Route, NavLink } = ReactRouterDOM;

function HomePage() {
  return <section className="panel route-panel"><h2>Home</h2><p>Welcome home.</p></section>;
}

function AboutPage() {
  return <section className="panel route-panel"><h2>About</h2><p>About this app.</p></section>;
}

function ResourcesPage() {
  return <section className="panel route-panel"><h2>Resources</h2><p>Useful links.</p></section>;
}

function App() {
  // TODO: Wrap the app in a HashRouter.
  // TODO: Turn the three links into NavLink elements that point at "/", "/about", and "/resources".
  // TODO: Add a Switch with a Route for each page so the panel matches the current URL.
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Single Page App</h1>
      <nav className="nav" aria-label="Pages">
        {/* TODO: replace each <a> with a <NavLink to="..." activeClassName="active"> - the paths are "/", "/about", "/resources"; add exact to the "/" link */}
        <a>Home</a>
        <a>About</a>
        <a>Resources</a>
      </nav>
      {/* TODO: wrap the pages in a <Switch> with a <Route> per path: "/" with exact renders HomePage, "/about" renders AboutPage, "/resources" renders ResourcesPage */}
      <HomePage />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
