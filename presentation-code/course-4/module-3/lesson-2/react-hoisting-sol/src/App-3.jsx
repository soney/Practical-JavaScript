import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>

      {page === "home" &&
          <div>
            <title>Home Page</title>
            <h1>Home Page</h1>
            <p>Welcome to the site!</p>
          </div>
          }
      {page === "about" &&
          <div>
            <title>About Page</title>
            <h1>About Page</h1>
            <p>This is the about page.</p>
          </div>
          }

    </div>
  );
}
