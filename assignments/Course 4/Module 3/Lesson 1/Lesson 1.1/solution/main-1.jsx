// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

// SOLUTION: accept the value and the two callback props
function ChatInput({ value, onValueChange, onSendMessage }) {
  // SOLUTION: also send when Enter is pressed
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSendMessage();
    }
  }

  // SOLUTION: bind value/onChange, wire onKeyDown, and send on button click
  return (
    <section className="field-stack">
      <input
        aria-label="Message"
        placeholder="Write a message"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSendMessage}>Send</button>
    </section>
  );
}

// SOLUTION: accept the messages prop
function ChatMessages({ messages }) {
  // SOLUTION: show an empty state when there are no messages
  if (messages.length === 0) {
    return <p className="empty-state">No messages yet</p>;
  }

  // SOLUTION: render one item per message
  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <li key={`${message}-${index}`}>{message}</li>
      ))}
    </ul>
  );
}

function App() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  // SOLUTION: add the trimmed message to the list and clear the input
  function sendMessage() {
    if (inputValue.trim() === "") return;
    setMessages((currentMessages) => [...currentMessages, inputValue.trim()]);
    setInputValue("");
  }

  // SOLUTION: pass sendMessage to ChatInput as onSendMessage
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>Team Chat</h1>
      <ChatMessages messages={messages} />
      <ChatInput value={inputValue} onValueChange={setInputValue} onSendMessage={sendMessage} />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
