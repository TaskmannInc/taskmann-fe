import Pagination from "@mui/material/Pagination";
import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { pageLimits } from "../../../helpers/constants";

export const TablePagination = ({
  showLimiter,
  totalPages,
  currentPage,
  currentDataItems,
  totalDataLength,
  itemsPerPage,
  changePageLimit,
  handlePageChange,
  pageCount,
  changePage,
}) => {
  return (
    <>
      {showLimiter && (
        <select
          className="w-max bg-transparent rounded m-0 bg-transparent border-2 border-sky-600 py-1.5 px-1 ml-2 text-sm"
          onChange={(e) => changePageLimit(e.target.value)}
          name="pageItems"
          defaultValue={itemsPerPage}
        >
          <option value="" disabled>
            Items per page
          </option>
          {pageLimits?.map((items, index) => (
            <option key={index + 1} value={items?.number}>
              {items?.title}
            </option>
          ))}
        </select>
      )}
      <div className="pagination-section">
        <div className="pagination-text">
          <p>
            Showing <strong>{currentDataItems?.length}</strong> out of{" "}
            <strong>{totalDataLength}</strong> items.
          </p>
        </div>
        {totalPages && (
          <div className="pagination-text">
            <p>
              {currentPage && (
                <>
                  Page <strong>{currentPage}</strong> of{" "}
                </>
              )}
              <strong>
                {totalPages} {totalPages > 1 ? "pages" : ""}
              </strong>
              .
            </p>
          </div>
        )}
        {/* <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        /> */}

        <ReactPaginate
          previousLabel={
            <button className="pagination_arrows">
              <BsFillArrowLeftCircleFill size="20" />
            </button>
          }
          nextLabel={
            <button className="pagination_arrows">
              <BsFillArrowRightCircleFill size="20" />
            </button>
          }
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={(e) => changePage(e.selected + 1)}
          containerClassName={"pagination pagination__section"}
          subContainerClassName={"pages pagination"}
          activeClassName={"page_number active_page_number"}
          disabledClassName={"page_number inactive_page_number"}
        />
      </div>
    </>
  );
};
