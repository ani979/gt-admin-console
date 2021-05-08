import { useEffect, useState } from "react";
import SearchBar from "../pageElements/SearchBar";
import Table from "../pageElements/Table";
import { getUsers } from "../utils/APIs";

const AdminPage = () => {
  // For page and search
  const [searchParam, setSearchParameters] = useState("");
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
  }, [searchParam, initialData]);

  const onDataChanged = (toBeDeletedData) => {
    const remainingViewedData = currentlyViewedData.filter(
      (item) => !toBeDeletedData.includes(item.id)
    );
    const remainingCompleteData = initialData.filter(
      (item) => !toBeDeletedData.includes(item.id)
    );
    setInitialData(remainingCompleteData);
    setCurrentlyViewedData(remainingViewedData);
  };

  return (
    <div>
      <div>
        <SearchBar setSearchParam={setSearchParameters} />
        <Table
          initialData={initialData}
          tableData={currentlyViewedData}
          onDataChanged={onDataChanged}
        ></Table>
      </div>
    </div>
  );
};

export default AdminPage;
