// The components from the video, now that freact can handle fragments and
// arrays: App wraps everything in <>...</>, and the list of Greetings comes
// from calling map on an array of names.
//
// There is no bundler here, so freact.js runs as a plain script and its
// pieces are globals. With a build step, like the one in the video, Greeting
// would live in its own file, Greeting.jsx, and this file would start with:
//
//     import { freact } from './freact.js';
//     import Greeting from './Greeting.jsx';

// #region greeting-component
// A component made to be used by other components. In the video this is the
// separate file Greeting.jsx, exporting the Greeting function.
function Greeting(props) {
  return <div>Hello, {props.name || 'visitor'}</div>;
}
// #endregion

// #region app-component
function App() {
  const names = ['Alice', 'Bob', 'Charlie'];

  return <>
    <h1 id="my_id" className="header">Hello</h1>
    <p>Hello from fake react!</p>
    { names.map((n) => {
      return <Greeting name={n} />;
    }) }
  </>;
}

freact.render(<App />, document.querySelector('#root'));
// #endregion
