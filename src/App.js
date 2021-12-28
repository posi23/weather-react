import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import Header from "./components/Header";
import Location from "./components/Location";
import { useState } from "react";


const api = {
  key: "2dc88e8959a5cc29f617c8f6107075e5",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState("Saskatoon");
  const [weather, setWeather] = useState({});
  const [pending, isPending] = useState(true);
  // const [time, setTime] = useState(new Date().getTime());

  return (
    <div className="App">
      <header className="App-header">
        <Header api={api} query={[query, setQuery]} weather={[weather, setWeather]} pending={[pending, isPending]} />
      </header>

      <Location weather={weather} pending={pending} />
    </div>
  );
}

export default App;
