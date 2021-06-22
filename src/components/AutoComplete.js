import { useEffect, useState, useRef } from "react";
import "./AutoComplete.css";

function AutoComplete({ defaultValue = "", onChange, options = [] }) {
  const getValue = (option) => option.label || option;

  const [inputValue, setInputValue] = useState(getValue(defaultValue));
  const [displayOptions, setDisplayOptions] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const autocompleteContainerRef = useRef(null);

  const handleOnChange = (e) => setInputValue(e.target.value);

  const filterdOptions = (() => {
    if (!inputValue) return options;
    return options.filter((option) => getValue(option) === inputValue);
  })();

  const handleOnClick = (_) => setDisplayOptions(true);

  const onSelection = (value) => {
    setInputValue(getValue(value));
    setDisplayOptions(false);
    onChange(value);
  };

  const handleClickOutside = (e) => {
    if (
      autocompleteContainerRef.current &&
      !autocompleteContainerRef.current.contains(e.target)
    ) {
      setDisplayOptions(false);
    }
    if (!inputValue) onChange(""); // handling edge case while user can select and again remove
  };

  const resetInputValue = () => {
    console.log("reset");
    setInputValue("");
    onChange("");
  };

  const handleClearButton = () => resetInputValue();
  const handleCaretButton = () =>
    setDisplayOptions((displayOptions) => !displayOptions);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={autocompleteContainerRef} className="Auto-Complete">
      <div className="Auto-Complete-Input-Wrap">
        <input
          type="text"
          name="input"
          className="Auto-Complete-Input"
          value={inputValue}
          onChange={handleOnChange}
          onClick={handleOnClick}
        />
        <button
          className={`Auto-Complete-Caret ${displayOptions ? "open" : "close"}`}
          onClick={handleCaretButton}
        >
          &#9660;
        </button>
        <button className="Auto-Complete-Clear" onClick={handleClearButton}>
          &#10006;
        </button>
      </div>
      <ul className="Options-List">
        {displayOptions &&
          (filterdOptions.length ? (
            filterdOptions.map((option) => {
              return (
                <p key={getValue(option)} onClick={() => onSelection(option)}>
                  {getValue(option)}
                </p>
              );
            })
          ) : (
            <p>No Options</p>
          ))}
      </ul>
    </div>
  );
}

export default AutoComplete;
