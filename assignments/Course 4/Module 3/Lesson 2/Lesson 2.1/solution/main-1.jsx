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
  // SOLUTION: wrap in HashRouter, use NavLinks, and route each page through a Switch
  return (
    <HashRouter>
      <main className="assignment-shell" data-testid="app-ready">
        <h1>Single Page App</h1>
        <nav className="nav" aria-label="Pages">
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
          <NavLink to="/about" activeClassName="active">About</NavLink>
          <NavLink to="/resources" activeClassName="active">Resources</NavLink>
        </nav>
        <Switch>
          <Route exact path="/"><HomePage /></Route>
          <Route path="/about"><AboutPage /></Route>
          <Route path="/resources"><ResourcesPage /></Route>
        </Switch>
      </main>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
