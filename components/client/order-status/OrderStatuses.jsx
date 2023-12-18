import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/client/Orders.module.css";
import { GetLoggedInUserOrders } from "../../utils/hooks/orderHook";

import { useEffect } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import {
  ErrorInteraction,
  SuccessInteraction,
} from "../../ui-fragments/dataInteractions";
export default function OrderPaymentStatus() {
  //initializations
  const cookie = new Cookies();
  const router = useRouter();
  const sessionAuth = cookie.get("TM_AC_TK");
  const pathQuery = router?.query?.q;
  console.log(pathQuery);
  const [orderStatus, setOrderStatus] = useState("");

  //redirect to login on unauthorization.
  useEffect(() => {
    if (!sessionAuth) {
      router.push("/auth/login");
    }
    setOrderStatus(pathQuery);
  }, []);

  //component states
  const [paymentURL, setPaymentURL] = useState("");
  const [orderInfo, setOrderInfo] = useState({});
  const [orderItems, setOrderItem] = useState([]);

  //get logged in user session order(s) info
  const onGetOrderSuccess = (data) => {
    setOrderInfo(data?.data?.data);
    setOrderItem(data?.data?.data);
    console.info("orders", data?.data?.data);
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

  return (
    <div className={styles.orderStatusContainers}>
      <div className={styles.orderDetails}>
        <div className={styles.orderInteraction}>
          {orderStatus == "success" ? (
            <SuccessInteraction
              notification={"Your order payment was processed successfully ..."}
            />
          ) : (
            <ErrorInteraction
              notification={
                "Hmm... An error occured while processing your payment. Please try again later ..."
              }
            />
          )}
        </div>
        <div className={styles.orderActions}>
          <Link
            href={"/services/all-services"}
            className={`${styles.orderActLink} ${styles.serviceLnk}`}
          >
            <BsFillArrowLeftCircleFill size={25} /> Head back to services
          </Link>
          <Link
            href={"/orders"}
            className={`${styles.orderActLink} ${styles.historyLnk}`}
          >
            Review order history <BsFillArrowRightCircleFill size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
}
