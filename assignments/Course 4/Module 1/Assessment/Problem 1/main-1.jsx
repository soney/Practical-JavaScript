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

const projects = [
  { id: "markup", title: "Markup Review", status: "ready", minutes: 20 },
  { id: "events", title: "Event Practice", status: "ready", minutes: 35 },
  { id: "state", title: "State Refactor", status: "blocked", minutes: 45 },
  { id: "lists", title: "List Rendering", status: "ready", minutes: 30 },
];

// TODO: (step 1) accept a project prop here, e.g. function ProjectCard({ project })
function ProjectCard() {
  return (
    <article className="project-card">
      {/* TODO: (step 2) show the project's title, e.g. {project.title} */}
      <h2>Project title</h2>
      {/* TODO: (step 2) show "Status: " then the project's status, e.g. Status: {project.status} */}
      <p>Status</p>
      {/* TODO: (step 2) show the minutes and the word minutes, e.g. {project.minutes} minutes */}
      <span className="pill">Minutes</span>
    </article>
  );
}

function App() {
  // TODO: (step 3) create state for the active filter.
  //   const [selectedStatus, setSelectedStatus] = React.useState("all");

  // TODO: (step 4) compute visibleProjects with an if statement.
  //   Declare it with let, then assign in each branch: when selectedStatus is
  //   "all", use every project; otherwise keep only the projects whose status
  //   matches selectedStatus:
  //   let visibleProjects;
  //   if (selectedStatus === "all") {
  //     visibleProjects = projects;
  //   } else {
  //     visibleProjects = projects.filter((project) => project.status === selectedStatus);
  //   }
  //   (A ternary also works -- see "Writing the conditional logic" in the problem description.)

  // TODO: (step 7) an if statement cannot go directly inside JSX {}, so write a
  //   helper that returns the class name for a button -- "active" for the
  //   selected filter, "secondary" for the rest:
  //   function buttonClass(status) {
  //     if (status === selectedStatus) {
  //       return "active";
  //     }
  //     return "secondary";
  //   }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Project Planner</h1>
      <div className="controls">
        {/*
          TODO: (steps 6 and 7) for each button, set selectedStatus on click AND
          set its className with the buttonClass helper so the current filter is
          highlighted. Example:
            <button className={buttonClass("all")} onClick={() => setSelectedStatus("all")}>
              All
            </button>
          Do the same for the Ready button ("ready") and the Blocked button ("blocked").
        */}
        <button>All</button>
        <button className="secondary">Ready</button>
        <button className="secondary">Blocked</button>
      </div>
      <section className="card-grid">
        {/* TODO: (step 5) render one <ProjectCard project={project} key={project.id} /> for each item using visibleProjects.map(...) */}
        <ProjectCard />
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
