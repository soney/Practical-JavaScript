import React from 'react';

export default function App() {
    const [ count, setCount ] = React.useState(0);
    React.useEffect(() => {
        const onClick = () => {
            setCount(c=>c+1);
        };
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('click', onClick);
        };
    });
    return <h1>
        Clicked {count} times
    </h1>;
}