import { render, fireEvent } from "@testing-library/react";
import Update from "./Update";

describe("Update Comp", () => {
  it("render update and need fire callback when user clicks on update btn", () => {
    const clickFunc = jest.fn(() => {});
    const updatedTime = new Date();
    const { getByText } = render(
      <Update callback={clickFunc} updatedTime={updatedTime} />
    );
    const updateBtn = getByText("Update Now");
    fireEvent.click(updateBtn);
    expect(clickFunc).toHaveBeenCalledTimes(1);
  });
});
