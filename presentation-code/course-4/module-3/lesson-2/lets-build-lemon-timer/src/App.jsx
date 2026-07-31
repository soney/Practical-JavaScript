import './style.css';
import React from "react";
import useCountdown, {displayTime} from './useCountdown';
import LemonIcon from './LemonIcon';

const INITIAL_STATE = {
    workMinutes: 25,
    breakMinutes: 5,
    phase: "idle", // idle | work | break
    workCount: 0
};

function timerReducer(state, action) {
    if(action.type==="setWorkMinutes") {
        return { ...state, workMinutes: action.value };
    } else if(action.type==="setBreakMinutes") {
        return { ...state, breakMinutes: action.value };
    } else if(action.type==="startWork") {
        return { ...state, phase: "work" };
    } else if(action.type==="startBreak") {
        return { ...state, workCount: state.workCount+1, phase: "break" };
    } else if(action.type==="endBreak") {
        return { ...state, phase: "idle" };
    }
    return state;
}

export default function App() {
    const [ state, dispatch ] = React.useReducer(timerReducer, INITIAL_STATE)
    const { timeLeft, start} = useCountdown({ onDone: onCountdownDone });

    function onStartWork() {
        dispatch({type:"startWork"});
        start(state.workMinutes*60*1000);
    }
    function onCountdownDone() {
        if(state.phase === "work") {
            dispatch({type:"startBreak"});
            start(state.breakMinutes*60*1000);
        } else {
            dispatch({type:"endBreak"});
        }
    }

    const lemonIcons = [];
    for(let i = 0; i<state.workCount; i++) {
        lemonIcons.push(<LemonIcon key={i} />);
    }

    return <div className="app">
        <div className={`phase-badge phase-${state.phase}`}>{state.phase}</div>

        <div className="lemons">
            {lemonIcons}
            {state.phase==="work" && <LemonIcon blinking={true} />}
        </div>

        {(state.phase === "work" || state.phase === "break") &&
            <div className="display-timer">{displayTime(timeLeft)}</div>
        }
        {state.phase === "idle" &&
            <button className="start-btn" onClick={onStartWork}>Start Work Interval</button>
        }

        <hr className="divider"/>

        <div className="settings">
            <label className="setting">
                <span>Work Interval(s)</span>
                <input min={0} max={120} type="number" value={state.workMinutes} onChange={
                    (e) => dispatch({type: "setWorkMinutes", value: parseInt(e.target.value)})
                }></input>
            </label>
            <label className="setting">
                <span>Break Interval(s)</span>
                <input min={0} max={120} type="number" value={state.breakMinutes} onChange={
                    (e) => dispatch({type: "setBreakMinutes", value: parseInt(e.target.value)})
                }></input>
            </label>
        </div>
    </div>;
}