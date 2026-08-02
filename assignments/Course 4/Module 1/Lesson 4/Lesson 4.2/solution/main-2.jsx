// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function ReadingList() {
  const [items, setItems] = React.useState(["Intro to React", "Props practice"]);
  const [inputValue, setInputValue] = React.useState("");

  function addItem() {
    // SOLUTION: ignore empty input, append the trimmed value immutably, then clear the field
    const trimmedValue = inputValue.trim();
    if (trimmedValue.length === 0) {
      return;
    }

    setItems((currentItems) => [...currentItems, trimmedValue]);
    setInputValue("");
  }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Reading List</h1>
      <section className="field-stack">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          aria-label="New reading"
        />
        <button onClick={addItem}>Add reading</button>
      </section>
      <ul className="lesson-list">
        {items.map((item) => (
          <li className="lesson-item" key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<ReadingList />);
