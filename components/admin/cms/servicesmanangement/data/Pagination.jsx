import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function UsersPagination({
  currentCategories,
  all_system_categories,
  pageCount,
  changePage,
}) {
  return (
    <div className="table-pagination">
      <span className="page-description">
        Showing <span className="data-number">{currentCategories?.length}</span>{" "}
        out of{" "}
        <span className="data-number">{all_system_categories?.length}</span>{" "}
        items.
      </span>
      <ReactPaginate
        previousLabel={<FaCaretLeft size="30" className="" />}
        nextLabel={<FaCaretRight size="30" className="" />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(event) => changePage(event)}
        containerClassName={"pagination pagination__section"}
        subContainerClassName={"pages pagination"}
        activeClassName={`page-number active-page`}
        disabledClassName={"page-number inactive-page"}
      />
      {/* <span className="active-page page-number">1</span>
        <span className="inactive-page page-number">2</span> */}
    </div>
  );
}
