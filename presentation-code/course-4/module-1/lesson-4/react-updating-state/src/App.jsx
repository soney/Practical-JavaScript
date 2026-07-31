import React from 'react';

export default function App() {
    const [clickCount, setClickCount] = React.useState(0);

    console.log("Re-rendered App");
    console.log(clickCount);

    function clickCallback() {
        setClickCount((c) => c + 1);
        setClickCount((c) => c + 1);
        setClickCount((c) => c + 1);
    }

    return <div>
        <button onClick={clickCallback}>You clicked {clickCount} time(s)</button>
    </div>;
}