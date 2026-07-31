import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // INCORRECT: Using the current state value directly.
  // Both calls read the same 'count' from the current render,
  // so if count is 0, both are calling setCount(0 + 1)
  function handleClickIncorrect() {
    setCount(count + 1);
    setCount(count + 1);
  }

  // CORRECT: Using an updater function.
  // The updater function receives the pending state,
  // so the second call receives the result of the first!
  function handleClickCorrect() {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  }

  return (
    <div>
      <h2>Immediate Updates Example</h2>
      <div>
        <button onClick={handleClickIncorrect}>
          Add 2 (Incorrect - State Snapshotting)
        </button>
        <button onClick={handleClickCorrect}>
          Add 2 (Correct - Updater Function)
        </button>
      </div>

      <h3 style={{ marginTop: '20px' }}>Count: {count}</h3>

      <p style={{ marginTop: '20px' }}>
        <em>Note: When you click the incorrect button, the count only increases by 1. This is because React batches state updates, and both calls use the same snapshot of count from the current render. The correct button uses an updater function, allowing React to queue the updates using the latest pending state.</em>
      </p>
    </div>
  );
}

export default Counter;
