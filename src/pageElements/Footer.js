import Pagination from "./Pagination";
import "./footer-style.css";

const Footer = ({ currentPage, allPages, setPage, remove }) => {
  return (
    <div className="flex-container">
      <button
        className="col-md-2 btn btn-danger button-border-rounded"
        onClick={remove}
      >
        Delete Selected
      </button>
      <div className="col-md-2"></div>
      <Pagination
        currentPage={currentPage}
        allPages={allPages}
        setPage={setPage}
      />
    </div>
  );
};

export default Footer;
