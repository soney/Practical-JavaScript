import Greeting from './Greeting';
export default function App() {
    return <div>
        <h1>Hello, React!</h1>
        <Greeting name="Alice" greet="Bonjour" />
        <Greeting name="Bob" />
        <Greeting name="Charlie" />
    </div>;
}