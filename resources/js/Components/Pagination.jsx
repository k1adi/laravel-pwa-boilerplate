import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ firstIndex, lastIndex, total, currentPage, lastPage, onPageChange, className='' }) {
  return(
    <div className={`pagination ${className}`}>
      <span className="pagination__info">
        Showing <b>{firstIndex} - {lastIndex}</b> of <b>{total}</b> Entries
      </span>

      {lastPage != 1 &&
        <nav className="pagination__nav">
          <button 
            className={`pagination__button ${currentPage == 1 ? 'pagination__button--disabled' : 'pagination__button--enabled'}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
            disabled={currentPage == 1}
          >
            <span className="pagination__label--desktop">Previous</span>
            <span className="pagination__label--mobile"> <ChevronLeft/> </span>
          </button>
          <span className="pagination__counter">
              {currentPage} / {lastPage}
          </span>

          <button 
            className={`pagination__button ${currentPage == lastPage ? 'pagination__button--disabled' : 'pagination__button--enabled'}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
            disabled={currentPage == lastPage}
          >
            <span className="pagination__label--desktop">Next</span>
            <span className="pagination__label--mobile"> <ChevronRight/> </span>
          </button>
        </nav>
      }
    </div>
  );
}