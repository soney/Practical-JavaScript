// freact, stage 3: events
// Reading: "React Events: Understanding the Mechanics"
//
// This stage teaches freact what to do with a prop like
// `onClick={callback}`. Writing it to the DOM with setAttribute would be
// useless -- the function would be turned into a string -- so event props
// take a different path: addEventListener.
//
// New in this stage: the `is-event` helper and the second loop over the
// props, both inside _createDomNode. Everything else is unchanged from stage
// 2 (../02-fragments/).
//
// To watch it run, right-click index.html in this folder and choose
// "Show Preview". Then open the browser console and click the button.

// #region fragment
// The type that marks a fragment: a Symbol, guaranteed unique, so no real
// element type can be mistaken for a fragment by accident.
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
// The function the JSX compiler turns your tags into. It creates no DOM node;
// it returns a plain description object with a `type` and a `props`. An
// `onClick={callback}` in your JSX arrives here as an ordinary prop whose
// value happens to be a function.
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

// #region create-dom-node
// Where a description becomes a real node, and now also where event listeners
// get attached.
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
  // whatever it returns.
  if (typeof element.type === 'function') {
    const childElement = element.type(element.props);

    return _createDomNode(childElement);
  }

  // Text becomes a text node rather than an element.
  if (element.type === TEXT_ELEMENT) {
    return document.createTextNode(element.props.nodeValue || '');
  }

  const dom = document.createElement(element.type);

  // #region is-event
  // The rule React uses to tell a handler from an ordinary attribute is a
  // naming convention: a prop whose name starts with "on" is an event.
  function isEvent(key) {
    return key.startsWith('on');
  }
  // #endregion

  // #region attributes
  // First loop: ordinary props become attributes. Event props are skipped
  // here -- setAttribute('onClick', someFunction) would stringify the
  // function, and nothing would ever call it.
  for (const propName in element.props) {
    // Children are appended further down, not written as an attribute.
    if (propName === 'children') {
      continue;
    }

    // The JSX compiler adds __self and __source while developing; React
    // ignores them, and so do we.
    if (propName.startsWith('__')) {
      continue;
    }

    const propVal = element.props[propName];

    if (propName === 'className') {
      // `class` is reserved in JavaScript, which is why JSX spells it
      // className. This line is where that rename is undone.
      dom.setAttribute('class', propVal);
    } else if (!isEvent(propName)) {
      dom.setAttribute(propName, propVal);
    }
  }
  // #endregion

  // #region event-listeners
  // Second loop: event props become listeners. The DOM listens for 'click',
  // and the prop is called 'onClick', so lowercase the name and cut off the
  // first two characters. This one line is the entire reason for React's
  // naming rule: camelCase is what makes lowercasing produce the right DOM
  // event name ('onMouseEnter' becomes 'mouseenter').
  for (const propName in element.props) {
    if (isEvent(propName)) {
      const eventType = propName.toLowerCase().substring(2);
      const propVal = element.props[propName];

      dom.addEventListener(eventType, propVal);
    }
  }
  // #endregion

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

// #region render
// The entry point: build a node (or several) from the description and put it
// in the container.
function render(element, container) {
  container.innerHTML = '';

  const domNode = _createDomNode(element);

  if (Array.isArray(domNode)) {
    for (const n of domNode) {
      container.append(n);
    }
  } else if (domNode) {
    container.append(domNode);
  }
}
// #endregion

// #region globals
// With a build step this file would export; without one, the pieces become
// globals, and pointing `React` at freact is what routes the compiled JSX
// through our fake React.
const freact = { createElement: createElement, render: render, Fragment: Fragment };

window.freact = freact;
window.React = freact;
// #endregion
