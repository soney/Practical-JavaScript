export const Fragment = Symbol("Fragment");

function createElement(type, props, ...children) { // create a freact element
    return {
        type,
        props: {
            ...props,
            children: children.flat().map((child) => {
                if(typeof child === "object") {
                    return child;
                } else {
                    return {
                        type: "TEXT_ELEMENT",
                        props: {
                            children: [],
                            nodeValue: child
                        }
                    }
                }
            })
        }
    }
}

let rootComponent = null;
let rootContainer = null;

function render(element, container) {
    rootComponent = element;
    rootContainer = container;
    _performRender();
}

function _performRender() {
    hookIndex = 0;
    rootContainer.innerHTML = "";

    // create a dom node from the freact element "element"
    const domNode = _createDomNode(rootComponent);
    if(Array.isArray(domNode)) {
        for(const n of domNode) {
            rootContainer.append(n);
        }
    } else if(domNode) {
        rootContainer.append(domNode);
    }
}

function _createDomNode(element) {
    if(!element) { return null; }

    if(Array.isArray(element)) {
        return element.map((e) => {
            return _createDomNode(e);
        }).flat();
    }

    if(element.type === Fragment) {
        return element.props.children.map((c) => {
            return _createDomNode(c);
        }).flat();
    }

    if(typeof element.type === "function") {
        const childElement = element.type(element.props);
        return _createDomNode(childElement);
    }

    let dom;
    if(element.type === "TEXT_ELEMENT") {
        dom = document.createTextNode(element.props.nodeValue ?? "");
    } else {
        dom = document.createElement(element.type);
    }

    if(element.props) {
        if(element.type !== "TEXT_ELEMENT") {
            function isEvent(key) {
                return key.startsWith("on");
            }
            for(const propName in element.props) {
                if(propName === "children") {
                    continue;
                }
                const propVal = element.props[propName];
                if(propName === "className") {
                    dom.setAttribute("class", propVal);
                } else if(!isEvent(propName)) {
                    dom.setAttribute(propName, propVal);
                }
            }

            for(const propName in element.props) {
                if(isEvent(propName)) {
                    const eventType = propName.toLowerCase().substring(2);
                    const propVal = element.props[propName];
                    dom.addEventListener(eventType, propVal);
                }
            }
        }

        if(element.props.children) {
            for(const child of element.props.children) {
                const childDom = _createDomNode(child);
                if(Array.isArray(childDom)) {
                    for(const c of childDom) {
                        dom.append(c);
                    }
                } else {
                    dom.append(childDom);
                }
            }
        }
    }

    return dom;
}

let hookIndex = 0;
let hooks = [];

export function useState(initialVal) {
    const idx = hookIndex;
    if(hooks[idx] === undefined) {
        if(typeof initialVal === "function") {
            hooks[idx] = initialVal();
        } else {
            hooks[idx] = initialVal;
        }
    }
    function setState(newVal) {
        if(typeof newVal === "function") {
            newVal = newVal(hooks[idx]);
        }

        if(hooks[idx] !== newVal) {
            hooks[idx] = newVal;
            setTimeout(_performRender, 0);
        }
    }
    hookIndex++;
    return [hooks[idx], setState]
}

export const freact = { createElement, render, Fragment };