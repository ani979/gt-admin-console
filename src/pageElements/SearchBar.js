import { useState } from "react";

const SearchBar = ({ setSearchParam }) => {
  const [param, setParam] = useState("Search by name, email or role");

  return (
    <span>
      <input
        className="form-control"
        placeholder={param}
        onChange={(e) => {
          setParam(e.target.value);
          setSearchParam(e.target.value);
        }}
      />
    </span>
  );
};

export default SearchBar;
