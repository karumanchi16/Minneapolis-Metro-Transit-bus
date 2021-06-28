import { render } from "@testing-library/react";
import Spinner from ".";

describe("Spinner", () => {
  const { getByTestId } = render(
    <Spinner size={"large"} styles={{ color: "red" }} />
  );
  const spinner = getByTestId("spinner");

  it("className", () => {
    expect(spinner.className).toEqual("spinner spinner-large");
  });

  it("styke", () => {
    expect(spinner).toHaveStyle("color: red");
  });
});
