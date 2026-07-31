import React from 'react';

export default function App() {
    const [value, setValue] = React.useState("");
    console.log("re-render");
    console.log(value);

    function clickCallback() {
        console.log("SEND", value);
    }

    return <div>
        <input value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button onClick={clickCallback}>Send</button>
    </div>;
}