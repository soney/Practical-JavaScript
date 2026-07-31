import React from 'react';

export default function App() {
    const [clickCount, setClickCount] = React.useState(0);
    const buttonRef = React.useRef(null);
    const inputRef = React.useRef(null);

    function clickCallback() {
        setClickCount((c) => c + 1);
        console.log(buttonRef.current);
        console.log(inputRef.current)
    }

    return <div>
        <input ref={inputRef}></input>
        <button ref={buttonRef} onClick={clickCallback}>You clicked {clickCount} time(s)</button>
    </div>;
}