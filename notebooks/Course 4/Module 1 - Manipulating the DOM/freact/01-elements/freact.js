// freact, stage 1: elements, props, children, and components
// Reading: "React Components: Understanding the Mechanics (Part I)"
//
// freact is a fake React: a small reimplementation of the part of React you
// have been using, short enough to read in one sitting. Nothing in it is code
// you would ship, and everything in it is something React genuinely does.
//
// This stage is the whole pipeline that turns the JSX you write into nodes on
// the page:
//
//     <Greeting name="Alice" />        what you write, in App.jsx
//     createElement(Greeting, {...})   what the JSX compiler turns it into
//     { type, props }                  the description createElement returns
//     _createDomNode(description)      a real DOM node, built from it
//     render(description, container)   that node, placed on the page
//
// To watch it run, right-click index.html in this folder and choose
// "Show Preview".

// #region text-element
// A child of an element can be another element, or it can be a bare string.
// Two possible shapes would mean a special case in every loop further down,
// so a string child gets wrapped in an element of its own with this type.
// After that, every child is an object with a `type`.
const TEXT_ELEMENT = 'TEXT_ELEMENT';

function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: { nodeValue: text, children: [] }
  };
}
// #endregion

// #region create-element
// The function the JSX compiler turns your tags into. It creates no DOM node.
// It returns a plain object describing what you asked for:
//
//     type     'h1' for a tag, or the function itself for a component
//     props    everything written inside the tag, plus a `children` array
//
// `...children` is a rest parameter. The compiler passes one argument per
// child, however many there are, and the rest parameter collects them into an
// array. `.flat()` unpacks one level of nesting, for the case where a child is
// itself an array of elements.
function createElement(type, props, ...children) {
  const normalized = children.flat().map(function (child) {
    return typeof child === 'object' ? child : createTextElement(child);
  });

  // Spreading `props` copies it rather than modifying it. The props object
  // belongs to the caller, so freact never writes into it.
  return {
    type: type,
    props: { ...props, children: normalized }
  };
}
// #endregion

// #region create-dom-node
// Where a description finally becomes a real node. Everything above this point
// is plain objects; `document.createElement` happens here and nowhere else.
//
// The function handles one element and calls itself for that element's
// children, so a tree of descriptions becomes a tree of DOM nodes.
function _createDomNode(element) {
  if (!element) {
    return null;
  }

  // #region function-component
  // A function component. `element.type` is usually a string like 'h1'; when
  // it is a function, the only way to find out what it renders is to call it
  // with its props. What comes back is another description, so the same
  // function handles it. Calling your component is all React does with it.
  if (typeof element.type === 'function') {
    const childElement = element.type(element.props);

    return _createDomNode(childElement);
  }
  // #endregion

  // #region text-node
  // Text is a genuinely different kind of DOM node, so it takes a different
  // call: createTextNode rather than createElement.
  if (element.type === TEXT_ELEMENT) {
    return document.createTextNode(element.props.nodeValue || '');
  }
  // #endregion

  const dom = document.createElement(element.type);

  // #region props
  for (const propName in element.props) {
    // Children are appended further down, not written as an attribute.
    if (propName === 'children') {
      continue;
    }

    // The JSX compiler adds __self and __source while developing, so that
    // error messages can name the file and line a tag came from. React
    // ignores them, and so do we.
    if (propName.startsWith('__')) {
      continue;
    }

    const propVal = element.props[propName];

    if (propName === 'className') {
      // `class` is a reserved word in JavaScript, which is why JSX spells it
      // className. This line is where that rename is undone.
      dom.setAttribute('class', propVal);
    } else {
      dom.setAttribute(propName, propVal);
    }
  }
  // #endregion

  // #region children
  // Recursion: the function calls itself for each child and trusts that call
  // to hand back a node.
  for (const child of element.props.children) {
    const childDom = _createDomNode(child);

    if (childDom) {
      dom.append(childDom);
    }
  }
  // #endregion

  return dom;
}
// #endregion

// #region render
// The entry point, freact's equivalent of ReactDOM's render: build a node from
// the description and put it in the container.
function render(element, container) {
  container.innerHTML = '';

  const domNode = _createDomNode(element);

  if (domNode) {
    container.append(domNode);
  }
}
// #endregion

// #region globals
// With a build step, this file would end with an export, the way the version
// in the video does:
//
//     export const freact = { createElement, render };
//
// There is no build step here, so the pieces become globals instead.
//
// `React` is the interesting one. The JSX compiler knows nothing about React:
// it turns every tag into a call to `React.createElement`. So pointing `React`
// at freact is the whole of what makes the JSX in App.jsx render through our
// fake React instead of the real one.
const freact = { createElement: createElement, render: render };

window.freact = freact;
window.React = freact;
// #endregion
