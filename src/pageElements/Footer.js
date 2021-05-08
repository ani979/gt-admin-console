import Pagination from "./Pagination";
import "./style.css";

const Footer = ({ currentPage, dataSize, setPage, removeSelected }) => {
  return (
    <div className="flex-container">
      <button
        className="col-md-2 btn btn-danger button-border-rounded"
        onClick={removeSelected}
      >
        Delete Selected
      </button>
      <div className="col-md-2"></div>
      <Pagination
        currentPage={currentPage}
        dataSize={dataSize}
        setPage={setPage}
      />
    </div>
  );
};

export default Footer;
