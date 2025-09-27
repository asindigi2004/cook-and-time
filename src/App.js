import logo from './logo.svg';
import './index.css'; // make sure this points to your Tailwind-imported CSS

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="flex flex-col items-center">
        <img src={logo} className="w-32 h-32 animate-spin" alt="logo" />
        <p className="mt-4 text-lg text-gray-700">
          Edit <code className="bg-gray-200 p-1 rounded">src/App.js</code> and save to reload.
        </p>
        <a
          className="mt-2 text-blue-600 hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
