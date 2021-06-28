import { render, fireEvent, screen } from "@testing-library/react";
import AutoComplete from ".";
import userEvent from "@testing-library/user-event";

describe("AutoComplete render", () => {
  const options = ["one", "two", "three"];
  const onChange = jest.fn();
  window.HTMLElement.prototype.scrollTo = function () {};
  let input;
  let clearBtn;
  let openBtn;
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
    openBtn = getByTestId("openBtn");
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
    userEvent.type(input, "{arrowdown}{esc}");
    expect(input.value).toEqual("two");
  });

  it("backspace key", () => {
    userEvent.type(input, "{backspace}{backspace}{backspace}");
    expect(input.value).toEqual("");
  });

  it("ArrowUp key", () => {
    fireEvent.change(input, { target: { value: "" } });
    userEvent.type(input, "{arrowdown}{arrowup}{enter}");
    expect(input.value).toEqual("one");
  });

  it("ArrowDown key", () => {
    fireEvent.change(input, { target: { value: "" } });
    userEvent.type(input, "{arrowdown}{arrowdown}{arrowdown}{enter}");
    expect(input.value).toEqual("three");
  });

  it("ArrowDown and ArrowUp key to max limit", () => {
    fireEvent.change(input, { target: { value: "" } });
    userEvent.type(
      input,
      "{arrowdown}{arrowdown}{arrowdown}{arrowdown}{arrowup}{arrowup}{arrowup}{arrowup}{enter}"
    );
    expect(input.value).toEqual("one");
  });

  it("unfocus and remove list options by click", () => {
    input.focus();
    userEvent.click(document.body);
    expect(input).not.toHaveFocus();
  });

  it("unfocus and remove list options by tab", () => {
    input.focus();
    userEvent.tab();
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

  it("handle type and enter key", () => {
    userEvent.type(input, "three{enter}");
    expect(input.value).toEqual("twothree");
    fireEvent.click(clearBtn);
    userEvent.type(input, "three{enter}");
    expect(input.value).toEqual("three");
  });

  it("handleCaretButton", () => {
    fireEvent.click(openBtn);
    expect(openBtn).toHaveClass("open");
  });
});

describe("AutoComplete render with empty options", () => {
  it("render autocomplete", () => {
    const onChange = jest.fn();
    window.HTMLElement.prototype.scrollTo = function () {};
    const { getByTestId } = render(<AutoComplete onChange={onChange} />);
    const input = getByTestId("input");
    expect(input.value).toEqual("");
  });
});
