// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

const initialTasks = [
  { id: 1, text: "Review hooks", done: false },
  { id: 2, text: "Practice reducers", done: false },
];

function taskReducer(state, action) {
  if (action.type === "add") {
    // ===== SOLUTION (the one case you write) =====
    // Copy the current tasks with spread syntax so state is not mutated, then
    // append the new task built from the data the action carries.
    return [...state, { id: action.id, text: action.text, done: false }];
    // ===== END SOLUTION =====
  }

  // Provided for you: mark one task done. state.map builds a NEW array, copying
  // every task unchanged except the one whose id matches -- that one is replaced
  // by a copy with done set to true.
  if (action.type === "complete") {
    return state.map((task) =>
      task.id === action.id ? { ...task, done: true } : task
    );
  }

  // Provided for you: drop finished tasks. state.filter builds a NEW array that
  // keeps only the tasks whose done is still false.
  if (action.type === "clear-completed") {
    return state.filter((task) => !task.done);
  }

  // Any other action type: return the current state unchanged.
  return state;
}

function TaskBoard() {
  const [tasks, dispatch] = React.useReducer(taskReducer, initialTasks);
  // Provided for you: the text input is controlled by this state, so it already
  // starts with a default value filled in.
  const [draft, setDraft] = React.useState("Read useReducer notes");

  // Provided for you: read the input's current text, choose an id larger than any
  // existing one, and dispatch an "add" action that carries that data to the
  // reducer. Your job is to handle that action above.
  function addTask() {
    const text = draft.trim();
    if (text === "") return;
    const nextId = Math.max(0, ...tasks.map((task) => task.id)) + 1;
    dispatch({ type: "add", id: nextId, text: text });
  }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Reducer Tasks</h1>
      <div className="button-row">
        <input
          aria-label="New task text"
          style={{ flex: "1 1 200px", width: "auto" }}
          value={draft}
          onChange={(changeEvent) => setDraft(changeEvent.target.value)}
        />
        <button onClick={addTask}>Add task</button>
        <button
          className="danger"
          onClick={() => dispatch({ type: "clear-completed" })}
        >
          Clear completed
        </button>
      </div>
      <p className="subtle">Click a task to mark it complete.</p>
      <ul className="lesson-list">
        {tasks.map((task) => (
          <li
            className="lesson-item"
            key={task.id}
            style={{
              cursor: "pointer",
              textDecoration: task.done ? "line-through" : "none",
            }}
            onClick={() => dispatch({ type: "complete", id: task.id })}
          >
            {task.text} - {task.done ? "done" : "open"}
          </li>
        ))}
      </ul>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<TaskBoard />);
