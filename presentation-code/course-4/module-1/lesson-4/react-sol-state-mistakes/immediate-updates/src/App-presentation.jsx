import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleClickIncorrect() {
    setCount(count + 1);
    setCount(count + 1);
  }

  function handleClickCorrect() {
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  return (
    <>
      <button onClick={handleClickIncorrect}>Add 2 (Incorrect)</button>
      <button onClick={handleClickCorrect}>Add 2 (Correct)</button>
      <h3>Count: {count}</h3>
    </>
  );
}

export default Counter;
