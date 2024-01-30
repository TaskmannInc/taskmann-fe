import { useState } from "react";
import { BsGear, BsLayers } from "react-icons/bs";
import { TableLoader } from "../../../../../ui-fragments/loaders";
import {
  ErrorInteraction,
  NoTableData,
} from "../../../../../ui-fragments/dataInteractions";
import TablePaginationInstance from "../../../../Globals/Pagination";
import {
  GetAdminOrderListHook,
  GetAdminSpecialRequestListingsHook,
} from "../../../../../utils/hooks/ordersMgmtHook";
import { FiSearch } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import AssignTaskOrder from "./assignOrder";
import ViewOrderDetails from "./viewOrder";
import { Toaster } from "react-hot-toast";
import AdminCustomRequestItem from "./viewCustomOrder";
import { primaryCurrency } from "../../../../../utils/constants/constants";
import PlaceCustomServiceOrder from "./placeCustomOrder";
import UpdateExistingCustomOrder from "./updateCustomOrder";

export default function AllSpecialOrders({ styles, iconSize }) {
  //component states
  var [allSpecialCustomerOrders, setallSpecialCustomerOrders] = useState([]);
  const [searchOrdersInput, setSearchOrdersInput] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showupdatePlacedOrder, setshowupdatePlacedOrder] = useState(false);
  const [showOrderPlacement, setshowOrderPlacement] = useState(false);
  const [selectedSpecialRequest, setselectedSpecialRequest] = useState(null);

  //--Material ui modal wrapper  styles--//
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: showPreviewModal ? 700 : 500,
    maxHeight: "70vh",
    overflowY: "auto",
    bgcolor: `var(--white)`,
    border: "none",
    boxShadow: 24,
    borderRadius: `var(--radius-md)`,
    p: 2,
  };

  // Pagination
  var itemsPerPage = 7;
  const totalDataSet = allSpecialCustomerOrders?.length;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //--get orders and tasks error, success <--> on during, after, request--//
  const onOrderError = (response) => {
    console.log("orders error", response);
  };

  const onOrderSuccess = (data) => {
    console.log("allorder====>", data?.data?.data);
    setallSpecialCustomerOrders(data?.data?.data);
  };

  const {
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    isSuccess: isOrdersSuccess,
    error: orderError,
    refetch: refetchOrders,
    isRefetching: refetchingOrders,
  } = GetAdminSpecialRequestListingsHook(onOrderSuccess, onOrderError);

  var currentDataItems = allSpecialCustomerOrders?.slice(itemOffset, endOffset);
  var pageCount = Math.ceil(allSpecialCustomerOrders?.length / itemsPerPage);

  //search functionality
  const handleOrderSearchChange = (e) => {
    e.preventDefault();
    setSearchOrdersInput(e.target.value);
  };

  if (searchOrdersInput.length > 0) {
    allSpecialCustomerOrders = allSpecialCustomerOrders?.filter((result) => {
      pageCount = Math.ceil(allSpecialCustomerOrders?.length / itemsPerPage);
      return (
        result?.customer?.first_name?.match(
          new RegExp(searchOrdersInput, "i")
        ) ||
        result?.customer?.last_name?.match(
          new RegExp(searchOrdersInput, "i")
        ) ||
        result?.customer?.phone?.match(new RegExp(searchOrdersInput, "i")) ||
        result?.customer?.email?.match(new RegExp(searchOrdersInput, "i")) ||
        (
          result?.customer?.first_name +
          " " +
          result?.customer?.last_name
        )?.match(new RegExp(searchOrdersInput, "i")) ||
        (
          result?.customer?.last_name +
          " " +
          result?.customer?.first_name
        )?.match(new RegExp(searchOrdersInput, "i"))
      );
    });
  }

  //page numbers click event handler
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % allSpecialCustomerOrders?.length;
    setItemOffset(newOffset);
  };

  //modal handlers
  const updateCustomOrderPlaced = (param) => {
    setselectedSpecialRequest(param);
    setshowupdatePlacedOrder(!showOrderPlacement);
  };
  const triggerCustomOrderPlacement = () => {
    setshowOrderPlacement(!showOrderPlacement);
  };

  const viewDetailModal = (order) => {
    setselectedSpecialRequest(order);
    setShowPreviewModal(!showPreviewModal);
  };

  const closeAdminModal = () => {
    setshowupdatePlacedOrder(false);
    setshowOrderPlacement(false);
    setShowPreviewModal(false);
  };
  return (
    <>
      <Toaster reverseOrder={false} />
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span
          className={styles.searchContainer}
          style={{
            alignSelf: "flex-end",
          }}
        >
          <FiSearch size={iconSize} />{" "}
          <input
            readOnly={refetchingOrders || isOrdersLoading}
            type="search"
            className={styles.searchinput}
            placeholder="Search special orders..."
            disabled={!allSpecialCustomerOrders}
            onChange={handleOrderSearchChange}
          />
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "1rem",
            width: "max-content",
          }}
        >
          <button
            title="Place a special request"
            className="action-btn"
            type="button"
            style={{
              backgroundColor: `var(--white)`,
              padding: "0.4rem 0.5rem",
            }}
            onClick={() => triggerCustomOrderPlacement()}
          >
            <FaPlus size={20} />
          </button>
          <button
            title="Refetch orders"
            className="refetchButton"
            type="button"
            onClick={() => refetchOrders()}
            disabled={refetchingOrders || isOrdersLoading}
          >
            <TbReload size={20} />
          </button>
        </div>
      </div>
      {isOrdersLoading || refetchingOrders ? (
        <TableLoader />
      ) : isOrdersSuccess && allSpecialCustomerOrders?.length > 0 ? (
        <>
          <section className={styles.tableVisualizers}>
            <div className={styles.customerOrders}>
              <h6>All custom requests</h6>
              <div className={styles.customerOrdersTable}>
                <div className={styles.tableHeader}>
                  <span>
                    <BsLayers size={15} />
                    &nbsp; ID
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Date requested
                  </span>
                  <span>Last updated</span>
                  <span>Budget / Cost</span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Proposed service period
                  </span>

                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Customer
                  </span>

                  <span className={styles.statusColumn}>Payment status</span>
                  <span className={styles.actionColumn}>
                    <BsGear size={"20"} />
                  </span>
                </div>
                <div className={styles.tableBody}>
                  {currentDataItems?.map((orderItem, index) => (
                    <div key={index + 1} className={styles.tableRow}>
                      <span>
                        <b>{index + 1}.</b> &nbsp;***-
                        {orderItem?._id?.slice(23, 39)}
                      </span>

                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {new Date(orderItem?.created_at)?.toLocaleDateString()}
                      </span>
                      <span>
                        {new Date(orderItem?.updated_at)?.toLocaleDateString()}
                      </span>

                      <span>
                        {primaryCurrency}&nbsp;
                        {orderItem?.budget}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "bolder",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <small>{`${new Date(
                          orderItem?.start_date_time
                        ).toLocaleDateString()}, ${new Date(
                          orderItem?.start_date_time
                        ).toLocaleTimeString()}`}</small>
                        -
                        <small>{`${new Date(
                          orderItem?.end_date
                        ).toLocaleDateString()}`}</small>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 0,
                        }}
                      >
                        {orderItem?.customer && (
                          <>
                            <small
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {orderItem?.customer?.first_name}{" "}
                              {orderItem?.customer?.last_name}
                            </small>
                            <small>{orderItem?.customer?.phone} </small>
                            <small
                              style={{
                                paddingBottom: "0.5rem",
                              }}
                            >
                              {orderItem?.customer?.email}{" "}
                            </small>
                          </>
                        )}
                        {!orderItem?.customer && (
                          <>
                            <small
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {orderItem?.firstname} {orderItem?.lastname}
                            </small>
                            <small>{orderItem?.phone} </small>
                            <small
                              style={{
                                paddingBottom: "0.5rem",
                                borderBottom: "1pt solid var(--gray-3)",
                              }}
                            >
                              {orderItem?.email}{" "}
                            </small>
                            {"(Staff requested)"}
                          </>
                        )}
                      </span>

                      <span className={styles.statusColumn}>
                        <small
                          style={{
                            borderRadius: `var(--radius-circular)`,
                            textTransform: "capitalize",
                            padding: "0.5rem 1rem",
                            textAlign: "center",
                            color: `var(--white)`,
                            backgroundColor: `${
                              orderItem?.status == "requested"
                                ? "var(--dark-2)"
                                : orderItem?.status == "completed"
                                ? "var(--success)"
                                : orderItem?.status == "inprogress"
                                ? "var(--black-2)"
                                : orderItem?.status == "cancelled"
                                ? "var(--danger)"
                                : "var(--dark-gray)"
                            }`,
                            color: `var(--white)`,
                          }}
                        >
                          {orderItem?.status}
                        </small>
                      </span>
                      <span>
                        <button
                          title="View invoice"
                          className={styles.viewButton}
                          onClick={() => viewDetailModal(orderItem)}
                        >
                          <FaEye
                            size={iconSize}
                            style={{ color: `var(--dark-2)` }}
                          />
                        </button>{" "}
                        &nbsp;
                        <button
                          title="Update "
                          className={styles.viewButton}
                          onClick={() => updateCustomOrderPlaced(orderItem)}
                        >
                          <FaEdit
                            size={iconSize}
                            style={{ color: `var(--green-dark)` }}
                          />
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {allSpecialCustomerOrders?.length > 0 && (
            <div className="pagination-section">
              <div className="pagination-text">
                <p>
                  Showing <strong>{currentDataItems?.length ?? 0}</strong> out
                  of <strong>{totalDataSet ?? 0}</strong> items.
                </p>
              </div>
              <TablePaginationInstance
                pageCount={pageCount}
                changePage={handlePageClick}
              />
            </div>
          )}
        </>
      ) : isOrdersSuccess && allSpecialCustomerOrders?.length == 0 ? (
        <NoTableData />
      ) : (
        isOrdersError && (
          <NoTableData
            notification={
              orderError?.error ??
              "An error occured while getting all system tasks, please try again later."
            }
          />
        )
      )}
      {showOrderPlacement && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={triggerCustomOrderPlacement}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={triggerCustomOrderPlacement}>
            <Box sx={ModalStyle}>
              <PlaceCustomServiceOrder
                closeModal={triggerCustomOrderPlacement}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {showupdatePlacedOrder && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={updateCustomOrderPlaced}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={updateCustomOrderPlaced}>
            <Box sx={ModalStyle}>
              <UpdateExistingCustomOrder
                selectedSpecialRequest={selectedSpecialRequest}
                closeAdminModal={closeAdminModal}
                styles={styles}
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
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewDetailModal}>
            <Box sx={ModalStyle}>
              <AdminCustomRequestItem
                selectedSpecialRequest={selectedSpecialRequest}
                closeModal={viewDetailModal}
                styles={styles}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
