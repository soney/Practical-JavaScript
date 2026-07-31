import React, { useState } from 'react';

const STATIC_NAME = "Steve";

function Greeting() {
  const [stateName] = useState("Steve"); // Incorrect
  const simpleName = "Steve";            // Correct

  return (
    <>
      <p>State: {stateName}</p>
      <p>Constant: {STATIC_NAME}</p>
      <p>Variable: {simpleName}</p>
    </>
  );
}

export default Greeting;
