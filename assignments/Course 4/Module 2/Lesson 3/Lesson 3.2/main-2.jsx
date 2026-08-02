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

const courses = [
  "React State",
  "useEffect Basics",
  "State Across Components",
  "Custom Hooks",
];

function CourseSearch() {
  const [searchText, setSearchText] = React.useState("");
  // TODO: replace this with a React.useMemo call (dependency array [searchText]) - return all courses when searchText is empty, otherwise courses.filter(...) matching course titles case-insensitively (lowercase both sides)
  const visibleCourses = courses;

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Course Search</h1>
      <section className="field-stack">
        <input
          aria-label="Search courses"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>
      <ul className="lesson-list">
        {visibleCourses.map((course) => (
          <li className="lesson-item" key={course}>{course}</li>
        ))}
      </ul>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<CourseSearch />);
