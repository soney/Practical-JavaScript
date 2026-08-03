// The component from the video: a click counter. clickCount is a state
// variable, so clicking the button calls setClickCount, and freact re-renders
// with the new value.
//
// There is no bundler here, so freact.js runs as a plain script and its
// pieces are globals. With a build step this file would start with:
//
//     import { freact, useState } from './freact.js';

function App() {
  const [clickCount, setClickCount] = useState(0);

  function callback() {
    setClickCount(clickCount + 1);
  }

  return (
    <div>
      <button onClick={callback}>You clicked {clickCount} time(s)</button>
    </div>
  );
}

freact.render(<App />, document.querySelector('#root'));
