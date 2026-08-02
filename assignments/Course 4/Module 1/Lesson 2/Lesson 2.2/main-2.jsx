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
  { id: "components", title: "React Components", required: true },
  { id: "props", title: "Props", required: true },
  { id: "lists", title: "Rendering Lists", required: false },
  { id: "keys", title: "Keys", required: false },
];

// TODO: accept a lessons prop, e.g. function LessonList({ lessons })
function LessonList() {
  // TODO: if lessons is empty (lessons.length === 0), return <p className="empty-state">No lessons available.</p>
  return (
    <ul className="lesson-list">
      {/* TODO: use lessons.map((lesson) => (...)) to render one <li> per lesson; add key={lesson.id} to each <li> */}
      <li className="lesson-item">
        {/* TODO: show the lesson title, e.g. {lesson.title} */}
        <h2>Lesson title</h2>
        {/* TODO: show "Required" when lesson.required is true, otherwise "Optional" */}
        <span className="pill">Type</span>
      </li>
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
