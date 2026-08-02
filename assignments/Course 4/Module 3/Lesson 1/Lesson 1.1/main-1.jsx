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

// TODO: accept `value`, `onValueChange`, and `onSendMessage` props here
function ChatInput() {
  return (
    <section className="field-stack">
      {/* TODO: make this a controlled input - set value={value}, call onValueChange(event.target.value) on change, and also call onSendMessage when Enter is pressed */}
      <input aria-label="Message" placeholder="Write a message" />
      {/* TODO: call onSendMessage when this button is clicked */}
      <button>Send</button>
    </section>
  );
}

// TODO: accept a `messages` prop here
function ChatMessages() {
  // TODO: if messages is empty, show "No messages yet"; otherwise use messages.map(...) to render one <li> per message
  return (
    <ul className="message-list">
      <li>No messages yet</li>
    </ul>
  );
}

function App() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  // TODO: write a sendMessage function that adds inputValue.trim() to messages and then clears the input,
  //       then pass it as the onSendMessage prop below instead of the empty placeholder function
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Team Chat</h1>
      <ChatMessages messages={messages} />
      <ChatInput value={inputValue} onValueChange={setInputValue} onSendMessage={() => {}} />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
