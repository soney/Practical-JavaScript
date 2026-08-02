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

const teamMembers = [
  { id: 1, name: "Ada", department: "Engineering" },
  { id: 2, name: "Grace", department: "Design" },
  { id: 3, name: "Linus", department: "Engineering" },
  { id: 4, name: "Maya", department: "Design" },
];

const departments = ["Engineering", "Design"];

// TODO: accept `selectedDepartment` and `onSelectDepartment` props here
function DepartmentTabs() {
  return (
    <div className="button-row">
      {/* TODO: for each department button below, add an onClick handler that calls onSelectDepartment(department), and give the selected department the "active" class (others stay "secondary") */}
      {departments.map((department) => (
        <button className="secondary" key={department}>{department}</button>
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

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Team Directory</h1>
      <p className="status-line">Selected: {selectedDepartment}</p>
      {/* TODO: pass selectedDepartment and onSelectDepartment={setSelectedDepartment} to DepartmentTabs */}
      <DepartmentTabs />
      <MemberList members={teamMembers} selectedDepartment={selectedDepartment} />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
