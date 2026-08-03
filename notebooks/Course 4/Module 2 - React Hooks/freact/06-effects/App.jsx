// The component from the video: it counts clicks anywhere on the window, so
// the listener has to go on `window` itself -- something JSX cannot express
// with an onClick prop. That is a side effect, and it belongs in useEffect.
//
// The effect adds the listener; the function it returns removes it. Because
// freact runs the cleanup before re-running the effect, there is exactly one
// listener at any moment, no matter how many times the component re-renders.
// Try deleting the return statement: every render then adds one more
// listener, and each click starts counting up by more than one.
//
// There is no bundler here, so freact.js runs as a plain script and its
// pieces are globals. With a build step this file would start with:
//
//     import { freact, useState, useEffect } from './freact.js';

function App() {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const onClick = () => {
      setClickCount((c) => c + 1);
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  });

  return (
    <h1>You clicked {clickCount} time(s)</h1>
  );
}

freact.render(<App />, document.querySelector('#root'));
