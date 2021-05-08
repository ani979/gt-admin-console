import { PAGE_SIZE } from "../utils/Constants";

const Pagination = ({ currentPage, allPages, setPage }) => {
  const numberOfPages = Math.ceil(allPages / PAGE_SIZE);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const renderAllPageNumbers = () => {
    return getPageNumbers().map((onePage) => (
      <li className="page-item">
        <button
          class="btn btn-primary"
          style={{ borderRadius: "50%" }}
          key={onePage}
          onClick={() => setPage(onePage)}
        >
          {onePage + 1}
        </button>
      </li>
    ));
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

  const renderPrevPageNumbers = () => {
    return (
      <>
        <li class="page-item">
          <button key="first-page" class="page-link" onClick={() => setPage(0)}>
            <span aria-hidden="true">&#171;</span>
            <span class="sr-only"> First</span>
          </button>
        </li>
        <li class="page-item">
          <button key="prev-page" class="page-link" onClick={goToPrevPage}>
            <span aria-hidden="true">&#8592;</span>
            <span class="sr-only"> Previous</span>
          </button>
        </li>
      </>
    );
  };

  const renderNextPageNumbers = () => {
    return (
      <>
        <li class="page-item">
          <button key="next-page" class="page-link" onClick={goToNextPage}>
            <span aria-hidden="true">&rarr;</span>
            <span class="sr-only"> Next </span>
          </button>
        </li>
        <li class="page-item">
          <button
            key="last-page"
            class="page-link"
            onClick={() => setPage(numberOfPages - 1)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only"> Last</span>
          </button>
        </li>
      </>
    );
  };
  return (
    <nav className="flex-grow-1">
      <ul class="pagination justify-content-around">
        {renderPrevPageNumbers()}
        {renderAllPageNumbers()}
        {renderNextPageNumbers()}
      </ul>
    </nav>
  );
};

export default Pagination;
