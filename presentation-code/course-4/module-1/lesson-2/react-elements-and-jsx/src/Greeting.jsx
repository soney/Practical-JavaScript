import React from 'react';
export default function Greeting() {
    const el = <span>Hello, viewer</span>;
    console.log(el);
    // return React.createElement('span', {}, 'Hello, viewer');
    return el;
}