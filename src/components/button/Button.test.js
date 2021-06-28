import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Comp", () => {
  it("render btn", () => {
    const onClick = jest.fn(() => {});
    const { getByText } = render(
      <Button primary size="lg" label={"test button"} onClick={onClick} />
    );
    const button = getByText("test button");
    expect(button.innerHTML).toEqual("test button");
    expect(button).toHaveClass("button--lg");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
