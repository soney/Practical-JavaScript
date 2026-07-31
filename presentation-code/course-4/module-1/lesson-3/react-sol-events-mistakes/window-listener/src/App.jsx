import React, { useState, useEffect } from 'react';

function WindowListenerMistake() {
  const [count, setCount] = useState(0);

  // MISTAKE: Adding event listener directly in the component body.
  // This runs EVERY time the component renders, creating a huge memory leak!
  // It also never gets cleaned up when the component unmounts.
  window.addEventListener('resize', () => {
    console.log('Window resized - Leaking memory!');
  });

  // CORRECT WAY: Use useEffect for global events, with a cleanup function.
  useEffect(() => {
    const handleResize = () => console.log('Window safely resized');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h2>Mistake: Window Listener Memory Leak</h2>
      <p>Open your console and resize the window. Then click the re-render button below and resize again. You will see multiple logs firing for a single resize event due to the memory leak.</p>

      <button onClick={() => setCount(count + 1)}>
        Force Re-render (Count: {count})
      </button>
    </div>
  );
}

export default WindowListenerMistake;
