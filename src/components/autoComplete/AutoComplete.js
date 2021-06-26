/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useMemo } from "react";
import "./AutoComplete.css";

function AutoComplete({ defaultValue = "", onChange, options = [], objKey }) {
  const getValue = (option) =>
    (option && objKey ? option[objKey] : option) || "";
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const autocompleteContainerRef = useRef(null);
  const optionsListRef = useRef(null);

  const scrollView = (scrollPosition) => {
    optionsListRef?.current?.parentNode.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    if (!e.target.value) onChange("");
  };

  const filterdOptions = useMemo(() => {
    if (!inputValue) return options;
    setCursor(-1);
    scrollView(0);
    return options.filter((option) =>
      getValue(option).toLowerCase().includes(inputValue?.toLocaleLowerCase())
    );
  }, [inputValue, options]);

  const handleOnClick = (_) => setIsVisible(true);

  const onSelection = (value) => {
    setInputValue(getValue(value));
    setIsVisible(false);
    onChange(value);
  };

  const handleClickOutside = (e) => {
    if (
      autocompleteContainerRef.current &&
      !autocompleteContainerRef.current.contains(e.target)
    ) {
      setIsVisible(false);
      setCursor(-1);
    }
  };

  const resetInputValue = () => {
    setInputValue("");
    onChange("");
  };

  const handleClearButton = () => resetInputValue();
  const handleCaretButton = () => setIsVisible((isVisible) => !isVisible);

  const handleOnKeyDown = (e) => {
    // handle up, down, enter, and escape keys
    if (e.key === "ArrowUp") {
      setCursor((val) => (val > 0 ? val - 1 : 0));
    }
    if (e.key === "ArrowDown") {
      isVisible
        ? setCursor((val) => (val < filterdOptions.length - 1 ? val + 1 : val))
        : setIsVisible(true);
    }
    if (e.key === "Enter") {
      onSelection(filterdOptions[cursor]);
    }
    if (e.key === "Escape") {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (cursor < 0 || cursor > filterdOptions.length || !optionsListRef) return;
    const optionList = Array.from(optionsListRef.current.children);
    optionList[cursor] && scrollView(optionList[cursor].offsetTop);
  }, [cursor]);

  useEffect(() => {
    setInputValue(getValue(defaultValue));
  }, [defaultValue]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={autocompleteContainerRef} className="Auto-Complete">
      <div className="Auto-Complete-Input-Wrap">
        <div className="Input-Container">
          <input
            type="text"
            name="input"
            className="Auto-Complete-Input"
            value={inputValue}
            onChange={handleOnChange}
            onClick={handleOnClick}
            onKeyDown={handleOnKeyDown}
            data-testid={"input"}
          />
        </div>
        <div className="Input-Buttons-Container">
          <button
            className={`Auto-Complete-Caret ${isVisible ? "open" : "close"}`}
            onClick={handleCaretButton}
          >
            &#9660;
          </button>
          <button
            className="Auto-Complete-Clear"
            onClick={handleClearButton}
            data-testid={"clearBtn"}
          >
            &#10006;
          </button>
        </div>
      </div>
      <div className="Filtered-Options">
        <ul className="Options-List" ref={optionsListRef}>
          {isVisible &&
            (filterdOptions.length ? (
              filterdOptions.map((option, i) => {
                return (
                  <li
                    key={getValue(option)}
                    onClick={() => onSelection(option)}
                    className={`list ${
                      cursor === i ? "selected" : "unSelected"
                    }`}
                  >
                    {getValue(option)}
                  </li>
                );
              })
            ) : (
              <li className="list">No Matching Results</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AutoComplete;
