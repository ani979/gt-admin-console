import { Checkbox } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../utils/Constants";
import Footer from "./Footer";
import "./style.css";

const Table = ({ tableData, onDataChanged }) => {
  const [page, setPage] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [pageData, setPageData] = useState([]);

  // Column Search Headers
  const columnHeaders = [
    {
      id: "Name",
    },
    {
      id: "Email",
    },
    {
      id: "Role",
    },
    {
      id: "Actions",
    },
  ];
  useEffect(() => {
    const offset = page * PAGE_SIZE;
    setPageData(tableData.slice(offset, offset + PAGE_SIZE));
  }, [page, tableData]);

  useEffect(() => {
    setPage(0);
  }, [tableData]);

  useEffect(() => {
    const initialIsChecked = tableData.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});
    setIsChecked(initialIsChecked);
  }, [tableData]);

  const handleAllCheck = (e) => {
    setAllChecked(e.target.checked);
    const checkedToValue = pageData.reduce((acc, d) => {
      acc[d.id] = e.target.checked;
      return acc;
    }, {});
    setIsChecked(checkedToValue);
  };

  const onDeleteFromRowAction = (e) => {
    onDataChanged([e.target.id]);
  };

  const onDeleteSelected = () => {
    const itemList = Object.keys(isChecked).map((key) => {
      if (isChecked[key]) {
        return key;
      }
    });
    onDataChanged(itemList);
    setAllChecked(false);
  };
  const handleSingleCheck = (e) => {
    setIsChecked({ ...isChecked, [e.target.id]: e.target.checked });
  };

  const displayCheckBox = (entry) => {
    return (
      <td>
        <Checkbox
          id={entry.id}
          checked={isChecked ? isChecked[entry.id] : false}
          onChange={handleSingleCheck}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </td>
    );
  };

  const renderActionColumn = (entry) => (
    <td>
      <DeleteOutlineIcon
        id={entry.id}
        onClick={onDeleteFromRowAction}
        style={{ cursor: "pointer" }}
      />
    </td>
  );

  const renderARow = (row) =>
    columnHeaders.map((column) =>
      column.id === "Actions" ? (
        renderActionColumn(row)
      ) : (
        <td>{row[column.id.toLowerCase()]}</td>
      )
    );

  const renderRows = pageData.map((entry) => {
    const className = isChecked && isChecked[entry.id] ? "highlighted-row":"";
    return (<tr key={entry.id} className = {className}>
      {displayCheckBox(entry)}
      {renderARow(entry)}
    </tr>);
  });

  const renderTableHeader = columnHeaders.map((header) => (
    <th key={header.id}>{header.id}</th>
  ));

  return (
    <>
      <table className="table text-left">
        <thead>
          <tr>
            <th>
              <Checkbox
                name="checkall"
                type="checkbox"
                checked={allChecked}
                onChange={handleAllCheck}
              />
            </th>
            {renderTableHeader}
          </tr>
        </thead>
        <tbody>{renderRows}</tbody>
      </table>
      <Footer
        currentPage={page}
        dataSize={tableData.length}
        setPage={setPage}
        removeSelected={onDeleteSelected}
      />
    </>
  );
};

export default Table;
