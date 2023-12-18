import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function TablePaginationInstance({ pageCount, changePage }) {
  return (
    <ReactPaginate
      previousLabel={
        <i className="pagination_arrows">
          <FaCaretLeft size="25" className="" />
        </i>
      }
      nextLabel={
        <i className="pagination_arrows">
          <FaCaretRight size="25" className="" />
        </i>
      }
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={(event) => changePage(event)}
      containerClassName={"pagination pagination__section"}
      subContainerClassName={"pages pagination"}
      activeClassName={`page-number active-page`}
      disabledClassName={`page-number inactive-page`}
    />
  );
}
