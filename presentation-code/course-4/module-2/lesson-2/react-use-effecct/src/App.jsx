import React from 'react';

export default function App() {
    const [clickCount, setClickCount] = React.useState(0);
    React.useEffect(() => {
        document.title = "Clicked " + clickCount + " times";
    });

    function clickCallback() {
        setClickCount(clickCount + 1);
    }

    return <div>
        <button onClick={clickCallback}>You clicked {clickCount} time(s)</button>
    </div>;
}