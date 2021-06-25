import "./App.css";
import Home from "./components/home/Home";

function App() {
  return (
    <>
      <header className="App-Header">
        <h1 className="App-Header-Context">Metro Transit</h1>
      </header>
      <div className="App-Body">
        <Home />
      </div>
    </>
  );
}

export default App;
