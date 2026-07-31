import React, { useState } from 'react';

// CORRECT: Static values should be defined outside the component
// to avoid recreating them on every render.
const STATIC_NAME = "Steve";

function Greeting() {
  // INCORRECT: Creating state for a value that never changes.
  // This adds unnecessary overhead for React to track its state.
  const [stateName] = useState("Steve"); 

  // CORRECT: Using a simple variable if it might depend on props 
  // but doesn't need to trigger re-renders.
  const simpleName = "Steve";

  return (
    <div>
      <h2>Unnecessary State Example</h2>
      
      <div>
        <h3>Incorrect (Using useState)</h3>
        <p>Hello, {stateName}</p>
        <p><small>This uses useState to store a static string. React tracks this state, which wastes memory and processing power.</small></p>
        
        <h3>Correct (Using constant outside component)</h3>
        <p>Hello, {STATIC_NAME}</p>
        <p><small>Defined outside the component. Clean and no React overhead!</small></p>
        
        <h3>Correct (Using variable inside component)</h3>
        <p>Hello, {simpleName}</p>
        <p><small>Defined as a normal variable. Still better than using state for a static value.</small></p>
      </div>
    </div>
  );
}

export default Greeting;
