// A component, written in ordinary JSX. Nothing in this file knows it is
// running on a fake React.
//
// There is no bundler here, so freact.js runs as a plain script and its pieces
// are globals. With a build step, like the one in the video, this file would
// start with:
//
//     import { freact } from './freact.js';

function App(props) {
  return (
    <div>
      <h1 id="my_id" className="header">Hello, {props.name}</h1>
      <p>Hello from fake react!</p>
    </div>
  );
}

freact.render(<App name="Alice" />, document.querySelector('#root'));
