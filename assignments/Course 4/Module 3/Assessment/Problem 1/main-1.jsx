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

const lessons = [
  { id: "props", title: "Props", module: "Components" },
  { id: "state", title: "State", module: "Components" },
  { id: "refs", title: "Refs", module: "Hooks" },
  { id: "effects", title: "useEffect Dependencies", module: "Hooks" },
  { id: "context", title: "Context", module: "Patterns" },
];

function SearchBox({ query, onQueryChange }) {
  // TODO: make this a controlled input.
  // Set value={query} and call onQueryChange(event.target.value) in onChange.
  return <input aria-label="Search lessons" placeholder="Search lessons" />;
}

function LessonResults({ lessons, query }) {
  // TODO: filter lessons whose title or module contains query (ignore capitalization),
  // render "No matching lessons." when none match, otherwise render each matching lesson
  // as an <li className="lesson-item"> showing the lesson's title and module.
  return (
    <ul className="results-list">
      {/* TODO: replace this placeholder <li> with visibleLessons.map(...) - one <li className="lesson-item" key={lesson.id}> per match, showing the lesson's title and module */}
      <li className="lesson-item">Lesson result</li>
    </ul>
  );
}

function App() {
  const [query, setQuery] = React.useState("");

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>React Lesson Browser</h1>
      <SearchBox query={query} onQueryChange={setQuery} />
      <LessonResults lessons={lessons} query={query} />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
