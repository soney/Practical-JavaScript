export default function ChatMessages({messages}) {
    return <ul>
        {messages.map((m, i) => <li key={i}>{m}</li>)}
    </ul>;
}