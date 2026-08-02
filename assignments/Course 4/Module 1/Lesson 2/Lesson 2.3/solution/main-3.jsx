// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

// SOLUTION: accept the eventInfo prop
function EventCard({ eventInfo }) {
  // SOLUTION: build the spots text with && and || instead of a ternary.
  // eventInfo.spotsLeft is a number, so 0 is falsy and any positive count is truthy.
  // && builds the "N spots left" text only when spotsLeft is not 0 (otherwise it
  // short-circuits to 0), and || then falls back to "No spots left" for that 0 case.
  const spotsCount = eventInfo.spotsLeft && `${eventInfo.spotsLeft} spots left`;
  const spotsText = spotsCount || "No spots left";

  // SOLUTION: show name and spots text, use && to conditionally show the free-admission note, and list speakers
  return (
    <section className="panel">
      <h1>{eventInfo.name}</h1>
      <p className="status-line">{spotsText}</p>
      {eventInfo.isFree && <p>Free admission</p>}
      <ul className="message-list" aria-label="Speakers">
        {eventInfo.speakers.map((speaker) => (
          <li key={speaker}>{speaker}</li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <EventCard
        eventInfo={{
          name: "Intro to Coding Workshop",
          spotsLeft: 3,
          isFree: true,
          speakers: ["Ada Lovelace", "Grace Hopper"],
        }}
      />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
