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

function render(element, container) {
    container.innerHTML = "";

    // create a dom node from the freact element "element"
    const domNode = _createDomNode(element);
    if(Array.isArray(domNode)) {
        for(const n of domNode) {
            container.append(n);
        }
    } else if(domNode) {
        container.append(domNode);
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
        dom = document.createTextNode(element.props.nodeValue || "");
    } else {
        dom = document.createElement(element.type);
    }

    if(element.props) {
        if(element.type !== "TEXT_ELEMENT") {
            for(const propName in element.props) {
                if(propName === "children") {
                    continue;
                }
                const propVal = element.props[propName];
                if(propName === "className") {
                    dom.setAttribute("class", propVal);
                } else {
                    dom.setAttribute(propName, propVal);
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

export const freact = { createElement, render, Fragment };