import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import {
  BsCart4,
  BsCash,
  BsFillArrowLeftCircleFill,
  BsTrash3,
} from "react-icons/bs";
import {
  FaArrowsAltH,
  FaBullhorn,
  FaBullseye,
  FaCheck,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import styles from "../../../styles/client/Cart.module.css";
import {
  ClientDownTime,
  NoCartData,
} from "../../ui-fragments/dataInteractions";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import { primaryCurrency } from "../../utils/constants/constants";
import {
  DeleteCartItemHook,
  GetLoggedInUserCart,
} from "../../utils/hooks/cartHook";
import {
  CheckoutCartItemsHook,
  MakePaymentHook,
} from "../../utils/hooks/orderHook";

import { useEffect } from "react";
import Cookies from "universal-cookie";
import { MdOutlineCancel } from "react-icons/md";
export default function SessionCart() {
  //initializations
  const cookie = new Cookies();
  const router = useRouter();
  const sessionAuth = sessionStorage?.getItem("TM_AC_TK");

  //redirect to login on unauthorization.
  useEffect(() => {
    if (!sessionAuth) {
      // router.push("/auth/login");
      console.log("session may have timed out");
    }
  }, []);

  const taxPercentage = 0.15;

  //component states
  const [cartInfo, setCartInfo] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [taxAmount, settaxAmount] = useState(0);
  const [subTotal, setsubTotal] = useState(0);
  const [totalAmountPayable, settotalAmountPayable] = useState(0);

  //get logged in user session cart info
  const onGetCartSuccess = (data) => {
    setCartInfo(data?.data?.data);
    setCartItems(data?.data?.data?.line_items);
    settaxAmount(parseFloat(0.15 * data?.data?.data?.total_price));
    setsubTotal(data?.data?.data?.total_price);
    settotalAmountPayable(parseFloat(data?.data?.data?.total_price));
  };

  const onGetCartError = (error) => {
    console.error(error);
  };

  const {
    isSuccess: getCartSuccess,
    isError: getCartError,
    isLoading: cartIsLoading,
    refetch,
  } = GetLoggedInUserCart(onGetCartSuccess, onGetCartError);

  //remove item from cart
  const handleRemoveCartItem = (_id) => {
    console.info("-->", _id);
    removeCartItem(_id);
  };

  const removeItemSuccess = (data) => {
    console.info(data);
  };

  const removeItemError = (error) => {
    console.log("error", error);
  };

  const {
    mutate: removeCartItem,
    isSuccess: removeCartItemIsSucess,
    isError: removeCartItemIsError,
    isLoading: removeCartItemLoading,
    error: removeCartItemError,
  } = DeleteCartItemHook(removeItemSuccess, removeItemError);

  //place order request
  const handleCheckoutCart = () => {
    orderCheckout(cartInfo?._id);
    console.info(cartInfo?._id);
  };

  const checkoutOrderSuccess = (data) => {
    console.info(data);
    return;
    // router.push("/orders");
  };

  const checkoutOrderError = (error) => {
    console.log("error", error);
    return;
  };

  const {
    mutate: orderCheckout,
    isSuccess: placeOrderSuccess,
    isError: placeOrderError,
    isLoading: placeOrderLoading,
    error: orderCheckoutError,
  } = MakePaymentHook(checkoutOrderSuccess, checkoutOrderError);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h1>My cart</h1>
        <Link href={"/services/all-services"} className={styles.backLink}>
          <BsFillArrowLeftCircleFill size={20} />
          &nbsp;&nbsp; Back to services
        </Link>
      </div>
      <div style={{ display: "flex", alignSelf: "center", width: "50%" }}>
        {removeCartItemLoading ? (
          <>
            <StatusNotification
              type={"unknown"}
              message={"Removing service from cart..."}
            />
            <LoaderIcon />
          </>
        ) : removeCartItemIsError ? (
          <StatusNotification
            type={"error"}
            message={`An error occured while removing cart item:
            ${
              removeCartItemError?.response?.data?.error ??
              removeCartItemError?.error?.message
            }`}
          />
        ) : removeCartItemIsSucess ? (
          <StatusNotification
            type={"success"}
            message={"Cart item removed successfully..."}
          />
        ) : null}
      </div>
      {cartIsLoading ? (
        <>
          {" "}
          <div className={`${styles.cartBody} blurred`}>
            <div className={styles.cartItemsHeader}>
              <span>Service</span>
              <span>Package pricing</span>
              <span>Total packages</span>
              <span></span>
            </div>
            {[...Array(3)]?.map((_, i) => {
              return (
                <div className={styles.cartItemsBody} key={i + 1}>
                  <div className={styles.serviceDetails}>
                    <FaBullseye size={10} />
                    <BsCart4
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
          <div className={`${styles.cartBodyMobileTab}`}>
            <div className={`${styles.mobileTabCartItem} blurred`}>Loading</div>
            Loading cart information ...
          </div>
        </>
      ) : getCartSuccess && cartItems?.length > 0 ? (
        <>
          <div className={styles.cartBody}>
            <div className={styles.cartItemsHeader}>
              <span>Service</span>
              <span>Package pricing</span>
              <span>Total packages</span>
              <span></span>
            </div>
            {cartItems?.map((item, i) => {
              return (
                <div className={styles.cartItemsBody} key={i + 1}>
                  <div className={styles.serviceDetails}>
                    <FaBullseye size={10} />
                    <BsCart4
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
                        {item?.service_name}
                      </span>
                      <small style={{ color: `var(--dark-2)` }}>
                        {new Date(item?.service_date)?.toLocaleDateString()}
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
                    {item?.packageDetails?.map((det, index) => (
                      <span
                        className={styles.packagePricing}
                        style={{ fontWeight: "semi-bold" }}
                        key={index + 1}
                      >
                        <span>{det?.title}</span>-
                        <span>
                          {det?.quantity ?? 0} * {det?.unitCost ?? 0} ={" "}
                          {det?.totalCost ?? 0}
                        </span>
                      </span>
                    ))}
                  </div>
                  <div>{item?.packageDetails?.length}</div>
                  <button
                    disabled={removeCartItemLoading || placeOrderLoading}
                    type="button"
                    className={styles.removeBtn}
                    title="Remove item"
                    onClick={() => handleRemoveCartItem(item?.id)}
                  >
                    <GrFormClose size={25} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.cartBodyMobileTab}>
            {cartItems?.map((item, i) => {
              return (
                <div className={styles.mobileTabCartItem} key={i + 1}>
                  <span className={styles.serviceName}>
                    <FaBullseye size={15} />
                    <span
                      title={item?.service_name}
                      style={{
                        fontSize: `var(--text-lg)`,
                        fontWeight: "600",
                      }}
                    >
                      {item?.service_name?.length > 50
                        ? `${item?.service_name?.slice(0, 50)}...`
                        : item?.service_name}
                    </span>
                  </span>
                  <div className={styles.packageDetails}>
                    <span className={styles.packageHeading}>
                      Service package details
                    </span>
                    {item?.packageDetails?.map((det, index) => (
                      <div
                        className={styles.packagePricing}
                        style={{ fontWeight: "semi-bold" }}
                        key={index + 1}
                      >
                        <span title={det?.title}>
                          <FaCheck size={8} /> &nbsp;
                          {det?.title?.length > 30
                            ? `${det?.title?.slice(0, 30)}...`
                            : det?.title}
                        </span>
                        <span>
                          <FaLongArrowAltRight size={10} />
                          {det?.quantity ?? 0} * {det?.unitCost ?? 0} ={" "}
                          {det?.totalCost ?? 0}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className={styles.bottomSection}>
                    <small style={{ color: `var(--gray-2)` }}>
                      Service date:{" "}
                      {new Date(item?.service_date)?.toLocaleDateString()}
                    </small>
                    <button
                      disabled={removeCartItemLoading || placeOrderLoading}
                      type="button"
                      className={styles.removeBtn}
                      title="Remove item"
                      onClick={() => handleRemoveCartItem(item?.id)}
                    >
                      <BsTrash3 size={25} />
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (getCartSuccess && cartItems?.length == 0) ||
        cartItems?.length == "undefined" ? (
        <NoCartData
          notification={
            "There are no items in your cart. Add some services to see them here..."
          }
        />
      ) : getCartError ? (
        <ClientDownTime
          notification={
            "An error occured while getting your cart items. Please refresh your page or try again later..."
          }
        />
      ) : (
        <NoCartData
          notification={
            "There are no items in your cart. Add some services to see them here..."
          }
        />
      )}
      <div className={styles.cartSummary}>
        <div className={styles.cartNotice}>
          <p>
            <FaBullhorn size={20} />{" "}
            <span>
              All servicing will be delivered on their respective service dates
              as indicated.
            </span>
          </p>
          <p>
            <FaBullhorn size={20} />{" "}
            <span>
              To request for a change in service date kindly reach out to the
              Taskmann team for help.
            </span>
          </p>
          <Link
            href={"/company/contact-us"}
            style={{
              width: "max-content",
              padding: "0.8rem 1rem",
              height: "max-content",
              borderRadius: "var(--radius-md)",
              border: "1pt solid var(--white)",
              alignSelf: "center",
            }}
          >
            Contact Us
          </Link>
        </div>
        <div className={styles.cartCheckout}>
          <h4>The amount you pay</h4>
          <div>
            <span className={styles.label}>
              Cart total amount for - {cartInfo?.total_items ?? 0} items
            </span>
            <FaArrowsAltH size={20} />
            <span className={styles.calcAmount}>
              {primaryCurrency}
              &nbsp;{cartInfo?.total_price || subTotal || "0"}
            </span>
          </div>
          <div>
            <span className={styles.label}>Total</span>
            <FaArrowsAltH size={20} />
            <span
              style={{
                fontWeight: "700",
                borderBottom: "1pt dashed black",
                paddingBottom: "0.5rem",
              }}
              className={styles.calcAmount}
            >
              {" "}
              {primaryCurrency}&nbsp;
              {totalAmountPayable == "NaN" || !totalAmountPayable
                ? 0
                : totalAmountPayable}
            </span>
          </div>
          <button
            className={styles.checkoutBtn}
            disabled={
              !(cartItems?.length > 0) || placeOrderLoading || placeOrderSuccess
            }
            type="button"
            onClick={handleCheckoutCart}
          >
            {placeOrderLoading ? (
              <ButtonLoader />
            ) : placeOrderError ? (
              <>Retry</>
            ) : (
              <>
                {" "}
                <BsCash size={20} />
                &nbsp;Checkout
              </>
            )}
          </button>
          {placeOrderError ? (
            <StatusNotification
              type={"error"}
              message={`An error occured:
              ${
                orderCheckoutError?.response?.data?.error ??
                orderCheckoutError?.message
              }`}
            />
          ) : placeOrderSuccess ? (
            <StatusNotification
              type={"success"}
              message={`Your order has been created. Head to your orders to pay now...`}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
