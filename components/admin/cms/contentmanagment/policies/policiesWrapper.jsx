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
import { GetPoliciesHook } from "../../../../utils/hooks/policiesHook";
import TablePaginationInstance from "../../../Globals/Pagination";
import { PoliciesList } from "./PoliciesDatalist";
import AddPolicies from "./addPolicy";
import DeletePolicies from "./deletePolicy";
import UpdatePolicies from "./updatePolicy";
import ViewPolicies from "./viewPolicy";

export default function PoliciesManagementWrapper({ styles }) {
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

  const viewDetailModal = (param) => {
    setShowPreviewModal(!showPreviewModal);
    localStorage.setItem("__policy", JSON.stringify(param));
  };

  const viewUpdateModal = (param) => {
    setshowUpdateModal(!showUpdateModal);
    localStorage.setItem("__policy", JSON.stringify(param));
  };

  const viewDeletionModal = (param) => {
    setshowDeleteModal(!showDeleteModal);
    localStorage.setItem("__policy", JSON.stringify(param));
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

  const onSuccess = () => {};

  //get career faqs <--> request
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: Policies,
  } = GetPoliciesHook(onSuccess, onError);
  const allPolicies = Policies?.data?.result;

  // Pagination
  const totalDataSet = allPolicies?.length;
  var currentDataItems = allPolicies?.slice(itemOffset, endOffset);
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
        result?.policy_name?.match(new RegExp(searchInput, "i")) ||
        result?.policy_description?.match(new RegExp(searchInput, "i"))
      );
    });
  }

  return (
    <div className={styles.policiesmanagementDashboard}>
      <div className={styles.policiesdataset}>
        <div className={styles.tableHeader}>
          <h6>Showing results for all policies</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
                disabled={!allPolicies}
                onChange={handleSearchChange}
              />
            </span>
            <button type="button" onClick={viewAdditionModal}>
              Add a new policy <MdAddTask size="20" />
            </button>
          </div>
        </div>
        <div className={styles.tableData}>
          {isLoading ? (
            <TableLoader />
          ) : (isSuccess && !allPolicies) ||
            (isSuccess && allPolicies?.length == 0) ? (
            <NoTableData />
          ) : (isSuccess && allPolicies) ||
            (isSuccess && allPolicies?.length > 0) ? (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th># No.</th>
                  <th>Policy title</th>
                  <th>Description brief</th>
                  <th>
                    <BsGear size={"20"} />
                  </th>
                </tr>
              </thead>
              <PoliciesList
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

        {allPolicies && (
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
          onClose={viewAdditionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewAdditionModal}>
            <Box sx={ModalStyle}>
              <AddPolicies styles={styles} closeForm={viewAdditionModal} />
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
              <ViewPolicies styles={styles} closeForm={viewDetailModal} />
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
              <UpdatePolicies styles={styles} closeForm={viewUpdateModal} />
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
              <DeletePolicies styles={styles} closeForm={viewDeletionModal} />
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
