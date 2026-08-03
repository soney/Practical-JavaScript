// The component from the video: an input with a ref, and a button whose
// handler logs inputRef.current. Open the browser console and click the
// button -- the log shows the real input DOM element.
//
// The setClickCount line is commented out on purpose. Uncomment it and click:
// the count goes up, but whatever you typed in the input vanishes. That is
// the caveat from the video -- this freact rebuilds the whole DOM on every
// render, so the input is a brand new element each time. Real React keeps
// the existing node and updates it in place, which is also what keeps a ref
// valid across renders.
//
// There is no bundler here, so freact.js runs as a plain script and its
// pieces are globals. With a build step this file would start with:
//
//     import { freact, useState, useRef } from './freact.js';

function App() {
  const inputRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);

  function callback() {
    console.log(inputRef.current);
    // setClickCount(clickCount + 1);
  }

  return (
    <div>
      <input ref={inputRef}></input>
      <button onClick={callback}>You clicked {clickCount} time(s)</button>
    </div>
  );
}

freact.render(<App />, document.querySelector('#root'));
