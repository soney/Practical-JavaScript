import ChatInput from './ChatInput';
import React from 'react';

export default function App() {
    const onClick = () => {
        console.log("The Parent component says that the child component's button was clicked!");
    };
    return <div>
        <ChatInput clicked={onClick} />
    </div>;
}