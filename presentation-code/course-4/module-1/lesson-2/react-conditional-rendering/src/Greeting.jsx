export default function Greeting({name, greet}) {
    return <div>
        {greet || "Hello"}, {name || "viewer" }
        {name && <p>Glad you are here, {name}</p>}
        </div>;
}