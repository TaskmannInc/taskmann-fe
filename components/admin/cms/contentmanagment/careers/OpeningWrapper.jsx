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
import { GetCareerOpeningsHook } from "../../../../utils/hooks/careerOpeningsMgmtHook";
import TablePaginationInstance from "../../../Globals/Pagination";
import AddCareerOpening from "./addOpening";
import DeleteCareerOpening from "./deleteOpening";
import UpdateCareerOpening from "./updateOpening";
import ViewCareerOpening from "./viewOpening";
import { CareerPostList } from "./openingsDataList";
import { Toaster, toast } from "react-hot-toast";

export default function CareersManagementWarapper({ styles }) {
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

  const viewDetailModal = (opening) => {
    setShowPreviewModal(!showPreviewModal);
    localStorage.setItem("__opening", JSON.stringify(opening));
  };

  const viewUpdateModal = (opening) => {
    setshowUpdateModal(!showUpdateModal);
    localStorage.setItem("__opening", JSON.stringify(opening));
  };

  const viewDeletionModal = (opening) => {
    setshowDeleteModal(!showDeleteModal);
    localStorage.setItem("__opening", JSON.stringify(opening));
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

  const onSuccess = (response) => {};

  //get career openings <--> request
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: careerOpenings,
  } = GetCareerOpeningsHook(onSuccess, onError);
  const allCareerOpenings = careerOpenings?.data?.result;

  // Pagination
  const totalDataSet = allCareerOpenings?.length;
  var currentDataItems = allCareerOpenings?.slice(itemOffset, endOffset);
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

  //copy job url to clipboard
  //copy to clipboard
  const copyToClipBoard = (param) => {
    console.log(param);
    navigator.clipboard.writeText(param);
    toast(`Link copied`, {
      position: "top-center",
      icon: "✅",
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });
  };
  return (
    <div className={styles.careersmanagementDashboard}>
      <Toaster reverseOrder={false} />
      <div className={styles.careersdataset}>
        <div className={styles.tableHeader}>
          <h6>Showing results for all career</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
                disabled={!allCareerOpenings}
                onChange={handleSearchChange}
              />
            </span>
            <button type="button" onClick={viewAdditionModal}>
              Add a new opening <MdAddTask size="20" />
            </button>
          </div>
        </div>
        <div className={styles.tableData}>
          {isLoading ? (
            <TableLoader />
          ) : (isSuccess && !allCareerOpenings) ||
            (isSuccess && allCareerOpenings?.length == 0) ? (
            <NoTableData />
          ) : (isSuccess && allCareerOpenings) ||
            (isSuccess && allCareerOpenings?.length > 0) ? (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Link</th>
                  <th>
                    <BsGear size={"20"} />
                  </th>
                </tr>
              </thead>
              <CareerPostList
                styles={styles}
                modalEvents={modalEvents}
                currentDataItems={currentDataItems}
                copyToClipBoard={copyToClipBoard}
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

        {allCareerOpenings && (
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
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewAdditionModal}>
            <Box sx={ModalStyle}>
              <AddCareerOpening styles={styles} closeForm={viewAdditionModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showPreviewModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDetailModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDetailModal}>
            <Box sx={ModalStyle}>
              <ViewCareerOpening styles={styles} closeForm={viewDetailModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showUpdateModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewUpdateModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewUpdateModal}>
            <Box sx={ModalStyle}>
              <UpdateCareerOpening
                styles={styles}
                closeForm={viewUpdateModal}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDeletionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDeletionModal}>
            <Box sx={ModalStyle}>
              <DeleteCareerOpening
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
