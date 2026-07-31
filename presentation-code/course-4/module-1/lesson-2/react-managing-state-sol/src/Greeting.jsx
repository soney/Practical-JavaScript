export default function Greeting({name, greet}) {
    return <div>{greet || "Hello"}, {name || "viewer"}</div>;
}

// export default function Greeting({name, greet}) {
//     if(!greet) {
//         greet = "Hello";
//     }
//     return <div>{greet}, {name.toUpperCase()}</div>;
//     // return React.createElement('div', {}, 'Hello, viewer');
// }