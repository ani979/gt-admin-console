import { useEffect, useState } from "react";
import Footer from "../pageElements/Footer";
import SearchBar from "../pageElements/SearchBar";
import { getUsers } from "../utils/APIs";
import { PAGE_SIZE } from "../utils/Constants";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const AdminPage = () => {
  // For page and search
  const [page, setPage] = useState(0);
  const [searchParam, setSearchParameters] = useState("");
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pageData, setPageData] = useState([]);

  // For check and uncheck
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState();

  // Search Options
  const columnSearchOptions = ["name", "role", "email"];

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

  const handleSingleCheck = (e) => {
    setIsChecked({ ...isChecked, [e.target.id]: e.target.checked });
  };

  useEffect(() => {
    getUsers().then((users) => {
      setAllData(users);
      setTableData(users);
      const initialIsChecked = users.reduce((acc, d) => {
        acc[d.id] = false;
        return acc;
      }, {});
      setIsChecked(initialIsChecked);
    });
  }, []);

  useEffect(() => {
    const offset = page * PAGE_SIZE;
    setPageData(tableData.slice(offset, offset + PAGE_SIZE));
  }, [page, tableData]);

  useEffect(() => {
    setPage(0);
  }, [tableData]);

  const isEntryPresent = (entry) => {
    return searchParam.length > 0
      ? columnSearchOptions.filter((option) =>
          entry[option].toLowerCase().includes(searchParam.toLowerCase())
        ).length > 0
      : true;
  };

  useEffect(() => {
    setTableData(
      allData.filter((data) => {
        return isEntryPresent(data);
      })
    );
  }, [searchParam]);

  const handleAllCheck = (e) => {
    setAllChecked(e.target.checked);
    const checkedToValue = pageData.reduce((acc, d) => {
      acc[d.id] = e.target.checked;
      return acc;
    }, {});
    setIsChecked(checkedToValue);
  };


  const onDeleteChosen = (e) => {
    const result = tableData.filter((item) => item.id !== e.target.id);
    const removedFromAllData = allData.filter(
      (item) => item.id !== e.target.id
    );
    setTableData(result);
    setAllData(removedFromAllData);
  };
  

  const onDelete = () => {
    const itemList = Object.keys(isChecked).map((key) => {
      if (isChecked[key]) {
        return key;
      }
    });
    const result = tableData.filter((item) => !itemList.includes(item.id));
    const removedFromAllData = allData.filter(
      (item) => !itemList.includes(item.id)
    );
    setTableData(result);
    setAllData(removedFromAllData);
    setAllChecked(false);
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
  const renderARow = (row) =>
    columnHeaders.map((column) =>
      column.id === "Actions" ? (
        renderActionColumn(row)
      ) : (
        <td>{row[column.id.toLowerCase()]}</td>
      )
    );
  const renderActionColumn = (entry) => (
    <td>
      <DeleteOutlineIcon
        id={entry.id}
        onClick={onDeleteChosen}
        style={{ cursor: "pointer" }}
      />
    </td>
  );

  const renderRows = pageData.map((entry) => (
    <tr key={entry.id}>
      {displayCheckBox(entry)}
      {renderARow(entry)}
    </tr>
  ));

  
  const renderTableHeader = (
    <tr>
      <th>
        <Checkbox
          name="checkall"
          type="checkbox"
          checked={allChecked}
          onChange={handleAllCheck}
        />
      </th>
      {columnHeaders.map((header) => (
        <th>{header.id}</th>
      ))}
    </tr>
  );
  

  return (
    <div>
      <div>
        <SearchBar setSearchParam={setSearchParameters} />
        <table className="table text-left">
          <thead>{renderTableHeader}</thead>
          <tbody>{renderRows}</tbody>
        </table>
        <Footer
          currentPage={page}
          allPages={tableData.length}
          setPage={setPage}
          remove={onDelete}
        />
      </div>
    </div>
  );
};

export default AdminPage;
