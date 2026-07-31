export default function App() {
    function kd(ev) {
        console.log("Key down");
        console.log(ev.key);
        if(ev.key === "Enter") {
            console.log(ev.target.value);
        }
    }
    return <div>
        <input onKeyDown={kd} />
        <button onClick={(e) => {
            console.log(e);
            console.log("Clicked!");
        }}>Click me</button>
    </div>;
}