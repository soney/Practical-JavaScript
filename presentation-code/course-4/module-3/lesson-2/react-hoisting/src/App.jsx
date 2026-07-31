import React from "react";
import Navbar from './Navbar';

export default function App() {
  const [page, setPage] = React.useState("home");
  return <div>
    <Navbar />
    <div>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>
    </div>
    { page === "home" &&
      <div>
        <title>Home Page</title>
        <h1>Home Page</h1>
        <p>Welcome to my site!</p>
      </div>
    }
    { page === "about" &&
      <div>
        <title>My About Page</title>
        <h1>About Page</h1>
        <p>This is the "about" page</p>
      </div>
    }
  </div>;
}