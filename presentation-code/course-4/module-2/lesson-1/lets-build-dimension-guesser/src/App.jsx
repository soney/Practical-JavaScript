import './style.css';
import React from "react";

export default function App() {
    // red, green, blue 0, 255
    const [targetRed, setTargetRed] = React.useState(randomBetween0and255());
    const [targetGreen, setTargetGreen] = React.useState(randomBetween0and255());
    const [targetBlue, setTargetBlue] = React.useState(randomBetween0and255());

    const [userRed, setUserRed] = React.useState(randomBetween0and255());
    const [userGreen, setUserGreen] = React.useState(randomBetween0and255());
    const [userBlue, setUserBlue] = React.useState(randomBetween0and255());

    const [showUserColor, setShowUserColor] = React.useState(false);

    function guessColor() {
        setShowUserColor(true);
    }
    function nextRound() {
        setShowUserColor(false);
        setTargetRed(randomBetween0and255());
        setTargetGreen(randomBetween0and255());
        setTargetBlue(randomBetween0and255());
    }

    return <>
        <div id="target-color" style={{
            backgroundColor: `rgb(${targetRed}, ${targetGreen}, ${targetBlue})`
        }}></div>
        {showUserColor &&
            <>
            <div id="user-color" style={{
                backgroundColor: `rgb(${userRed}, ${userGreen}, ${userBlue})`
            }}></div>
            <button onClick={nextRound}>Next</button>
            </>
        }
        {!showUserColor && 
            <>
            <label>Red: <input value={userRed} type="range" min={0} max={255} onChange={(e) => setUserRed(e.target.value)}/></label>
            <label>Green: <input value={userGreen} type="range" min={0} max={255} onChange={(e) => setUserGreen(e.target.value)}/></label>
            <label>Blue: <input value={userBlue} type="range" min={0} max={255} onChange={(e) => setUserBlue(e.target.value)}/></label>
            <button onClick={guessColor}>Guess</button>
        </>}
    </>;
}

function randomBetween0and255() {
    return Math.round(Math.random() * 255)
}