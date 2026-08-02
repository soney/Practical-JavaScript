// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

const teamMembers = [
  { id: 1, name: "Ada", department: "Engineering" },
  { id: 2, name: "Grace", department: "Design" },
  { id: 3, name: "Linus", department: "Engineering" },
  { id: 4, name: "Maya", department: "Design" },
];

const departments = ["Engineering", "Design"];

// SOLUTION: accept the selected department and the select callback
function DepartmentTabs({ selectedDepartment, onSelectDepartment }) {
  // SOLUTION: mark the active tab and call onSelectDepartment on click
  return (
    <div className="button-row">
      {departments.map((department) => (
        <button
          className={selectedDepartment === department ? "active" : "secondary"}
          key={department}
          onClick={() => onSelectDepartment(department)}
        >
          {department}
        </button>
      ))}
    </div>
  );
}

function MemberList({ members, selectedDepartment }) {
  const visibleMembers = members.filter((member) => member.department === selectedDepartment);

  return (
    <ul className="lesson-list">
      {visibleMembers.map((member) => (
        <li className="lesson-item" key={member.id}>{member.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const [selectedDepartment, setSelectedDepartment] = React.useState("Engineering");

  // SOLUTION: pass the selected department and setter to DepartmentTabs
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Team Directory</h1>
      <p className="status-line">Selected: {selectedDepartment}</p>
      <DepartmentTabs
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
      />
      <MemberList members={teamMembers} selectedDepartment={selectedDepartment} />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
