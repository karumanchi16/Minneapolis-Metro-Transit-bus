import { useState } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

const values = [
  { label: "1", value: "one" },
  { label: "2", value: "two" },
  { label: "3", value: "three" },
  { label: "4", value: "four" },
];
function App() {
  const [value, setValue] = useState(values[1]);

  return (
    <div className="App-Body">
      {value.value}
      <AutoComplete options={values} defaultValue={value} onChange={setValue} />
    </div>
  );
}

export default App;
