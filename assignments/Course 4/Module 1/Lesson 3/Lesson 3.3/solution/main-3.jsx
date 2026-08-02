// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

function ConfirmButton({ itemId, onConfirm }) {
  // SOLUTION: pass a function so onConfirm runs on click, not during render
  return (
    <button className="danger" onClick={() => onConfirm(itemId)}>
      Confirm Archive
    </button>
  );
}

function App() {
  function archiveItem(itemId) {
    window.confirmedItem = itemId;
    const status = document.querySelector("#archive-status");
    if (status) {
      status.textContent = "Archived " + itemId;
      // Flip the banner from its neutral "pending" look to the green "done"
      // look so the click has a clearly visible effect (styles in index.html).
      status.classList.add("is-archived");
    }
  }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <section className="panel">
        <h1>Archive Request</h1>
        <p>Item ID: request-42</p>
        <ConfirmButton itemId="request-42" onConfirm={archiveItem} />
        <p id="archive-status" className="archive-status">Not archived yet.</p>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
