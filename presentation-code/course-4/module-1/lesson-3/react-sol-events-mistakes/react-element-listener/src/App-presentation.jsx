import React from 'react';

function ReactElementListener() {
  const myBtn = <button>Click Me</button>;

  // MISTAKE: React elements are objects, not real DOM nodes!
  myBtn.addEventListener('click', () => console.log('Clicked!')); // CRASHES

  return <div>{myBtn}</div>;
}

export default ReactElementListener;
