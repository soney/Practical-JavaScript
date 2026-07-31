import React from 'react';

export default function App() {
    const [name, setName] = React.useState("");
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        console.log("DOC TITLE EFFECT");
        document.title = "Welcome, " + (name || "guest");
    }, [name]);

    React.useEffect(() => {
        console.log("DARK MODE EFFECT");
        document.title = "Welcome, " + (name || "guest");
        if(darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <label>
            <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)}></input>
            Dark Mode
        </label>
        <p>Hello {name || "guest"}</p>
    </div>;
}