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
import {
  GetSubServicesHook,
  GetSubServicesPriceTierHook,
} from "../../../../utils/hooks/serviceMgmtHook";
import AddServicePriceTier from "../forms/priceTiers/addPriceTier";
import DeleteServicePriceTier from "../forms/priceTiers/deletePriceTier";
import { PriceTierDataList } from "../forms/priceTiers/priceTierList";
import UpdateServicePriceTier from "../forms/priceTiers/updatePriceTier";
import ViewServicePriceTier from "../forms/priceTiers/viewPriceTier";
import TablePaginationInstance from "./Pagination";

export default function PriceTierManagement({ styles }) {
  var iconSize = 15;
  //component states
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAdditionModal, setshowAdditionModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [__selected_tier, setSelectedTier] = useState(null);
  const [searchInput, setsearchInput] = useState("");
  const [subServices, setSubservices] = useState([]);

  //pagination states
  var itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //---->Modal event triggers<------//
  const viewAddititonModal = () => {
    setshowAdditionModal(!showAdditionModal);
  };

  const viewDetailModal = (tier) => {
    setSelectedTier(tier);
    setShowPreviewModal(!showPreviewModal);
    localStorage.setItem("__tier", JSON.stringify(tier));
  };

  const viewUpdateModal = (tier) => {
    setSelectedTier(tier);
    setshowUpdateModal(!showUpdateModal);
    localStorage.setItem("__tier", JSON.stringify(tier));
  };

  const viewDeletionModal = (tier) => {
    setSelectedTier(tier);
    setshowDeleteModal(!showDeleteModal);
    localStorage.setItem("__tier", JSON.stringify(tier));
  };

  const modalEvents = {
    viewDetailModal,
    viewAddititonModal,
    viewUpdateModal,
    viewDeletionModal,
  };

  //getting sub services
  var subServicesArray = [];
  const onSubServicesSuccess = (data) => {
    const newArray = data?.data?.result;
    if (newArray?.length > 0) {
      for (let i = 0; i < newArray?.length; i++) {
        subServicesArray.push({
          val: newArray[i]?._id,
          name: newArray[i]?.sub_service_name,
        });
      }
      setSubservices(subServicesArray);
    } else {
      setSubservices(subServicesArray);
    }
  };

  const onSubServicesError = (error) => {
    // console.log("error: ", error.message);
  };

  const {
    isLoading: subsLoading,
    isError: subisError,
    error: subError,
    isSuccess: isSubError,
    data: subserviceData,
  } = GetSubServicesHook(onSubServicesSuccess, onSubServicesError);

  const onError = (response) => {
    console.log("error", response);
  };

  const onSuccess = () => {};

  //get sub service <--> request
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: priceTierData,
  } = GetSubServicesPriceTierHook(onSuccess, onError);
  const allPriceTiers = priceTierData?.data?.result;

  // Pagination
  const totalDataSet = allPriceTiers?.length;
  var currentDataItems = allPriceTiers?.slice(itemOffset, endOffset);
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
        result?.tier_name?.match(new RegExp(searchInput, "i")) ||
        result?.description?.match(new RegExp(searchInput, "i")) ||
        result?.price?.match(new RegExp(searchInput, "i")) ||
        result?.active?.match(new RegExp(searchInput, "i"))
      );
    });
  }

  return (
    <>
      <div className={styles.servicedataset}>
        <div className={styles.tableHeader}>
          <h6>Showing results for all price tiers</h6>
          <div className={styles.headerActions}>
            <span className={styles.searchContainer}>
              <FiSearch size={iconSize} />{" "}
              <input
                type="search"
                className={styles.searchinput}
                placeholder="Search here..."
                onChange={handleSearchChange}
                disabled={!allPriceTiers}
              />
            </span>
            <button type="button" onClick={viewAddititonModal}>
              Add price tier <MdAddTask size="20" />
            </button>
          </div>
        </div>
        <div className={styles.priceTableData}>
          {isLoading ? (
            <TableLoader />
          ) : (isSuccess && !allPriceTiers) ||
            (isSuccess && allPriceTiers?.length == 0) ? (
            <NoTableData />
          ) : (isSuccess && allPriceTiers) ||
            (isSuccess && allPriceTiers?.length > 0) ? (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th># No.</th>
                  <th>Tier name</th>
                  <th>Description</th>
                  <th>
                    <span
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.8rem",
                      }}
                    >
                      CAD $
                    </span>
                    &nbsp; Price
                  </th>
                  <th>Status</th>
                  <th>
                    <BsGear size={"20"} />
                  </th>
                </tr>
              </thead>
              <PriceTierDataList
                styles={styles}
                currentDataItems={currentDataItems}
                modalEvents={modalEvents}
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
        {allPriceTiers && (
          <div className="pagination-section">
            <div className="pagination-text">
              <p>
                Showing <strong>{currentDataItems?.length ?? 0}</strong> out of{" "}
                <strong>{totalDataSet ?? 0}</strong> items.
              </p>
            </div>
            <TablePaginationInstance
              pageCount={pageCount}
              changePage={handlePageClick}
            />
          </div>
        )}
      </div>
      {showAdditionModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewAddititonModal}
          // onClose={viewAddititonModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewAddititonModal}>
            <Box sx={ModalStyle}>
              <AddServicePriceTier
                closeForm={viewAddititonModal}
                subServices={subServices}
              />
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
              <ViewServicePriceTier
                styles={ModalStyle}
                closeForm={viewDetailModal}
                subServices={subServices}
                __selected_tier={__selected_tier}
              />
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
              <UpdateServicePriceTier
                closeForm={viewUpdateModal}
                subServices={subServices}
                __selected_tier={__selected_tier}
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
          // onClose={viewDeletionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDeletionModal}>
            <Box sx={ModalStyle}>
              <DeleteServicePriceTier
                closeForm={viewDeletionModal}
                __selected_tier={__selected_tier}
              />
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
  borderRadius: `var(--radius-sm)`,
  p: 2,
};
