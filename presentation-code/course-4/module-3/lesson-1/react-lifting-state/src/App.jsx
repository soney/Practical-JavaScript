import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import React from 'react';

export default function App() {
    const [messages, setMessages] = React.useState([]);
    const [inpVal, setInpVal] = React.useState("");
    const onSendMessage = () => {
        setMessages([...messages, inpVal]);
        setInpVal("");
    };
    return <div>
        <ChatMessages messages={messages} />
        <ChatInput sendMessage={onSendMessage} val={inpVal} valChanged={(e) => {
            setInpVal(e.target.value);
        }} />
        {inpVal.length===0 && <div>Enter a message</div>}
    </div>;
}