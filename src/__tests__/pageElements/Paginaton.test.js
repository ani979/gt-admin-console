import { fireEvent, queryByText, render, screen } from "@testing-library/react";
import Pagination from "../../pageElements/Pagination";

describe("renders Admin Page with pages and navigation points", () => {
  it("Page Numbers 1 to 7 are present", () => {
    const { getByText, queryByText } = render(
      <Pagination currentPage={0} dataSize="62" setPage={() => {}} />
    );
    expect(queryByText(/0/i)).not.toBeInTheDocument();
    expect(getByText(/1/i).textContent).toBe("1");
    expect(getByText(/7/i).textContent).toBe("7");
    expect(queryByText(/8/i)).not.toBeInTheDocument();
  });
  it("Prev and Next are presetn", () => {
    const { getByText } = render(
      <Pagination currentPage={0} dataSize="62" setPage={() => {}} />
    );
    expect(getByText(/Prev/i).textContent).toBe("Previous");
    expect(getByText(/Nex/i).textContent).toBe("Next");
  });
  it("First and Last are presetn", () => {
    const { getByText } = render(
      <Pagination currentPage={0} dataSize="62" setPage={() => {}} />
    );
    expect(getByText(/First/i).textContent).toBe("First");
    expect(getByText(/Last/i).textContent).toBe("Last");
  });
});

describe("Check render of current page", () => {
  it("Check if highlighted page has background to white", () => {
    const { getByText, queryByText } = render(
      <Pagination currentPage={0} dataSize="62" setPage={() => {}} />
    );
    expect(queryByText(/0/i)).not.toBeInTheDocument();
    expect(getByText(/1/i).style.backgroundColor).toBe("white");
    expect(getByText(/4/i).style.backgroundColor).toBe("");
  });
});

describe("Actions of changing page", () => {
  it("Check if page Number is changed when next is clicked", () => {
    const { getByText, rerender } = render(
      <Pagination currentPage={0} dataSize="62" setPage={() => {}} />
    );
    fireEvent.click(getByText("Next"));
    rerender(<Pagination currentPage={1} dataSize="62" setPage={() => {}} />);
    expect(getByText(/2/i).style.backgroundColor).toBe("white");
  });
});
