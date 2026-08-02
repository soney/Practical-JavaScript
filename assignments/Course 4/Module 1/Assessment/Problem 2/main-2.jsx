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

// TODO: accept name and position props here, e.g. function GuestRow({ name, position })
function GuestRow() {
  return (
    <li>
      {/* TODO: show the position number in the chip, e.g. {position} */}
      <span className="chip">#</span>
      {/* TODO: show the guest's name, e.g. {name} */}
      Guest name
    </li>
  );
}

function GuestList() {
  // TODO: create the guests state starting with the two seed names, e.g.
  //   const [guests, setGuests] = React.useState(["Ada Lovelace", "Grace Hopper"]);
  // TODO: create the inputValue state starting with "", e.g.
  //   const [inputValue, setInputValue] = React.useState("");

  function addGuest() {
    // TODO: complete this function (see the problem description):
    // - const trimmedName = inputValue.trim();
    // - if trimmedName is empty, return without changing the list
    // - append it immutably (no .push()):
    //   setGuests((currentGuests) => [...currentGuests, trimmedName])
    // - then clear the input with setInputValue("")
  }

  function handleKeyDown(event) {
    // TODO: when event.key is "Enter", call addGuest()
  }

  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Guest List</h1>
      {/* TODO: show the live count, e.g. Guests going: {guests.length} */}
      <p className="subtle">Guests going: 0</p>
      <section className="field-stack">
        {/* TODO: make this a controlled input by adding value={inputValue},
            onChange={(event) => setInputValue(event.target.value)}, and
            onKeyDown={handleKeyDown} */}
        <input aria-label="New guest" />
        <div className="button-row">
          {/* TODO: on click, add the guest, e.g. onClick={addGuest} */}
          <button>Add guest</button>
          {/* TODO: on click, empty the list, e.g. onClick={() => setGuests([])} */}
          <button className="secondary">Clear all</button>
        </div>
      </section>
      {/* TODO: when there are no guests, show this message using &&, e.g.
          {guests.length === 0 && (
            <p className="empty-state">No guests yet. Add the first one above.</p>
          )} */}
      <ul className="message-list">
        {/* TODO: render one <GuestRow /> per guest using guests.map(...),
            passing name={guest}, position={index + 1}, and key={guest} */}
        <GuestRow />
      </ul>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<GuestList />);
