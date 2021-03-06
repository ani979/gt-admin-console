import { useState } from "react";

const SearchBar = ({ doSearch }) => {
  const [param, setParam] = useState("Search by name, email or role");

  return (
    <span>
      <input
        className="form-control"
        placeholder={param}
        onChange={(e) => {
          setParam(e.target.value);
          doSearch(e.target.value);
        }}
      />
    </span>
  );
};

export default SearchBar;
