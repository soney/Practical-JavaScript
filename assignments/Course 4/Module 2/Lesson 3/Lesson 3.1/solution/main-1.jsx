// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function useInput(initialValue) {
  // SOLUTION: package the controlled-input value, its change handler, and a reset
  const [value, setValue] = React.useState(initialValue);
  const onChange = (event) => setValue(event.target.value);
  const reset = () => setValue(initialValue);

  return { value, onChange, reset };
}

function GreetingCard() {
  // The input and Clear button below are already wired to this hook, so finishing
  // useInput above is all it takes to make the whole card work.
  const nameInput = useInput("");

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Greeting Card</h1>
      <section className="field-stack">
        <input
          value={nameInput.value}
          onChange={nameInput.onChange}
          aria-label="Display name"
          placeholder="Type your name"
        />
        <p>Preview: <span data-testid="greeting">{nameInput.value ? `Hello, ${nameInput.value}!` : "Hello, friend!"}</span></p>
        <button className="secondary" onClick={nameInput.reset}>Clear</button>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<GreetingCard />);
