// freact, stage 6: effects
// Reading: "React Effects: Understanding the Mechanics"
//
// This stage adds useEffect. An effect hook's slot keeps a small record:
//
//     { deps: [...],  cleanup: ... }
//
// deps is the dependency array from the last run, for deciding whether to run
// again; cleanup is what the last run returned, to be undone first.
//
// Effects must not run where they are called -- useEffect runs *during*
// render, and effects belong *after* it. So useEffect only pushes onto a
// queue, and _performRender drains the queue once the DOM is rebuilt.
//
// New in this stage: `effects-queue`, the `run-effects` loop at the end of
// _performRender, and `use-effect`. Everything else is unchanged from stage 5
// (../05-refs/).
//
// To watch it run, right-click index.html in this folder and choose
// "Show Preview". Click anywhere on the page and watch the count go up.

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
// What to render and where, remembered so a state change can re-render.
let rootComponent = null;
let rootContainer = null;

// #region effects-queue
// The effects that this render decided must run, in the order their hooks
// were called. useEffect pushes; _performRender drains it after the DOM is
// rebuilt. It starts every render empty.
let effectsQueue = [];
// #endregion
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
// One complete render: reset the hook counter and the effects queue, rebuild
// the DOM, and then -- only then -- run the effects that got queued.
function _performRender() {
  hookIndex = 0;
  effectsQueue = [];

  rootContainer.innerHTML = '';

  // Rebuilding the DOM calls the components, and the components call
  // useEffect, so this call is what fills effectsQueue.
  const domNode = _createDomNode(rootComponent);

  if (Array.isArray(domNode)) {
    for (const n of domNode) {
      rootContainer.append(n);
    }
  } else if (domNode) {
    rootContainer.append(domNode);
  }

  // #region run-effects
  // The DOM is on the page; now the effects run. For each one: undo the
  // previous run first, run the effect, and remember what it returned as the
  // cleanup for next time. That ordering -- cleanup, then effect -- is the
  // whole reason listeners and timers do not pile up render after render.
  for (const effectObj of effectsQueue) {
    const { effect, hookRef, cleanup } = effectObj;

    if (cleanup) {
      cleanup();
    }

    const newCleanup = effect() || undefined;
    hookRef.cleanup = newCleanup;
  }
  // #endregion
}
// #endregion

// #region create-dom-node
// Where a description becomes a real node: unchanged this stage.
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
  // whatever it returns. Components call the hooks, so this is where
  // useEffect gets called -- during the render, not after it.
  if (typeof element.type === 'function') {
    const childElement = element.type(element.props);

    return _createDomNode(childElement);
  }

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
      // The ref prop: point the ref at the node we just made.
      propVal.current = dom;
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
// Where every hook lives: state values, refs, and now effect records share
// this one array, one slot per hook call, claimed in call order.
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
function useRef(initialVal) {
  const idx = hookIndex;

  if (hooks[idx] === undefined) {
    hooks[idx] = { current: initialVal };
  }

  hookIndex++;

  return hooks[idx];
}
// #endregion

// #region use-effect
function useEffect(effect, deps) {
  const idx = hookIndex;

  // #region must-run
  // Should this effect run after this render? Three cases:
  //   no record yet          -> first render, always run
  //   a dependency array     -> run only if some dependency changed,
  //                             compared one by one with `!==`
  //   no array at all        -> run after every render
  //
  // Read the middle case with an empty array in mind: [] has no elements, so
  // nothing can ever differ, and the effect runs exactly once. That is where
  // the "empty array means run on mount only" rule comes from.
  let mustRunEffect;
  const oldHook = hooks[idx];

  if (!oldHook) {
    mustRunEffect = true;
  } else {
    if (deps) {
      let depChanged = false;

      for (let i = 0; i < deps.length; i++) {
        if (deps[i] !== oldHook.deps[i]) {
          depChanged = true;
          break;
        }
      }

      mustRunEffect = depChanged;
    } else {
      mustRunEffect = true;
    }
  }
  // #endregion

  // #region queue-effect
  // Remember this render's dependency values for next time, and queue the
  // effect rather than running it here. hookRef rides along so run-effects
  // can write the new cleanup back into this slot, and the *old* cleanup
  // rides along so it can be undone first.
  if (mustRunEffect) {
    if (!oldHook) {
      hooks[idx] = {};
    }

    hooks[idx].deps = deps;

    const addToQueue = {
      effect: effect,
      hookRef: hooks[idx]
    };

    if (oldHook) {
      addToQueue.cleanup = oldHook.cleanup;
    }

    effectsQueue.push(addToQueue);
  }
  // #endregion

  hookIndex++;
}
// #endregion

// #region globals
// With a build step this file would export; without one, the pieces become
// globals, matching the named exports in the video:
// `import { freact, useState, useRef, useEffect } from './freact.js'`.
const freact = { createElement: createElement, render: render, Fragment: Fragment };

window.freact = freact;
window.React = freact;
window.useState = useState;
window.useRef = useRef;
window.useEffect = useEffect;
// #endregion
