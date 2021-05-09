import { PAGE_SIZE } from "../utils/Constants";

const Pagination = ({ currentPage, dataSize, setPage }) => {
  const numberOfPages = Math.ceil(dataSize / PAGE_SIZE);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setPage(currentPage + 1);
    }
  };

  const renderAllPageNumbers = () => {
    return getPageNumbers().map((onePage) => {
      let highlightedItemStyle = { borderRadius: "50%" };
      if (currentPage === onePage) {
        highlightedItemStyle = {
          borderRadius: "50%",
          backgroundColor: "white",
          color: "black",
        };
      }

      return (
        <li className="page-item">
          <button
            className="btn btn-primary"
            style={highlightedItemStyle}
            key={onePage}
            onClick={() => setPage(onePage)}
          >
            {onePage + 1}
          </button>
        </li>
      );
    });
  };

  const renderPrevPageNumbers = () => {
    return (
      <>
        <li className="page-item">
          <button
            key="first-page"
            className="page-link"
            onClick={() => setPage(0)}
          >
            <span aria-hidden="true">&#171;</span>
            <span className="sr-only">First</span>
          </button>
        </li>
        <li className="page-item">
          <button key="prev-page" className="page-link" onClick={goToPrevPage}>
            <span aria-hidden="true">&#8592;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
      </>
    );
  };

  const renderNextPageNumbers = () => {
    return (
      <>
        <li className="page-item">
          <button key="next-page" className="page-link" onClick={goToNextPage}>
            <span aria-hidden="true">&rarr;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
        <li className="page-item">
          <button
            key="last-page"
            className="page-link"
            onClick={() => setPage(numberOfPages - 1)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Last</span>
          </button>
        </li>
      </>
    );
  };
  return (
    <nav className="flex-grow-1">
      <ul className="pagination justify-content-around">
        {renderPrevPageNumbers()}
        {renderAllPageNumbers()}
        {renderNextPageNumbers()}
      </ul>
    </nav>
  );
};

export default Pagination;
