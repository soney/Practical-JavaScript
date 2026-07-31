export default function App() {
    function kd() {
        console.log("Key down");
    }
    return <div>
        <input onKeyDown={kd} />
        <button onClick={() => {
            console.log("Clicked!");
        }}>Click me</button>
    </div>;
}