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
  // SOLUTION: memoize the case-insensitive filter over the search text
  const visibleCourses = React.useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (normalizedSearch.length === 0) {
      return courses;
    }

    return courses.filter((course) => (
      course.toLowerCase().includes(normalizedSearch)
    ));
  }, [searchText]);

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
