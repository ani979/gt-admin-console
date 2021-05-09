import { useEffect, useState } from "react";
import SearchBar from "../pageElements/SearchBar";
import Table from "../pageElements/Table";
import { getUsers } from "../utils/APIs";

const AdminPage = () => {
  // For page and search
  const [searchParam, setSearchParameters] = useState("");
  const [firstPage, setFirstPage] = useState(0);
  const [initialData, setInitialData] = useState([]);
  const [currentlyViewedData, setCurrentlyViewedData] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setInitialData(users);
      setCurrentlyViewedData(users);
    });
  }, []);

  useEffect(() => {
    // Search Options
    const columnSearchOptions = ["name", "role", "email"];
    const isEntryPresent = (entry) => {
      return searchParam.length > 0
        ? columnSearchOptions.filter((option) =>
            entry[option].toLowerCase().includes(searchParam.toLowerCase())
          ).length > 0
        : true;
    };
    searchParam.length > 0
      ? setCurrentlyViewedData(
          initialData.filter((data) => {
            return isEntryPresent(data);
          })
        )
      : setCurrentlyViewedData(initialData);
    setFirstPage(0);
  }, [searchParam, initialData]);

  const onDataRemoved = (toBeDeletedData) => {
    const remainingViewedData = currentlyViewedData.filter(
      (item) => !toBeDeletedData.includes(item.id)
    );
    const remainingCompleteData = initialData.filter(
      (item) => !toBeDeletedData.includes(item.id)
    );
    if (remainingViewedData.length === 0) {
      setCurrentlyViewedData(remainingCompleteData);
      setSearchParameters("");
    } else {
      setCurrentlyViewedData(remainingViewedData);
    }
    setInitialData(remainingCompleteData);
  };

  const onDataChanged = (toBeEditedRow) => {
    const editedTableData = currentlyViewedData.map((data) => {
      if (data.id === toBeEditedRow.id) {
        return toBeEditedRow;
      }
      return data;
    });
    setCurrentlyViewedData(editedTableData);
  };

  return (
    <div>
      <div>
        <SearchBar
          key={"SearchBar" + initialData.length}
          doSearch={setSearchParameters}
        />
        <Table
          key={"Table" + currentlyViewedData.length}
          initialData={initialData}
          tableData={currentlyViewedData}
          onDataChanged={onDataChanged}
          onDataRemoved={onDataRemoved}
        ></Table>
      </div>
    </div>
  );
};

export default AdminPage;
