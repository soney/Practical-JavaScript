import React, { useState } from 'react';

const ThemeContext = React.createContext({
    hasRedButtons: false
});

export default function App() {
    const [hasRedButtons, setHasRedButtons] = useState(false);

    return (
        <ThemeContext.Provider value={ { hasRedButtons} }>
            <div>
                <label>
                    <input type="checkbox" checked={hasRedButtons} onChange={() => setHasRedButtons((prev) => !prev)} />
                    Red buttons
                </label>
                <Layout />
                <Button />
            </div>
        </ThemeContext.Provider>
    );
}

function Layout({ }) {
    return <>
        <h2>Layout</h2>
        <Sidebar />
    </>;
}

function Sidebar({ }) {
    return (<>
        <h3>Sidebar</h3>
        <Button />
    </>);
}

function Button({ }) {
    const theme = React.useContext(ThemeContext);
    const redTheme = theme.hasRedButtons;
    return ( <button className={redTheme ? 'red' : ''}>
            This is a button!
        </button> );
}