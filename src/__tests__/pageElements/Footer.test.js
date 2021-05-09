import { render, screen } from "@testing-library/react";
import Footer from "../../pageElements/Footer";

describe("renders Admin Page", () => {
  it("Delete Selected is present in the Foort", () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Delete/i).textContent).toBe("Delete Selected");
  });
});
