import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { BsFillArrowLeftCircleFill, BsThreeDots } from "react-icons/bs";
import { FaArrowRight, FaBullseye, FaLongArrowAltRight } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { MdOutlinePayments, MdPendingActions } from "react-icons/md";
import styles from "../../../styles/client/Orders.module.css";
import {
  ClientDownTime,
  NoOrderData,
} from "../../ui-fragments/dataInteractions";
import { primaryCurrency } from "../../utils/constants/constants";
import {
  GetLoggedInUserOrders,
  MakePaymentHook,
} from "../../utils/hooks/orderHook";

import Cookies from "universal-cookie";
import { useEffect } from "react";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { TbShoppingCartCancel } from "react-icons/tb";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import OrderActivities from "./orderActions";
import CustomServiceRequests from "./customRequest/customRequests";
import CustomRequestItem from "./customRequest/requestItem";

export default function SessionOrders() {
  //initializations
  const cookie = new Cookies();
  const router = useRouter();
  const sessionAuth = sessionStorage?.getItem("TM_AC_TK");

  //redirect to login on unauthorization.
  useEffect(() => {
    if (!sessionAuth) {
      router.push("/auth/login");
    }
  }, []);

  //component states
  const [ordersType, setOrdersType] = useState("prepaid");
  const [paymentURL, setPaymentURL] = useState("");
  const [orderInfo, setOrderInfo] = useState({});
  const [orderItems, setOrderItem] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSelectedRequest, setShowSelectedRequest] = useState(false);
  const [selectedCustomRequest, setSelectedCustomRequest] = useState(null);
  const [showActionsForm, setshowActionsForm] = useState(false);
  const [screenWidthMobile, setScreenWidthMobile] = useState(
    window.matchMedia("(min-width: 250px) and (max-width: 720px)").matches
  );
  const [screenWidthTablet, setScreenWidthTablet] = useState(
    window.matchMedia("(min-width:724px ) and (max-width:1024px)").matches
  );

  //change order view
  const handleChangeOrdersType = (param) => {
    setOrdersType(param);
  };

  //get logged in user session order(s) info
  const onGetOrderSuccess = (data) => {
    setOrderInfo(data?.data?.data);
    setOrderItem(data?.data?.data);
  };

  const onGetOrderError = (error) => {
    console.error(error);
  };

  const {
    isSuccess: getOrderSuccess,
    isError: getOrderError,
    isLoading: orderIsLoading,
    refetch,
  } = GetLoggedInUserOrders(onGetOrderSuccess, onGetOrderError);

  //make payment for selected order item request
  const triggerOrderItemsPayment = (data) => {
    makePayment(data);
  };

  const onPaymentTriggerSuccess = (data) => {
    setPaymentURL(data?.data?.data?.payment_details?.url);
  };

  const onPaymentTriggerError = (error) => {
    console.error("payment error", error);
  };

  const {
    mutate: makePayment,
    error: orderProcessingError,
    isLoading: orderPaymentLoading,
    isError: orderPaymentIsError,
    isSuccess: onTriggerSuccess,
  } = MakePaymentHook(onPaymentTriggerSuccess, onPaymentTriggerError);

  //mobile responsive screen effects and checks
  useEffect(() => {
    window
      .matchMedia("(min-width: 250px) and (max-width: 720px)")
      .addEventListener("change", (e) => setScreenWidthMobile(e.matches));

    window
      .matchMedia("(min-width:724px ) and (max-width:1024px)")
      .addEventListener("change", (e) => setScreenWidthTablet(e.matches));
  }, []);

  //--Material ui modal wrapper  styles--//
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: screenWidthMobile ? "90%" : screenWidthTablet ? "95%" : 800,
    maxHeight: screenWidthMobile ? "80vh" : screenWidthTablet ? "90vh" : "70vh",
    overflowY: "auto",
    bgcolor: `var(--white)`,
    border: "none",
    boxShadow: 24,
    borderRadius: `var(--radius-md)`,
    p: 2,
  };

  //show actions modal
  const viewActionsForm = (params) => {
    setSelectedOrder(params);
    setshowActionsForm(!showActionsForm);
  };
  //show actions modal
  const viewSelectedRequest = (params) => {
    setSelectedCustomRequest(params);
    setShowSelectedRequest(!showSelectedRequest);
  };

  const closeModal = () => {
    setshowActionsForm(false);
    setShowSelectedRequest(false);
  };

  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderHeader}>
        <h1>Order history</h1>
        {orderPaymentLoading ? (
          <span className="processing-order">
            Please wait while we process your order. You may be redirected&nbsp;
            &nbsp; &nbsp;
            <LoaderIcon />
          </span>
        ) : orderPaymentIsError ? (
          <span className="processing-order">
            An error occured while processing your order. Error:{" "}
            {orderProcessingError?.error ??
              orderProcessingError?.error?.message}
            <LoaderIcon />
          </span>
        ) : onTriggerSuccess ? (
          <span className="processing-order">
            Your order processing was successful. You will be redirected...
            <LoaderIcon />
          </span>
        ) : null}
        <div className={styles.orderTypeNavGroup}>
          <button
            onClick={() => handleChangeOrdersType("prepaid")}
            type="button"
            className={`${styles.orderTypeNavItem} ${
              ordersType == "prepaid" && styles.orderTypeNavItemActive
            }`}
          >
            Pre-paid
          </button>
          <button
            onClick={() => handleChangeOrdersType("custom")}
            type="button"
            className={`${styles.orderTypeNavItem} ${
              ordersType == "custom" && styles.orderTypeNavItemActive
            }`}
          >
            Custom/Special requests
          </button>
        </div>
        <Link href={"/services/all-services"} className={styles.backLink}>
          <BsFillArrowLeftCircleFill size={20} />
          &nbsp;&nbsp; Back to services
        </Link>
      </div>
      {/*Custom service requests*/}
      {ordersType == "custom" && (
        <>
          <CustomServiceRequests
            styles={styles}
            viewSelectedRequest={viewSelectedRequest}
          />
        </>
      )}
      {/*Prepaid orders*/}
      {ordersType == "prepaid" && (
        <>
          {orderIsLoading ? (
            <>
              <div className={`${styles.orderBody} blurred`}>
                <div className={styles.orderItemsHeader}>
                  <span>Service</span>
                  <span>Package pricing</span>
                  <span>Total packages</span>
                  <span></span>
                </div>
                {[...Array(2)]?.map((_, i) => {
                  return (
                    <div className={styles.orderItemsBody} key={i + 1}>
                      <div className={styles.serviceDetails}>
                        <FaBullseye size={10} />
                        <MdOutlinePayments
                          size={25}
                          style={{ color: `var(--green-primary)` }}
                        />
                        <div className={styles.serviceDetSub}>
                          <span
                            style={{
                              fontSize: `var(--text-lg)`,
                              fontWeight: "600",
                            }}
                          >
                            xxxxx ***** xxxx
                          </span>
                          <small style={{ color: `var(--dark-2)` }}>
                            xxxxx ***** xxxx
                          </small>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          rowGap: "0.45rem",
                        }}
                      >
                        {[...Array(2)]?.map((_, index) => (
                          <span
                            className={styles.packagePricing}
                            style={{ fontWeight: "semi-bold" }}
                            key={index + 1}
                          >
                            <span> xxxxx ***** xxxx</span>-
                            <span>xxxxx ***** xxxx</span>
                          </span>
                        ))}
                      </div>
                      <div> xxxxx ***** xxxx</div>

                      <GrFormClose size={25} />
                    </div>
                  );
                })}
              </div>
              <div
                className={`${styles.orderBodyMobileTab} blurred`}
                style={{
                  height: "5rem",
                  width: "98%",
                  backgroundColor: "var(--green-primary)",
                }}
              >
                Loading order items ...
              </div>
            </>
          ) : getOrderSuccess && orderItems?.length > 0 ? (
            <>
              <div className={styles.orderBody}>
                <div className={styles.orderItemsHeader}>
                  <span>Order ID</span>
                  <span>Order Items</span>
                  <span>Total items</span>
                  <span>Cost</span>
                  <span>Codes</span>
                  <span
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Order status
                  </span>
                  <span
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Task status
                  </span>
                  <span style={{ textAlign: "center" }} title="Payment actions">
                    <BsThreeDots size={25} />
                  </span>
                </div>
                <>
                  {orderItems?.map((order, i) => {
                    return (
                      <div className={styles.orderItemsBody} key={i + 1}>
                        <div>
                          <span
                            style={{
                              fontWeight: 600,
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              fontSize: "0.75rem",
                            }}
                          >
                            <AiFillCodeSandboxCircle size={20} />
                            ****-{order?._id?.split("-")[4]}
                          </span>
                        </div>
                        <div className={styles.orderDetails}>
                          {order?.cart?.line_items?.map((orderItem, index) => (
                            <span
                              className={styles.orderPackage}
                              style={{ fontWeight: "semi-bold" }}
                              key={index + 1}
                            >
                              <span>
                                {orderItem?.service_name?.length > 100
                                  ? orderItem?.service_name?.slice(0, 99)
                                  : orderItem?.service_name}
                              </span>{" "}
                              <FaLongArrowAltRight size={15} />
                              <small
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  rowGap: "0.5rem",
                                }}
                              >
                                Service date:&nbsp;
                                <b>
                                  {new Date(
                                    orderItem?.service_date
                                  )?.toLocaleDateString()}
                                </b>
                                <b>
                                  {new Date(
                                    orderItem?.service_date
                                  )?.toLocaleTimeString()}
                                </b>
                              </small>
                            </span>
                          ))}
                        </div>
                        <div>{order?.cart?.line_items?.length}</div>
                        <div>
                          {primaryCurrency} &nbsp;
                          {order?.cart?.total_price}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            rowGap: "0.25rem",
                            fontWeight: "bold",
                          }}
                        >
                          <small
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            progress&nbsp;
                            <FaArrowRight size={15} /> &nbsp;
                            {order?.inprogress_code ?? "none"}
                          </small>
                          <small
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            completion&nbsp;
                            <FaArrowRight size={15} /> &nbsp;
                            {order?.completed_code ?? "none"}
                          </small>
                          <small
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            cancellation&nbsp;
                            <FaArrowRight size={15} /> &nbsp;
                            {order?.cancellation_code ?? "none"}
                          </small>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {order?.payment?.status == "PAID" ? (
                            <span
                              style={{
                                fontSize: `var(--text-sm)`,
                                width: "70%",
                                textAlign: "center",
                                borderRadius: `var(--radius-min)`,
                                padding: "0.35rem 0.5rem",
                                background: `var(--success)`,
                                color: `var(--white)`,
                                boxShadow: `var(--cards-shadow-2)`,
                              }}
                            >
                              PAID
                            </span>
                          ) : order?.payment?.status == "CANCELLED" ? (
                            <span
                              style={{
                                fontSize: `var(--text-sm)`,
                                width: "70%",
                                textAlign: "center",
                                borderRadius: `var(--radius-min)`,
                                padding: "0.35rem 0.5rem",
                                background: `var(--danger)`,
                                color: `var(--white)`,
                                boxShadow: `var(--cards-shadow-2)`,
                              }}
                            >
                              CANCELLED
                            </span>
                          ) : (
                            <Link
                              style={{
                                fontSize: `var(--text-sm)`,
                                width: "70%",
                                fontWeight: 700,
                                height: "max-content",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "var(--radius-min)",
                                backgroundColor: `var(--gray-2)`,
                                textAlign: "center",
                                color: `var(--white)`,
                              }}
                              disabled={orderPaymentLoading}
                              type="button"
                              className={styles.paymentBtn}
                              title="Pay for order"
                              target="_blank"
                              href={`${order?.payment?.payment_details?.url}`}
                              // onClick={() => triggerOrderItemsPayment(order?._id)}
                            >
                              PAY
                            </Link>
                          )}
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: `var(--text-sm)`,
                              width: "70%",
                              textAlign: "center",
                              borderRadius: `var(--radius-min)`,
                              padding: "0.35rem 0.5rem",
                              backgroundColor: `${
                                order?.status == "PENDING"
                                  ? "var(--dark-2)"
                                  : order?.status == "COMPLETED"
                                  ? "var(--success)"
                                  : order?.status == "ASSIGNED"
                                  ? "var(--black-2)"
                                  : order?.status == "CANCELLED"
                                  ? "var(--danger)"
                                  : "var(--dark-gray)"
                              }`,
                              color: `var(--white)`,
                              boxShadow: `var(--cards-shadow-2)`,
                            }}
                          >
                            {order?.status ?? "Unavailable"}
                          </span>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <button
                            style={{
                              borderRadius: `var(--radius-circular)`,
                              padding: `0.2rem 0.25rem`,
                            }}
                            onClick={() => viewActionsForm(order)}
                            type="button"
                            title="Cancel order"
                            disabled={
                              order?.payment?.status !== "PAID" ||
                              order?.status == "CANCELLED"
                            }
                          >
                            <TbShoppingCartCancel
                              size={20}
                              color="var(--danger)"
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              </div>
              <div className={styles.orderBodyMobileTab}>
                <>
                  {orderItems?.map((order, i) => {
                    return (
                      <div className={styles.orderItem} key={i + 1}>
                        <span className={styles.orderId}>
                          <AiFillCodeSandboxCircle size={25} />
                          Order ****-{order?._id?.split("-")[4]}
                        </span>
                        <div className={styles.orderCartItems}>
                          {order?.cart?.line_items?.map((orderItem, index) => (
                            <div
                              className={styles.orderPackage}
                              style={{ fontWeight: "semi-bold" }}
                              key={index + 1}
                            >
                              <span style={{ float: "right", width: "100%" }}>
                                {orderItem?.service_name?.length > 30
                                  ? orderItem?.service_name?.slice(0, 30)
                                  : orderItem?.service_name}
                              </span>
                              <small className={styles.serviceDate}>
                                <span>Service date:</span>

                                <b>
                                  {new Date(
                                    orderItem?.service_date
                                  )?.toLocaleDateString()}
                                  &nbsp;at&nbsp;
                                  {new Date(
                                    orderItem?.service_date
                                  )?.toLocaleTimeString()}
                                </b>
                              </small>
                            </div>
                          ))}
                        </div>
                        <hr></hr>
                        <div className={styles.orderPricing}>
                          <span>Order amount:</span>
                          <span>
                            {primaryCurrency} &nbsp;
                            {order?.cart?.total_price}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            rowGap: "0.25rem",
                            fontWeight: "bold",
                          }}
                        >
                          <small
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>progress code:</span>
                            <FaArrowRight size={15} />
                            {order?.inprogress_code ?? "none"}
                          </small>
                          <small
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>completion code:</span>
                            <FaArrowRight size={15} />
                            {order?.completed_code ?? "none"}
                          </small>
                          <small
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>cancellation code:</span>
                            <FaArrowRight size={15} />
                            {order?.cancellation_code ?? "none"}
                          </small>
                        </div>

                        {order?.payment?.status == "PAID" ? (
                          <span
                            style={{
                              width: "100%",
                              textAlig: "center",
                              borderRadius: `var(--radius-min)`,
                              padding: "0.35rem 0.5rem",
                              color: `var(--success)`,
                              background: `var(--white)`,
                              boxShadow: `var(--cards-shadow-1)`,
                            }}
                          >
                            Order status: PAID
                          </span>
                        ) : order?.payment?.status == "CANCELLED" ? (
                          <span
                            style={{
                              width: "100%",
                              textAlig: "center",
                              borderRadius: `var(--radius-min)`,
                              padding: "0.35rem 0.5rem",
                              color: `var(--danger)`,
                              background: `var(--white)`,
                              boxShadow: `var(--cards-shadow-1)`,
                            }}
                          >
                            Order status: CANCELLED
                          </span>
                        ) : (
                          <Link
                            style={{
                              width: "100%",
                              fontWeight: 700,
                              height: "max-content",
                              padding: "0.75rem 1.5rem",
                              borderRadius: "var(--radius-min)",
                              backgroundColor: `var(--green-primary)`,
                              textAlign: "center",
                              color: `var(--white)`,
                            }}
                            disabled={orderPaymentLoading}
                            type="button"
                            className={styles.paymentBtn}
                            title="Pay for order"
                            target="_blank"
                            href={`${order?.payment?.payment_details?.url}`}
                            // onClick={() => triggerOrderItemsPayment(order?._id)}
                          >
                            PAY
                          </Link>
                        )}
                        <span
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textAlign: "center",
                            borderRadius: `var(--radius-min)`,
                            padding: "0.35rem 0.5rem",
                            color: `${
                              order?.status == "PENDING"
                                ? "var(--dark-2)"
                                : order?.status == "ASSIGNED"
                                ? "var(--black-2)"
                                : order?.status == "CANCELLED"
                                ? "var(--danger)"
                                : "var(--dark-gray)"
                            }`,
                            backgroundColor: `var(--white)`,
                            boxShadow: `var(--cards-shadow-1)`,
                          }}
                        >
                          <span>
                            Task status: {order?.status ?? "Unavailable"}
                          </span>{" "}
                          <div style={{ textAlign: "center" }}>
                            <button
                              style={{
                                borderRadius: `var(--radius-circular)`,
                                padding: `0.2rem 0.25rem`,
                              }}
                              onClick={() => viewActionsForm(order)}
                              type="button"
                              title="Cancel order"
                              disabled={
                                order?.payment?.status !== "PAID" ||
                                order?.status == "CANCELLED" ||
                                order?.status == "COMPLETED"
                              }
                            >
                              <TbShoppingCartCancel
                                size={25}
                                color="var(--danger)"
                              />
                            </button>
                          </div>
                        </span>
                      </div>
                    );
                  })}
                </>
              </div>
            </>
          ) : (getOrderSuccess && orderItems?.length == 0) ||
            orderItems?.length == "undefined" ? (
            <NoOrderData
              notification={
                "There are no order items here. Checkout from your cart to see your orders here..."
              }
            />
          ) : getOrderError ? (
            <>
              <ClientDownTime
                notification={
                  "An error occured while getting your order items. Please refresh your page or try again later..."
                }
              />
            </>
          ) : (
            <NoOrderData
              notification={
                "There are no order items here. Checkout from your cart to see your orders here..."
              }
            />
          )}
        </>
      )}
      {showActionsForm && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewActionsForm}
          onClose={viewActionsForm}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewActionsForm}>
            <Box sx={ModalStyle}>
              <OrderActivities
                closeForm={closeModal}
                styles={styles}
                selectedOrder={selectedOrder}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {showSelectedRequest && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewSelectedRequest}
          onClose={viewSelectedRequest}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewSelectedRequest}>
            <Box sx={ModalStyle}>
              <CustomRequestItem
                closeModal={viewSelectedRequest}
                styles={styles}
                selectedCustomRequest={selectedCustomRequest}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
