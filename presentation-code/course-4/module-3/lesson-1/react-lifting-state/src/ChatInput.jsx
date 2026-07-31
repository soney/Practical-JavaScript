import React from 'react';
export default function ChatInput({ sendMessage, val, valChanged }) {
    return <>
        <input onKeyDown={(e) => {
            if(e.key === "Enter") {
                sendMessage();
            }
        }} onChange={valChanged} value={val} type="text"></input>
        <button onClick={() => {
            sendMessage();
        }}>Send</button>
    </>;
}