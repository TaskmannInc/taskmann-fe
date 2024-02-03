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
import AddSystemService from "../forms/mainServices/addMainService";
import DeleteSystemService from "../forms/mainServices/deleteMainService";
import { MainServicesList } from "../forms/mainServices/mainServiceList";
import UpdateSystemService from "../forms/mainServices/updateMainService";
import ViiewSystemService from "../forms/mainServices/viewMainService";
import AddSystemSubService from "../forms/subServices/addSubService";
import DeleteSystemSubService from "../forms/subServices/deleteSubService";
import UpdateSystemSubService from "../forms/subServices/updateSubService";
import ViewSystemSubService from "../forms/subServices/viewSubService";
import TablePaginationInstance from "./Pagination";

export default function MainServiceManagement({ styles }) {
  var iconSize = 15;
  //component states
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAdditionModal, setshowAdditionModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showSubServices, setShowSubServices] = useState(false);
  const [searchInput, setsearchInput] = useState("");

  const [showSubPreviewModal, setShowSubPreviewModal] = useState(false);
  const [showSubAdditionModal, setshowSubAdditionModal] = useState(false);
  const [showSubUpdateModal, setshowSubUpdateModal] = useState(false);
  const [showSubDeleteModal, setshowSubDeleteModal] = useState(false);

  //pagination states
  var itemsPerPage = 8;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //---->Modal event triggers<------//
  const viewDetailModal = (service) => {
    setShowPreviewModal(!showPreviewModal);
    localStorage.setItem("__service", JSON.stringify(service));
  };

  const viewAdditionModal = () => {
    setshowAdditionModal(!showAdditionModal);
  };

  const viewUpdateModal = (service) => {
    setshowUpdateModal(!showUpdateModal);
    localStorage.setItem("__service", JSON.stringify(service));
  };

  const viewDeletionModal = (service) => {
    setshowDeleteModal(!showDeleteModal);
    localStorage.setItem("__service", JSON.stringify(service));
  };

  //show show sub services related to current service
  const viewSubServices = (item) => {
    if (showSubServices === item) {
      return setShowSubServices(null);
    }
    setShowSubServices(item);
  };

  const modalEvents = {
    viewDetailModal,
    viewAdditionModal,
    viewUpdateModal,
    viewDeletionModal,
  };

  //---->Sub services modal event triggers<------//
  const viewSubDetailModal = (sub) => {
    setShowSubPreviewModal(!showSubPreviewModal);
    localStorage.setItem("__sub_service", JSON.stringify(sub));
  };

  const viewSubAddititonModal = (service) => {
    setshowSubAdditionModal(!showSubAdditionModal);
    localStorage.setItem("__rel_service", JSON.stringify(service?._id));
  };

  const viewSubUpdateModal = (sub) => {
    setshowSubUpdateModal(!showSubUpdateModal);
    localStorage.setItem("__sub_service", JSON.stringify(sub));
  };

  const viewSubDeletionModal = (sub) => {
    setshowSubDeleteModal(!showSubDeleteModal);
    localStorage.setItem("__sub_service", JSON.stringify(sub));
  };

  const subModalEvents = {
    viewSubDetailModal,
    viewSubAddititonModal,
    viewSubUpdateModal,
    viewSubDeletionModal,
  };
  //--get main service <--> request--//
  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = () => {};

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: serviceData,
  } = GetServicesHook(onSuccess, onError);
  const allMainServices = serviceData?.data?.result;
  //--get main service <--> request--//

  // Pagination
  const totalDataSet = allMainServices?.length;
  var currentDataItems = allMainServices?.slice(itemOffset, endOffset);
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
        result?.created_at?.match(new RegExp(searchInput, "i"))
      );
    });
  }

  return (
    <>
      <div className={styles.servicedataset}>
        <div className={styles.tableHeader}>
          <h6>Showing results for all services</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
                disabled={!allMainServices}
                onChange={handleSearchChange}
              />
            </span>
            <button type="button" onClick={viewAdditionModal}>
              Add service <MdAddTask size="20" />
            </button>
          </div>
        </div>
        <div className={styles.tableData}>
          {isLoading ? (
            <TableLoader />
          ) : (isSuccess && !allMainServices) ||
            (isSuccess && allMainServices?.length == 0) ? (
            <NoTableData />
          ) : (isSuccess && allMainServices) ||
            (isSuccess && allMainServices?.length > 0) ? (
            <table className={styles.mainServiceDataTable}>
              <thead>
                <tr>
                  <th># No.</th>
                  <th className={styles.coverColumn}>Cover</th>
                  <th>Service name</th>
                  <th>Description brief</th>
                  <th>Status</th>
                  <th>Date created</th>
                  <th>
                    <BsGear size={"20"} />
                  </th>
                </tr>
              </thead>
              <MainServicesList
                styles={styles}
                currentDataItems={currentDataItems}
                modalEvents={modalEvents}
                viewSubServices={viewSubServices}
                showSubServices={showSubServices}
                subModalEvents={subModalEvents}
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

        {allMainServices && (
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
      {/*--> Main service modals <--*/}
      {showAdditionModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewAdditionModal}
          onClose={viewAdditionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewAdditionModal}>
            <Box sx={ModalStyle}>
              <AddSystemService closeForm={viewAdditionModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showPreviewModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDetailModal}
          onClose={viewDetailModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDetailModal}>
            <Box sx={ModalStyle}>
              <ViiewSystemService closeForm={viewDetailModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showUpdateModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewUpdateModal}
          onClose={viewUpdateModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewUpdateModal}>
            <Box sx={ModalStyle}>
              <UpdateSystemService closeForm={viewUpdateModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewDeletionModal}
          onClose={viewDeletionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDeletionModal}>
            <Box sx={ModalStyle}>
              <DeleteSystemService closeForm={viewDeletionModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {/*--> Sub service modals <--*/}
      {showSubAdditionModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewSubAddititonModal}
          onClose={viewSubAddititonModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewSubAddititonModal}>
            <Box sx={ModalStyle}>
              <AddSystemSubService closeForm={viewSubAddititonModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showSubPreviewModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewSubDetailModal}
          onClose={viewSubDetailModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewSubDetailModal}>
            <Box sx={ModalStyle}>
              <ViewSystemSubService closeForm={viewSubDetailModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showSubUpdateModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewSubUpdateModal}
          onClose={viewSubUpdateModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewSubUpdateModal}>
            <Box sx={ModalStyle}>
              <UpdateSystemSubService closeForm={viewSubUpdateModal} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showSubDeleteModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewSubDeletionModal}
          onClose={viewSubDeletionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewSubDeletionModal}>
            <Box sx={ModalStyle}>
              <DeleteSystemSubService closeForm={viewSubDeletionModal} />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
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
