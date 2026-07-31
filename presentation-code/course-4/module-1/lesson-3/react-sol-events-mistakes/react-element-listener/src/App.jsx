import React from 'react';

function ReactElementListenerMistake() {
  // MISTAKE: Trying to add an event listener to a React element object.
  const mySpecialButton = <button>I am a React Element!</button>;
  
  // Uncommenting the next line will immediately CRASH the app:
  // TypeError: mySpecialButton.addEventListener is not a function
  // mySpecialButton.addEventListener('click', () => console.log('Clicked'));

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Mistake: React Element vs DOM Node</h2>
      
      {/* CORRECT WAY: Pass the event handler directly as a prop */}
      <button onClick={() => console.log('Correct click!')}>
        Correct Click
      </button>

      {/* The React Element object is just a description, not a real DOM node */}
      <div style={{ marginTop: '10px' }}>
        {mySpecialButton}
      </div>
    </div>
  );
}

export default ReactElementListenerMistake;
