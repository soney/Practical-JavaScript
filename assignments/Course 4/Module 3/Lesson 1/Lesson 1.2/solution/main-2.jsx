// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

// SOLUTION: create the context that will carry the preferences
const PreferencesContext = React.createContext(null);

// SOLUTION: provider holds theme/compact state and supplies them plus the togglers
function PreferencesProvider({ children }) {
  const [theme, setTheme] = React.useState("light");
  const [compact, setCompact] = React.useState(false);

  const preferences = {
    theme,
    compact,
    toggleTheme: () => setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light"),
    toggleCompact: () => setCompact((currentCompact) => !currentCompact),
  };

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

function Toolbar() {
  // SOLUTION: read the shared preferences from context
  const preferences = React.useContext(PreferencesContext);

  // SOLUTION: wire the buttons to the togglers
  return (
    <div className="toolbar">
      <button onClick={preferences.toggleTheme}>Toggle theme</button>
      <button className="secondary" onClick={preferences.toggleCompact}>Toggle compact</button>
    </div>
  );
}

function PreviewPanel() {
  // SOLUTION: read the shared preferences from context
  const preferences = React.useContext(PreferencesContext);
  // SOLUTION: build the className from the current theme and compact flag
  const className = `preview-panel ${preferences.theme} ${preferences.compact ? "compact" : ""}`;

  // SOLUTION: show the live theme and layout
  return (
    <section className={className}>
      <h2>Reading Preview</h2>
      <p>Theme: {preferences.theme}</p>
      <p>Layout: {preferences.compact ? "compact" : "comfortable"}</p>
    </section>
  );
}

function App() {
  // SOLUTION: wrap the app in the provider so Toolbar and PreviewPanel can read context
  return (
    <PreferencesProvider>
      <main className="assignment-shell" data-testid="app-ready">
        <h1>Reader Preferences</h1>
        <Toolbar />
        <PreviewPanel />
      </main>
    </PreferencesProvider>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
