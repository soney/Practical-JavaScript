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

// TODO: accept an eventInfo prop, e.g. function EventCard({ eventInfo })
function EventCard() {
  // TODO: build the spots text using && and || (no ternary). eventInfo.spotsLeft is a
  // number, so 0 is falsy. Use && to make the "N spots left" text only when spotsLeft
  // is not 0 (e.g. eventInfo.spotsLeft && `${eventInfo.spotsLeft} spots left`), then use
  // || to fall back to "No spots left" for the 0 case (e.g. ... || "No spots left").
  return (
    <section className="panel">
      {/* TODO: show the eventInfo name, e.g. {eventInfo.name} */}
      <h1>Event</h1>
      {/* TODO: show the spots text you built above (e.g. "3 spots left" or "No spots left") */}
      <p className="status-line">Spots status</p>
      {/* TODO: only when eventInfo.isFree is true, show <p>Free admission</p> (e.g. eventInfo.isFree && ...) */}
      <p>Admission</p>
      <ul className="message-list">
        {/* TODO: use eventInfo.speakers.map((speaker) => ...) to render one <li> per speaker; add key={speaker} */}
        {/* <li>Speaker</li> */}
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
