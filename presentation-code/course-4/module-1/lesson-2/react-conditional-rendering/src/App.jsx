import Greeting from './Greeting';
export default function App() {
    return <div>
        <h1>Hello, React!</h1>
        <Greeting greet="Bonjour" />
        <Greeting name="Bob" greet="Hi" />
        <Greeting name="Charlie" />
    </div>;
}