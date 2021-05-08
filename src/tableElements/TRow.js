import { useState } from "react";

const TRow = ({ row, column, onDataChanged, isRowInEditMode }) => {
  const [value, setValue] = useState(row[column.id.toLowerCase()]);

  const rowChanged = (e) => {
    setValue(e.target.value);
  };
  const handleKeyDown = (row, column, e) => {
    if (e.key === "Enter") {
      row[column.id.toLowerCase()] = e.target.value;
      onDataChanged(row);
    }
  };
  return isRowInEditMode ? (
    <td>
      <input
        value={value}
        onChange={(e) => rowChanged(e)}
        onKeyDown={(e) => handleKeyDown(row, column, e)}
      ></input>
    </td>
  ) : (
    <td>{row[column.id.toLowerCase()]}</td>
  );
};

export default TRow;
