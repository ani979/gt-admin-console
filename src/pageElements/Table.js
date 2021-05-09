import { Checkbox } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useEffect, useState } from "react";
import THeader from "../tableElements/THeader";
import TRow from "../tableElements/TRow";
import { PAGE_SIZE } from "../utils/Constants";
import Footer from "./Footer";
import "./style.css";

const Table = ({ tableData, onDataChanged, onDataRemoved }) => {
  const [page, setPage] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [isEditMode, setEditMode] = useState();
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
    if (pageData.length === 0) {
      if (page > 1) {
        setPage(page - 1);
      } else {
        setPage(page);
      }
    } else {
      setPage(page);
    }
  }, [tableData]);

  useEffect(() => {
    const initialIsChecked = tableData.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});
    setIsChecked(initialIsChecked);
    setEditMode(initialIsChecked);
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
    onDataRemoved([e.target.id]);
  };

  const onDeleteSelected = () => {
    const itemList = Object.keys(isChecked).map((key) => {
      if (isChecked[key]) {
        return key;
      }
    });
    onDataRemoved(itemList);
    setAllChecked(false);
  };
  const handleSingleCheck = (e) => {
    setIsChecked({ ...isChecked, [e.target.id]: e.target.checked });
  };
  const handleEditMode = (e) => {
    const allFalse = tableData.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});
    setEditMode({ ...allFalse, [e.target.id]: true });
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
        title="delete"
        id={entry.id}
        onClick={onDeleteFromRowAction}
        style={{ cursor: "pointer" }}
      />{" "}
      &nbsp;&nbsp;
      <EditOutlinedIcon
        title="edit"
        id={entry.id}
        onClick={handleEditMode}
        style={{ cursor: "pointer" }}
      />
    </td>
  );

  function renderRowData(row, column, onDataChanged, isRowInEditMode) {
    return (
      <TRow
        row={row}
        column={column}
        onDataChanged={onDataChanged}
        isRowInEditMode={isRowInEditMode}
      ></TRow>
    );
  }

  const renderARow = (row) => {
    const isRowInEditMode = isEditMode[row.id];

    return columnHeaders.map((column) =>
      column.id === "Actions"
        ? renderActionColumn(row)
        : renderRowData(row, column, onDataChanged, isRowInEditMode)
    );
  };

  const renderRows = pageData.map((entry) => {
    const className = isChecked && isChecked[entry.id] ? "highlighted-row" : "";
    return (
      <tr key={entry.id + isEditMode[entry.id]} className={className}>
        {displayCheckBox(entry)}
        {renderARow(entry)}
      </tr>
    );
  });

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
            <THeader columnHeaders={columnHeaders} />
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
