// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

// The user object and the Greeting and Badge components are provided for you.
// Connect them through React context so they can read the user without props.

const user = { name: "Ada Lovelace", role: "Administrator" };

// TODO: (1) Create a context with React.createContext(null) and store it in UserContext.

function Greeting() {
  // TODO: (2) Read the user from context with React.useContext(UserContext).
  const contextUser = null;
  return <p className="greeting">Welcome, {contextUser ? contextUser.name : "?"}!</p>;
}

function Badge() {
  // TODO: (3) Read the user from context with React.useContext(UserContext).
  const contextUser = null;
  return <span className="badge">{contextUser ? contextUser.role : "?"}</span>;
}

function App() {
  // TODO: (4) Wrap the content below in <UserContext.Provider value={user}> ... </UserContext.Provider>.
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>User Profile</h1>
      <Greeting />
      <Badge />
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
