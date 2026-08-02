// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

const lessons = [
  { id: "components", title: "React Components", required: true },
  { id: "props", title: "Props", required: true },
  { id: "lists", title: "Rendering Lists", required: false },
  { id: "keys", title: "Keys", required: false },
];

// SOLUTION: accept the lessons prop
function LessonList({ lessons }) {
  // SOLUTION: show an empty state when there are no lessons
  if (lessons.length === 0) {
    return <p className="empty-state">No lessons available.</p>;
  }

  // SOLUTION: map each lesson to a keyed <li> showing its title and Required/Optional
  return (
    <ul className="lesson-list">
      {lessons.map((lesson) => (
        <li className={`lesson-item ${lesson.required ? "required" : "optional"}`} key={lesson.id}>
          <h2>{lesson.title}</h2>
          <span className="pill">{lesson.required ? "Required" : "Optional"}</span>
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>React Lesson Plan</h1>
      <LessonList lessons={lessons} />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
