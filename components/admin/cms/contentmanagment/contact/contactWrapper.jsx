import { useState } from "react";
import { BsGear } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { NoTableData } from "../../../../ui-fragments/dataInteractions";
import { TableLoader } from "../../../../ui-fragments/loaders";
import { GetMessagesContentHook } from "../../../../utils/hooks/contactMessagesHook";
import TablePaginationInstance from "../../../Globals/Pagination";
import DeleteContactMessage from "./deleteMessage";
import { MessageList } from "./messageDataList";
import ViewMessageInfo from "./viewMessage";

export default function ContactMessagesManagementWrapper({ styles }) {
  var iconSize = 15;
  //component states
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [searchInput, setsearchInput] = useState("");

  //pagination states
  var itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //---->Modal event triggers<------//

  const viewDetailModal = (message) => {
    setShowPreviewModal(!showPreviewModal);
    localStorage.setItem("__message", JSON.stringify(message));
  };

  const viewDeletionModal = (message) => {
    setshowDeleteModal(!showDeleteModal);
    localStorage.setItem("__message", JSON.stringify(message));
  };

  const modalEvents = {
    viewDetailModal,
    viewDeletionModal,
  };

  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = (response) => {
    console.log("sucesss :", response);
  };

  //get data <--> request
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: ContactMessages,
  } = GetMessagesContentHook(onSuccess, onError);
  const allContactMessages = ContactMessages?.data?.result;

  // Pagination
  const totalDataSet = allContactMessages?.length;
  var currentDataItems = allContactMessages?.slice(itemOffset, endOffset);
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
        result?.question?.match(new RegExp(searchInput, "i")) ||
        result?.answer?.match(new RegExp(searchInput, "i"))
      );
    });
  }

  return (
    <div className={styles.contactMsgmanagementDashboard}>
      <div className={styles.contactMsgdataset}>
        <div className={styles.tableHeader}>
          <h6>Showing all receieved messages</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
                disabled={!allContactMessages}
                onChange={handleSearchChange}
              />
            </span>
          </div>
        </div>
        <div className={styles.tableData}>
          {isLoading ? (
            <TableLoader />
          ) : (isSuccess && !allContactMessages) ||
            (isSuccess && allContactMessages?.length == 0) ? (
            <NoTableData />
          ) : (isSuccess && allContactMessages) ||
            (isSuccess && allContactMessages?.length > 0) ? (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th># No.</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Message brief</th>
                  <th>
                    <BsGear size={"20"} />
                  </th>
                </tr>
              </thead>
              <MessageList
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

        {allContactMessages && (
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
              <ViewMessageInfo styles={styles} closeForm={viewDetailModal} />
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
              <DeleteContactMessage
                styles={styles}
                closeForm={viewDeletionModal}
              />
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
