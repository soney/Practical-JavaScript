// freact, stage 2: fragments and arrays of elements
// Reading: "React Components: Understanding the Mechanics (Part II)"
//
// Stage 1 (../01-elements/) turned one description into one DOM node. This
// stage loosens that rule, because two React features hand the renderer
// something that is not one element:
//
//     <>...</>                                      a fragment
//     { names.map((n) => <Greeting name={n} />) }   an array of elements
//
// New in this stage: the Fragment marker at the top, the two new branches at
// the top of _createDomNode, and the appending loops in `children` and
// `render` that can now receive several nodes at once. Everything else is
// unchanged from stage 1.
//
// To watch it run, right-click index.html in this folder and choose
// "Show Preview".

// #region fragment
// The type that marks a fragment. A Symbol is a value guaranteed to be
// unique: it cannot equal 'div', 'h1', or any component function, so no real
// element type can be mistaken for a fragment by accident.
const Fragment = Symbol('Fragment');
// #endregion

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

  // #region array-of-elements
  // An array of elements, which is what a JSX expression like
  // `{ names.map(...) }` produces. One node cannot come back from a list of
  // descriptions, so an *array* of nodes comes back instead: build each
  // element and flatten, in case any of them produced arrays of their own.
  if (Array.isArray(element)) {
    return element.map(function (e) {
      return _createDomNode(e);
    }).flat();
  }
  // #endregion

  // #region fragment-branch
  // A fragment produces no node of its own. Its children are built and
  // returned directly, so they land in whatever contains the fragment.
  if (element.type === Fragment) {
    return element.props.children.map(function (c) {
      return _createDomNode(c);
    }).flat();
  }
  // #endregion

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
  // Recursion, as in stage 1 -- but what comes back for a child may now be an
  // array of nodes, when that child was a fragment or an array. Both shapes
  // get appended.
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
  // #endregion

  return dom;
}
// #endregion

// #region render
// The entry point, freact's equivalent of ReactDOM's render: build a node
// from the description and put it in the container. When the top-level
// element was a fragment or an array, several nodes come back, and every one
// of them goes into the container.
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
// With a build step, this file would end with an export, the way the version
// in the video does:
//
//     export const freact = { createElement, render, Fragment };
//
// There is no build step here, so the pieces become globals instead.
//
// `React` is the interesting one. The JSX compiler knows nothing about React:
// it turns every tag into a call to `React.createElement`, and it turns the
// empty tags `<>...</>` into `React.createElement(React.Fragment, ...)`. So
// pointing `React` at freact is the whole of what makes the JSX in App.jsx
// render through our fake React instead of the real one.
const freact = { createElement: createElement, render: render, Fragment: Fragment };

window.freact = freact;
window.React = freact;
// #endregion
