import { useState } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

const values = [
  { label: "1", value: "one" },
  { label: "2", value: "two" },
  { label: "3", value: "three" },
  { label: "4", value: "four" },
  { label: "5", value: "five" },
  { label: "6", value: "six" },
  { label: "7", value: "seven" },
  { label: "8", value: "eight" },
  { label: "9", value: "nine" },
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
