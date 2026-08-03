// freact, stage 5: refs
// Reading: "React Refs: Understanding the Mechanics"
//
// This stage adds useRef, and it is short: a ref is one more kind of hook
// living in the same hooks array that useState uses. The slot holds an object
// `{ current: ... }`, and useRef hands that same object back on every render.
//
// New in this stage: `use-ref` near the bottom, and the `ref-prop` branch
// inside _createDomNode that points a ref at the DOM node it just built.
// Everything else is unchanged from stage 4 (Module 1's freact/04-state/).
//
// To watch it run, right-click index.html in this folder and choose
// "Show Preview". Then open the browser console and click the button.

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
// description object with a `type` and a `props`. A `ref={inputRef}` in your
// JSX arrives here as an ordinary prop whose value is the ref object.
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
// What to render and where, remembered so that a state change can render the
// same component into the same container again later.
let rootComponent = null;
let rootContainer = null;
// #endregion

// #region render
// The entry point records the root component and container, then hands off
// to _performRender.
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
// Where a description becomes a real node -- and, this stage, where a ref
// gets filled in.
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

  // #region function-component
  // A function component: call it with its props, then build a node from
  // whatever it returns. The component body runs *here*, before any DOM node
  // below it exists -- which is why a ref is still null during render.
  if (typeof element.type === 'function') {
    const childElement = element.type(element.props);

    return _createDomNode(childElement);
  }
  // #endregion

  // `??` rather than `||`, so a nodeValue of 0 still renders.
  if (element.type === TEXT_ELEMENT) {
    return document.createTextNode(element.props.nodeValue ?? '');
  }

  const dom = document.createElement(element.type);

  // A prop whose name starts with "on" is an event.
  function isEvent(key) {
    return key.startsWith('on');
  }

  // First loop: ordinary props become attributes; events and refs take
  // different paths.
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
    } else if (propName === 'ref') {
      // #region ref-prop
      // The ref prop. propVal is the object useRef returned, and the node it
      // should point at has just been created. One assignment connects them.
      // No attribute is written to the DOM.
      propVal.current = dom;
      // #endregion
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
// Where every hook lives: state values and refs share this one array, one
// slot per hook call, claimed in call order. hookIndex resets to 0 at the
// start of each render, so a call's position is its identity.
let hookIndex = 0;
let hooks = [];
// #endregion

// #region use-state
function useState(initialVal) {
  const idx = hookIndex;

  if (hooks[idx] === undefined) {
    if (typeof initialVal === 'function') {
      hooks[idx] = initialVal();
    } else {
      hooks[idx] = initialVal;
    }
  }

  function setState(newVal) {
    if (typeof newVal === 'function') {
      newVal = newVal(hooks[idx]);
    }

    if (hooks[idx] !== newVal) {
      hooks[idx] = newVal;

      setTimeout(_performRender, 0);
    }
  }

  hookIndex++;

  return [hooks[idx], setState];
}
// #endregion

// #region use-ref
// The whole hook. Claim the next slot; on the first render, put a box there,
// `{ current: initialVal }`; return the box. Every later render finds the
// slot occupied and returns the *same* box, which is what lets an assignment
// to `.current` survive from one render to the next.
//
// Compare it with useState: there is no setter, and nothing here ever
// schedules a re-render. That is not an omission -- it is the reason changing
// a ref does not update the screen.
function useRef(initialVal) {
  const idx = hookIndex;

  if (hooks[idx] === undefined) {
    hooks[idx] = { current: initialVal };
  }

  hookIndex++;

  return hooks[idx];
}
// #endregion

// #region globals
// With a build step this file would export; without one, the pieces become
// globals, matching the named exports in the video:
// `import { freact, useState, useRef } from './freact.js'`.
const freact = { createElement: createElement, render: render, Fragment: Fragment };

window.freact = freact;
window.React = freact;
window.useState = useState;
window.useRef = useRef;
// #endregion
