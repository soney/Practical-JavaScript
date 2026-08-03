// The component from the video: a button whose onClick prop is a function.
// freact never writes an onClick attribute to the DOM -- inspect the button
// in the browser and there is nothing on it. The prop was consumed to call
// addEventListener, and the log line appears in the console when you click.
//
// There is no bundler here, so freact.js runs as a plain script and its
// pieces are globals. With a build step this file would start with:
//
//     import { freact } from './freact.js';

function App() {
  function callback() {
    console.log('Clicked');
  }

  return (
    <div>
      <button onClick={callback}>Click Me</button>
    </div>
  );
}

freact.render(<App />, document.querySelector('#root'));
