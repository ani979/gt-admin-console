import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders First Page", () => {
  render(<App />);
  const adminHeader = screen.getByText(/Admin/i);
  expect(adminHeader).toBeInTheDocument();
});
