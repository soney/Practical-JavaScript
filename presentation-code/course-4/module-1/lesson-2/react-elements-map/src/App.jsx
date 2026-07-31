import Greeting from './Greeting';
export default function App({people}) {
    return <div>
        <h1>Hello, React!</h1>
        {
            people.map((person) => <Greeting key={person} name={person} />)
        }
    </div>;
}