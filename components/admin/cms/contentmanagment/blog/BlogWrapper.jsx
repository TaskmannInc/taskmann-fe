import { useState } from "react";
import { BsGear } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { MdAddTask } from "react-icons/md";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { NoTableData } from "../../../../ui-fragments/dataInteractions";
import { TableLoader } from "../../../../ui-fragments/loaders";
import { GetServicesHook } from "../../../../utils/hooks/serviceMgmtHook";
import TablePaginationInstance from "../../../Globals/Pagination";
import AddBlogPost from "./addBlog";
import { BlogPostList } from "./blogDataList";
import DeleteBlogPost from "./deleteBlog";
import UpdateBlogPost from "./updateBlog";
import ViiewBlogPost from "./viewBlog";
import { GetBlogPostsHook } from "../../../../utils/hooks/blogMgmtHook";

export default function BlogDataManagement({ styles }) {
  var iconSize = 15;
  //component states
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAdditionModal, setshowAdditionModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [searchInput, setsearchInput] = useState("");

  //pagination states
  var itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //---->Modal event triggers<------//

  const viewAdditionModal = () => {
    setshowAdditionModal(!showAdditionModal);
  };

  const viewDetailModal = (blog) => {
    setShowPreviewModal(!showPreviewModal);
    localStorage.setItem("__blog", JSON.stringify(blog));
  };

  const viewUpdateModal = (blog) => {
    setshowUpdateModal(!showUpdateModal);
    localStorage.setItem("__blog", JSON.stringify(blog));
  };

  const viewDeletionModal = (blog) => {
    setshowDeleteModal(!showDeleteModal);
    localStorage.setItem("__blog", JSON.stringify(blog));
  };

  const modalEvents = {
    viewDetailModal,
    viewAdditionModal,
    viewUpdateModal,
    viewDeletionModal,
  };

  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = (response) => {
    // console.log("sucesss :", response);
  };

  //get main service <--> request
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: serviceData,
  } = GetBlogPostsHook(onSuccess, onError);
  const allBlogPostsData = serviceData?.data?.result;

  // Pagination
  const totalDataSet = allBlogPostsData?.length;
  var currentDataItems = allBlogPostsData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(totalDataSet / itemsPerPage);
  //page numbers click event handler
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalDataSet;
    setItemOffset(newOffset);
  };

  //search functionality
  const handleSearchChange = (e) => {
    e.preventDefault();
    setsearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    currentDataItems = currentDataItems?.filter((result) => {
      return (
        result?.service_name?.match(new RegExp(searchInput, "i")) ||
        result?.description?.match(new RegExp(searchInput, "i")) ||
        result?.active?.match(new RegExp(searchInput, "i"))
      );
    });
  }

  return (
    <div className={styles.blogmanagementDashboard}>
      <div className={styles.blogdataset}>
        <div className={styles.tableHeader}>
          <h6>Showing results for all blog posts</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
                disabled={!allBlogPostsData}
              />
            </span>
            <button type="button" onClick={viewAdditionModal}>
              Add blog post <MdAddTask size="20" />
            </button>
          </div>
        </div>
        <div className={styles.tableData}>
          {isLoading ? (
            <TableLoader />
          ) : (isSuccess && !allBlogPostsData) ||
            (isSuccess && allBlogPostsData?.length == 0) ? (
            <NoTableData />
          ) : (isSuccess && allBlogPostsData) ||
            (isSuccess && allBlogPostsData?.length > 0) ? (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th># No.</th>
                  <th className={styles.coverColumn}>Image</th>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date posted</th>
                  <th>
                    <BsGear size={"20"} />
                  </th>
                </tr>
              </thead>
              <BlogPostList
                styles={styles}
                modalEvents={modalEvents}
                currentDataItems={currentDataItems}
              />
            </table>
          ) : isError ? (
            <NoTableData
              notification={error?.response?.data?.error ?? error?.message}
            />
          ) : (
            <NoTableData />
          )}
        </div>

        {allBlogPostsData && (
          <div className="pagination-section">
            <div className="pagination-text">
              <p>
                Showing <strong>{currentDataItems?.length ?? 0}</strong> out of{" "}
                <strong>{totalDataSet ?? 0}</strong> items.
              </p>
            </div>
            {totalDataSet > 0 && (
              <TablePaginationInstance
                pageCount={pageCount}
                changePage={handlePageClick}
              />
            )}
          </div>
        )}
      </div>
       {showAdditionModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewAdditionModal}
          // onClose={viewAdditionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewAdditionModal}>
            <Box sx={ModalStyle}>
              <AddBlogPost styles={styles} closeForm={viewAdditionModal} />
            </Box>
          </Fade>
        </Modal>
      )} 
      {showPreviewModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDetailModal}
          // onClose={viewDetailModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDetailModal}>
            <Box sx={ModalStyle}>
              <ViiewBlogPost styles={styles} closeForm={viewDetailModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showUpdateModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewUpdateModal}
          // onClose={viewUpdateModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewUpdateModal}>
            <Box sx={ModalStyle}>
              <UpdateBlogPost styles={styles} closeForm={viewUpdateModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDeletionModal}
          // onClose={viewDeletionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDeletionModal}>
            <Box sx={ModalStyle}>
              <DeleteBlogPost styles={styles} closeForm={viewDeletionModal} />
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
//--Material ui modal wrapper  styles--//
const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "70vh",
  overflowY: "auto",
  bgcolor: `var(--white)`,
  border: "none",
  boxShadow: 24,
  borderRadius: `var(--radius-md)`,
  p: 2,
};
