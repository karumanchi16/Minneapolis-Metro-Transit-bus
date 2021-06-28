import { render, act, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { mockFetch, mockRoutes } from "../../utils/mockUtils";

describe("render home comp", () => {
  it("Home", async () => {
    mockFetch(mockRoutes);
    window.HTMLElement.prototype.scrollTo = function () {};
    await act(async () => {
      render(<Home />);
    });
    const routeInput = screen.getByTestId("route");
    const directionInput = screen.getByTestId("direction");
    const stopInput = screen.getByTestId("stop");
    const clearBtn = screen.getByText("Clear");
    fireEvent.click(clearBtn);
    userEvent.type(routeInput, "{arrowdown}{arrowdown}{enter}");
    expect(routeInput.value).toEqual("route 2");
    setTimeout(() => {
      userEvent.type(directionInput, "{arrowdown}{arrowdown}{enter}");
      expect(directionInput.value).toEqual("direction 2");
    });
    setTimeout(() => {
      userEvent.type(stopInput, "{arrowdown}{arrowdown}{enter}");
      expect(directionInput.value).toEqual("stop 2");
    });
  });
});
