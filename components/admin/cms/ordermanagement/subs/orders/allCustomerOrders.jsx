import { useState } from "react";
import { BsGear, BsLayers } from "react-icons/bs";
import { TableLoader } from "../../../../../ui-fragments/loaders";
import {
  ErrorInteraction,
  NoTableData,
} from "../../../../../ui-fragments/dataInteractions";
import TablePaginationInstance from "../../../../Globals/Pagination";
import { GetAdminOrderListHook } from "../../../../../utils/hooks/ordersMgmtHook";
import { FiSearch } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import AssignTaskOrder from "./assignOrder";
import ViewOrderDetails from "./viewOrder";
import { Toaster } from "react-hot-toast";

export default function AllOrders({ styles, iconSize }) {
  //component states
  var [allCustomerOrders, setAllCustomerOrders] = useState([]);
  const [searchOrdersInput, setSearchOrdersInput] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAssignmentModal, setshowAssignmentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
  const totalDataSet = allCustomerOrders?.length;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //--get orders and tasks error, success <--> on during, after, request--//
  const onOrderError = (response) => {
    console.log("orders error", response);
  };

  const onOrderSuccess = (data) => {
    console.log("allorder", data?.data?.data);
    setAllCustomerOrders(data?.data?.data);
  };

  const {
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    isSuccess: isOrdersSuccess,
    error: orderError,
    refetch: refetchOrders,
    isRefetching: refetchingOrders,
  } = GetAdminOrderListHook(onOrderSuccess, onOrderError);

  var currentDataItems = allCustomerOrders?.slice(itemOffset, endOffset);
  var pageCount = Math.ceil(allCustomerOrders?.length / itemsPerPage);

  //search functionality
  const handleOrderSearchChange = (e) => {
    e.preventDefault();
    setSearchOrdersInput(e.target.value);
  };

  if (searchOrdersInput.length > 0) {
    allCustomerOrders = allCustomerOrders?.filter((result) => {
      pageCount = Math.ceil(allCustomerOrders?.length / itemsPerPage);
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
      (event.selected * itemsPerPage) % allCustomerOrders?.length;
    setItemOffset(newOffset);
  };

  //modal hanlders
  const viewOrderAssignment = (order) => {
    setSelectedOrder(order);
    setshowAssignmentModal(!showAssignmentModal);
  };
  const viewDetailModal = (order) => {
    setSelectedOrder(order);
    setShowPreviewModal(!showPreviewModal);
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
            placeholder="Search customer orders..."
            disabled={!allCustomerOrders}
            onChange={handleOrderSearchChange}
          />
        </span>
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
      {isOrdersLoading || refetchingOrders ? (
        <TableLoader />
      ) : isOrdersSuccess && allCustomerOrders?.length > 0 ? (
        <>
          <section className={styles.tableVisualizers}>
            <div className={styles.customerOrders}>
              <h6>All orders</h6>
              <div className={styles.customerOrdersTable}>
                <div className={styles.tableHeader}>
                  <span>
                    <BsLayers size={15} />
                    &nbsp; ID
                  </span>
                  <span>Job</span>
                  <span>Date</span>
                  <span>Time</span>
                  <span>Location</span>
                  <span>Customer</span>

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
                          fontSize: "0.85rem",
                          fontWeight: "bolder",
                        }}
                      >
                        {orderItem?.cart?.line_items?.map((service, i) => (
                          <p key={i + 1}>
                            {service?.serviceName || service?.service_name}
                          </p>
                        ))}
                      </span>
                      <span>
                        {orderItem?.cart?.line_items?.map((service, i) => (
                          <p key={i + 1}>
                            {service?.service_date
                              ? new Date(
                                  service?.service_date?.split("T")[0]
                                )?.toLocaleDateString()
                              : "Unavailable"}{" "}
                          </p>
                        ))}
                      </span>
                      <span>
                        {orderItem?.cart?.line_items?.map((service, i) => (
                          <p key={i + 1}>
                            {service?.service_date
                              ? service?.service_date
                                  ?.split("T")[1]
                                  ?.split(".")[0]
                              : "Unavailable"}{" "}
                          </p>
                        ))}
                      </span>
                      <span>
                        {orderItem?.customer?.address?.length > 20
                          ? `${orderItem?.customer?.address?.slice(0, 20)}...`
                          : orderItem?.customer?.address}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          padding: 0,
                        }}
                      >
                        <small
                          style={{ fontSize: "0.8rem", fontWeight: "bolder" }}
                        >
                          {orderItem?.customer?.first_name}{" "}
                          {orderItem?.customer?.last_name}
                        </small>
                        <small>{orderItem?.customer?.phone} </small>
                        <small>{orderItem?.customer?.email} </small>
                      </span>

                      <span className={styles.statusColumn}>
                        <small
                          style={{
                            padding: "0.5rem 1rem",
                            textAlign: "center",
                            color: `var(--white)`,
                          }}
                          className={
                            orderItem?.payment?.status == "PAID"
                              ? "pill-success"
                              : orderItem?.status == "CANCELLED"
                              ? "pill-failure"
                              : "pill-other"
                          }
                        >
                          {orderItem?.payment?.status ?? "PENDING"}
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
                            style={{ color: `var(--gold)` }}
                          />
                        </button>
                        &nbsp;
                        {orderItem?.payment?.status == "PAID" &&
                          orderItem?.status != "ASSIGNED" && (
                            <button
                              title="Assign order to a tasker"
                              className={styles.editButton}
                              onClick={() => viewOrderAssignment(orderItem)}
                            >
                              <MdOutlineAssignmentInd
                                size={iconSize}
                                style={{ color: `var(--green-dark)` }}
                              />
                            </button>
                          )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {allCustomerOrders?.length > 0 && (
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
      ) : isOrdersSuccess && allCustomerOrders?.length == 0 ? (
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
      {showAssignmentModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewOrderAssignment}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewOrderAssignment}>
            <Box sx={ModalStyle}>
              <AssignTaskOrder
                selectedOrder={selectedOrder}
                closeModal={viewOrderAssignment}
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
              <ViewOrderDetails
                selectedOrder={selectedOrder}
                closeModal={viewDetailModal}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
