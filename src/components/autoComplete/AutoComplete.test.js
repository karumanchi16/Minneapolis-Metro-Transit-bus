import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import AutoComplete from ".";
import userEvent from "@testing-library/user-event";

describe("AutoComplete render", () => {
  const options = ["one", "two", "three"];
  const onChange = jest.fn();
  window.HTMLElement.prototype.scrollTo = function () {};
  let input;
  let clearBtn;
  beforeEach(() => {
    const { getByTestId } = render(
      <AutoComplete
        defaultValue={options[1]}
        options={options}
        onChange={onChange}
      />
    );
    clearBtn = getByTestId("clearBtn");
    input = getByTestId("input");
  });

  it("default value", () => {
    expect(input.value).toEqual(options[1]);
  });

  it("clear input value", async () => {
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyPress(input, { key: "ArrowDown", keyCode: 40 });
    expect(input.value).toEqual("");
  });

  it("esc key", async () => {
    userEvent.type(input, "{arrowdown}");
    userEvent.type(input, "{esc}");
    expect(input.value).toEqual("two");
  });

  it("backspace key", () => {
    userEvent.type(input, "{backspace}");
    userEvent.type(input, "{backspace}");
    userEvent.type(input, "{backspace}");
    expect(input.value).toEqual("");
  });

  it("ArrowUp key", () => {
    fireEvent.change(input, { target: { value: "" } });
    userEvent.type(input, "{arrowdown}");
    userEvent.type(input, "{arrowup}");
    userEvent.type(input, "{enter}");
    expect(input.value).toEqual("one");
  });

  it("ArrowDown key", () => {
    fireEvent.change(input, { target: { value: "" } });
    userEvent.type(input, "{arrowdown}");
    userEvent.type(input, "{arrowdown}");
    userEvent.type(input, "{arrowdown}");
    userEvent.type(input, "{enter}");
    expect(input.value).toEqual("three");
  });

  it("unfocus and list", () => {
    input.focus();
    userEvent.click(document.body);
    expect(input).not.toHaveFocus();
  });

  it("clearBtn", () => {
    fireEvent.click(clearBtn);
    expect(input.value).toEqual("");
  });

  it("click list item", () => {
    fireEvent.change(input, { target: { value: "" } });
    userEvent.type(input, "{arrowdown}");
    fireEvent.click(screen.getByText("three"));
    expect(input.value).toEqual("three");
  });
});
