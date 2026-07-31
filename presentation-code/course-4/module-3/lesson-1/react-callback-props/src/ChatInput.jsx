import React from 'react';
export default function ChatInput({ clicked }) {
    return <>
        <input type="text"></input>
        <button onClick={() => {
            clicked();
        }}>Send</button>
    </>;
}