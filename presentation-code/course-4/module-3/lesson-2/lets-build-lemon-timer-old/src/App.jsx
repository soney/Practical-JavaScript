import "./LemonTimer.css";
import React from "react";
import CountdownTimer from "./CountdownTimer";
import LemonIcon from "./LemonIcon";

const MS_PER_MINUTE = 60 * 1000;

// Everything the timer needs lives in one state object. Because the phase,
// the countdown target, and the lemon count all change together on each
// transition, a reducer keeps those updates in one place instead of juggling
// several useState setters.
const initialState = {
  workMinutes: 25,
  breakMinutes: 5,
  // Which phase we're in: "idle" | "working" | "break".
  phase: "idle",
  // The timestamp (in ms) at which the current phase ends, or null while idle.
  target: null,
  // How many work sessions the user has finished (how many lemons they've earned).
  completedSessions: 0,
};

// A reducer is just a pure function: (state, action) => nextState. It must NOT
// reach for impure values like Date.now() itself, so the actions that need the
// current time receive it as `action.now` from whoever dispatched them.
function timerReducer(state, action) {
  switch (action.type) {
    case "setWorkMinutes":
      return { ...state, workMinutes: action.value };
    case "setBreakMinutes":
      return { ...state, breakMinutes: action.value };
    // Start the focus countdown.
    case "startWork":
      return {
        ...state,
        phase: "working",
        target: action.now + state.workMinutes * MS_PER_MINUTE,
      };
    // User hit "stop" before the timer finished: no lemon, no break.
    case "stopWork":
      return { ...state, phase: "idle", target: null };
    // Work countdown reached zero on its own: earn a lemon and start a break.
    case "workDone":
      return {
        ...state,
        phase: "break",
        completedSessions: state.completedSessions + 1,
        target: action.now + state.breakMinutes * MS_PER_MINUTE,
      };
    // End the break and go back to idle (timer finished or user skipped it).
    case "endBreak":
      return { ...state, phase: "idle", target: null };
    default:
      return state;
  }
}

/**
 * A tiny Pomodoro-style "lemon timer": focus for a while, earn a lemon, then
 * take a break. The app moves between three phases — "idle", "working", and
 * "break" — and leans on the CountdownTimer component for all of the ticking.
 */
function App() {
  const [state, dispatch] = React.useReducer(timerReducer, initialState);
  const { workMinutes, breakMinutes, phase, target, completedSessions } = state;

  // A side effect with no interval: keep the browser tab title in sync with
  // what we're doing. It re-runs whenever `phase` changes.
  React.useEffect(() => {
    if (phase === "working") {
      document.title = "Focusing… 🍋";
    } else if (phase === "break") {
      document.title = "On break ☕";
    } else {
      document.title = "Lemon Timer 🍋";
    }
  }, [phase]);

  const startWork = () => {
    dispatch({ type: "startWork", now: Date.now() });
  };

  const stopWork = () => {
    dispatch({ type: "stopWork" });
  };

  // The work countdown reached zero on its own: earn a lemon and start a break.
  // useCallback keeps this function stable so CountdownTimer's effect doesn't
  // tear down and restart its interval on every render. `dispatch` is stable by
  // design, so this callback has no dependencies of its own.
  const onWorkDone = React.useCallback(() => {
    playPing();
    dispatch({ type: "workDone", now: Date.now() });
  }, []);

  // End the break and go back to idle (used both when the timer finishes and
  // when the user skips it).
  const endBreak = React.useCallback(() => {
    dispatch({ type: "endBreak" });
  }, []);

  const onBreakDone = React.useCallback(() => {
    playPing();
    endBreak();
  }, [endBreak]);

  // The lemons the user has already earned (these ones don't blink).
  const earnedLemons = [];
  for (let i = 0; i < completedSessions; i++) {
    earnedLemons.push(<LemonIcon key={i} blinking={false} />);
  }

  return (
    <div className="app">
      <h1>🍋 Lemon Timer</h1>

      <div className="lemons">
        {earnedLemons}
        {phase === "working" && <LemonIcon key="active" blinking={true} />}
        {completedSessions === 0 && phase !== "working" && (
          <span className="hint">Finish a focus session to earn a lemon!</span>
        )}
      </div>

      {phase === "idle" && (
        <div className="panel">
          <label>
            Work minutes:
            <input
              type="number"
              min={1}
              max={120}
              value={workMinutes}
              onChange={(e) => setWorkMinutes(parseInt(e.target.value) || 0)}
            />
          </label>
          <label>
            Break minutes:
            <input
              type="number"
              min={1}
              max={60}
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 0)}
            />
          </label>
          <button className="primary" onClick={startWork}>
            Start focus session
          </button>
        </div>
      )}

      {phase === "working" && (
        <div className="panel">
          <p>Stay focused! Time remaining:</p>
          <CountdownTimer target={target} onDone={onWorkDone} />
          <button className="danger" onClick={stopWork}>
            Stop
          </button>
        </div>
      )}

      {phase === "break" && (
        <div className="panel">
          <p>Take a break ☕ — back to work in:</p>
          <CountdownTimer target={target} onDone={onBreakDone} />
          <button onClick={endBreak}>Skip break</button>
        </div>
      )}
    </div>
  );
}

export default App;

/**
 * Play a short "ping" using the Web Audio API, so the project doesn't need to
 * ship an audio file. (Not a hooks concept — just a nicer "you're done!" cue.)
 */
function playPing() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return;
  }
  const ctx = new AudioCtx();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.frequency.value = 880;
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.4);
}
