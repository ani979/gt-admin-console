import { fireEvent, render, screen, within } from "@testing-library/react";
import Table from "../../pageElements/Table";
import data from "../pages/DummData.json";

describe("renders correct Column Headers", () => {
  let tableComp;
  beforeEach(() => {
    const onDataChanged = () => {};
    const onDataRemoved = () => {};
    const tableData = data;
    tableComp = (
      <Table
        tableData={tableData}
        onDataRemoved={onDataRemoved}
        onDataChanged={onDataChanged}
      />
    );
  });
  it("Check email header is present", () => {
    render(tableComp);
    const table = screen.getByRole("table");
    const [columnNames] = within(table).getAllByRole("columnheader", {
      name: /Email/i,
    });
    expect(within(columnNames).getByText("Email").textContent).toBe("Email");
  });
  it("Check role header is present", () => {
    render(tableComp);
    const table = screen.getByRole("table");
    const [columnNames] = within(table).getAllByRole("columnheader", {
      name: /Role/i,
    });
    expect(within(columnNames).getByText("Role").textContent).toBe("Role");
  });
  it("Check name header is present", () => {
    render(tableComp);
    const table = screen.getByRole("table");
    const [columnNames] = within(table).getAllByRole("columnheader", {
      name: /Name/i,
    });
    expect(within(columnNames).getByText("Name").textContent).toBe("Name");
  });
});

describe("renders specific rows only", () => {
  let tableComp;
  beforeEach(() => {
    const onDataChanged = () => {};
    const onDataRemoved = () => {};
    const tableData = data;
    tableComp = (
      <Table
        tableData={tableData}
        onDataRemoved={onDataRemoved}
        onDataChanged={onDataChanged}
      />
    );
  });

  it("Check if count of rows including header is only 11", () => {
    render(tableComp);
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows.length).toBe(11);
  });

  it("Check if it displays first row with the data having Aaron Miles", () => {
    render(tableComp);
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    const cells = within(rows[1]).getAllByRole("cell");
    expect(within(cells[1]).getByText(/Aaron/i).textContent).toBe(
      "Aaron Miles"
    );
  });
  it("Check if it displays last row with the data having Sarah Potter", () => {
    render(tableComp);
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    const cells = within(rows[10]).getAllByRole("cell");
    expect(within(cells[1]).getByText(/Sarah/i).textContent).toBe(
      "Sarah Potter"
    );
  });
});

describe("renders with page change", () => {
  let tableComp;
  beforeEach(() => {
    const onDataChanged = () => {};
    const onDataRemoved = () => {};
    const tableData = data;
    tableComp = (
      <Table
        tableData={tableData}
        onDataRemoved={onDataRemoved}
        onDataChanged={onDataChanged}
      />
    );
  });
  it("Check if it displays first row with the data having Keshav", () => {
    const { getByText } = render(tableComp);
    // Click button
    fireEvent.click(getByText("Next"));
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    const cells = within(rows[1]).getAllByRole("cell");
    expect(within(cells[1]).getByText(/Keshav/i).textContent).toBe(
      "Keshav Muddaiah"
    );
  });
});
