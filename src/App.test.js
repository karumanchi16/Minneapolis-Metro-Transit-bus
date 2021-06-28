import { render } from "@testing-library/react";
import App from "./App";

describe("App Comp", () => {
  it("render App", () => {
    const { getByText } = render(<App />);
    const header = getByText("Metro Transit");
    expect(header.innerHTML).toEqual("Metro Transit");
  });
});
