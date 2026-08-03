// freact, stage 4: state
// Reading: "React State: Understanding the Mechanics"
//
// This stage adds useState. A state change has to re-render the page without
// anyone calling render again, so rendering gets split in two: render()
// records *what* to render and *where*, once, and _performRender() does the
// work and can run again whenever state changes.
//
// New in this stage: the `render-root` variables, the render/_performRender
// split, the `hooks` array, and `useState`. One character also changed in
// `text-node`: `||` became `??`, so that a count of 0 still renders.
// Everything else is unchanged from stage 3 (../03-events/).
//
// To watch it run, right-click index.html in this folder and choose
// "Show Preview". Click the button and watch the count go up.

// #region fragment
// The type that marks a fragment: a Symbol, guaranteed unique.
const Fragment = Symbol('Fragment');
// #endregion

// #region text-element
// A string child gets wrapped in an element of its own with this type, so
// that every child is an object with a `type`.
const TEXT_ELEMENT = 'TEXT_ELEMENT';

function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: { nodeValue: text, children: [] }
  };
}
// #endregion

// #region create-element
// The function the JSX compiler turns your tags into: no DOM node, just a
// description object with a `type` and a `props`.
function createElement(type, props, ...children) {
  const normalized = children.flat().map(function (child) {
    return typeof child === 'object' ? child : createTextElement(child);
  });

  return {
    type: type,
    props: { ...props, children: normalized }
  };
}
// #endregion

// #region render-root
// What to render and where. render() used to receive these as arguments and
// use them once; now they are remembered, because a state change needs to
// render the same component into the same container again later.
let rootComponent = null;
let rootContainer = null;
// #endregion

// #region render
// The entry point now only records the root component and container, then
// hands off to _performRender. main code calls render() once; freact itself
// calls _performRender() again every time state changes.
function render(element, container) {
  rootComponent = element;
  rootContainer = container;

  _performRender();
}
// #endregion

// #region perform-render
// One complete render: start the hook counter over, clear the container, and
// rebuild the DOM from the root description.
function _performRender() {
  // Every render starts at hook slot 0. Without this line, the second render
  // would start where the first one left off, and every state variable would
  // read some other variable's value.
  hookIndex = 0;

  rootContainer.innerHTML = '';

  const domNode = _createDomNode(rootComponent);

  if (Array.isArray(domNode)) {
    for (const n of domNode) {
      rootContainer.append(n);
    }
  } else if (domNode) {
    rootContainer.append(domNode);
  }
}
// #endregion

// #region create-dom-node
// Where a description becomes a real node: unchanged this stage, except for
// one character in the text-node branch.
function _createDomNode(element) {
  if (!element) {
    return null;
  }

  // An array of elements becomes an array of nodes.
  if (Array.isArray(element)) {
    return element.map(function (e) {
      return _createDomNode(e);
    }).flat();
  }

  // A fragment produces no node of its own, only its children's nodes.
  if (element.type === Fragment) {
    return element.props.children.map(function (c) {
      return _createDomNode(c);
    }).flat();
  }

  // A function component: call it with its props, then build a node from
  // whatever it returns. Since components call useState, this is also the
  // moment hooks run.
  if (typeof element.type === 'function') {
    const childElement = element.type(element.props);

    return _createDomNode(childElement);
  }

  // #region text-node
  // `??` rather than `||`: a nodeValue of 0 is falsy, so `||` would replace
  // it with an empty string and a count of 0 would vanish from the page. The
  // nullish coalescing operator only substitutes for null and undefined.
  if (element.type === TEXT_ELEMENT) {
    return document.createTextNode(element.props.nodeValue ?? '');
  }
  // #endregion

  const dom = document.createElement(element.type);

  // A prop whose name starts with "on" is an event.
  function isEvent(key) {
    return key.startsWith('on');
  }

  // First loop: ordinary props become attributes; event props are skipped.
  for (const propName in element.props) {
    if (propName === 'children') {
      continue;
    }

    // The JSX compiler adds __self and __source while developing; ignore them.
    if (propName.startsWith('__')) {
      continue;
    }

    const propVal = element.props[propName];

    if (propName === 'className') {
      dom.setAttribute('class', propVal);
    } else if (!isEvent(propName)) {
      dom.setAttribute(propName, propVal);
    }
  }

  // Second loop: event props become listeners ('onClick' -> 'click').
  for (const propName in element.props) {
    if (isEvent(propName)) {
      const eventType = propName.toLowerCase().substring(2);
      const propVal = element.props[propName];

      dom.addEventListener(eventType, propVal);
    }
  }

  // Recursion: build each child and append what comes back.
  for (const child of element.props.children) {
    const childDom = _createDomNode(child);

    if (Array.isArray(childDom)) {
      for (const c of childDom) {
        dom.append(c);
      }
    } else if (childDom) {
      dom.append(childDom);
    }
  }

  return dom;
}
// #endregion

// #region hooks
// Where state actually lives: outside your component, in a plain array. Each
// useState call in a component owns one slot. hookIndex is which slot the
// *next* hook call will claim; it counts up during a render and is reset to 0
// by _performRender at the start of the next one, so the first useState call
// gets slot 0 every render. That position is the variable's identity -- no
// name is recorded anywhere -- which is why hooks must be called in the same
// order every render.
let hookIndex = 0;
let hooks = [];
// #endregion

// #region use-state
function useState(initialVal) {
  const idx = hookIndex;

  // First render only: the slot is empty, so store the initial value. On
  // every later render this `if` is skipped, which is why the initial value
  // is only used once. React also accepts a function here, called once to
  // compute the initial value.
  if (hooks[idx] === undefined) {
    if (typeof initialVal === 'function') {
      hooks[idx] = initialVal();
    } else {
      hooks[idx] = initialVal;
    }
  }

  // The setter. It closes over `idx`, which is how setClickCount knows which
  // slot to write, no matter when it is called.
  function setState(newVal) {
    // The updater form: setClickCount((c) => c + 1) passes a function, which
    // gets called with the current value from the slot.
    if (typeof newVal === 'function') {
      newVal = newVal(hooks[idx]);
    }

    // Only a value that actually changed causes a re-render. Setting state
    // to the value it already has does nothing, in freact and in React.
    if (hooks[idx] !== newVal) {
      hooks[idx] = newVal;

      // Re-render on a later tick, so the rest of the code that called the
      // setter finishes first. This is why the state variable still holds
      // the old value on the line after you call the setter.
      setTimeout(_performRender, 0);
    }
  }

  hookIndex++;

  return [hooks[idx], setState];
}
// #endregion

// #region globals
// With a build step this file would export; without one, the pieces become
// globals. useState is exposed on its own, matching the named export in the
// video: `import { freact, useState } from './freact.js'`.
const freact = { createElement: createElement, render: render, Fragment: Fragment };

window.freact = freact;
window.React = freact;
window.useState = useState;
// #endregion
