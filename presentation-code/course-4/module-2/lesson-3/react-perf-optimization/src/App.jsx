import React from "react";
import slowFunction from './slowFunction.js';

/*
export default function App2() {
    const [valA, setValA] = React.useState(0);
    const [valB, setValB] = React.useState(0);
    const computedVal = React.useMemo(() => slowFunction(valA), [valA]);

    return <div>
        <button onClick={() => setValA(valA+1)}>Val A: {valA}</button>
        <code>slowFunction({valA}) === {computedVal}</code>
        <button onClick={() => setValB(valB+1)}>Val B: {valB}</button>
    </div>;
}
    */
export default function App() {
  const [enabled, setEnabled] = React.useState(false);

  const handleClick = React.useCallback(() => {
    console.log("CLICKED WINDOW");
    console.log("--------------");
  }, []);

  function startListening() {
    setEnabled(true);
    window.addEventListener('click', handleClick);
  }
  function stopListening() {
    setEnabled(false);
    window.removeEventListener('click', handleClick);
  }
  return <div>
    {
        enabled ? <button onClick={stopListening}>Stop listening</button> :
            <button onClick={startListening}>Start listening</button>
    }
  </div>;
}
