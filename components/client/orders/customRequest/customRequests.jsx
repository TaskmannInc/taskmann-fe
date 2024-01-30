import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";
import { GetLoggedInUserRequest } from "../../../utils/hooks/orderHook";
import {
  ClientDownTime,
  NoOrderData,
} from "../../../ui-fragments/dataInteractions";
import { useState } from "react";

export default function CustomServiceRequests({ styles, viewSelectedRequest }) {
  const [sessionCustomRequest, setSessionRustomRequest] = useState([]);

  //get logged in user session order(s) info
  const onGetRequestsSuccess = (response) => {
    setSessionRustomRequest(response?.data?.data);
  };

  const onGetRequestsError = (error) => {
    console.error(error);
  };

  const {
    isSuccess: getRequestSuccess,
    isError: getRequestError,
    isLoading: requestsLoading,
    isRefetching,
    is,
  } = GetLoggedInUserRequest(onGetRequestsSuccess, onGetRequestsError);

  const customRequestStatus = "PENDING";
  return (
    <div className={styles.cutomRequestsWrapper}>
      <h4 className={styles.customRequestsHeader}>
        All your custom / special requests
      </h4>

      {requestsLoading || isRefetching ? (
        <div className={`${styles.customRequestItems} blurred`}>
          {[...Array(3)]?.map((_, _idx) => (
            <div key={_idx + 1} className={styles.customRequestItem}>
              <FcCustomerSupport size={92} />
              <span className={`${styles.requestTitle}`}>
                Some custom request
              </span>
              <div></div>
              <span className={`${styles.requestDate}`}>
                Request date: {new Date()?.toDateString()}
              </span>
              <span className={`${styles.miscInfo}`}>
                <span
                  style={{
                    fontSize: `var(--text-sm)`,
                    width: "70%",
                    textAlign: "center",
                    borderRadius: `var(--radius-min)`,
                    padding: "0.35rem 0.5rem",
                    backgroundColor: `${"var(--dark-gray)"}`,
                    color: `var(--white)`,
                    boxShadow: `var(--cards-shadow-2)`,
                  }}
                >
                  {customRequestStatus ?? "Unavailable"}
                </span>{" "}
              </span>
              <button type="button">
                <MdOutlineRemoveRedEye size={25} />
              </button>
            </div>
          ))}
        </div>
      ) : getRequestSuccess && sessionCustomRequest?.length > 0 ? (
        <div className={styles.customRequestItems}>
          {sessionCustomRequest?.map((serviceRequest, _idx) => (
            <div key={_idx + 1} className={styles.customRequestItem}>
              <FcCustomerSupport size={92} />
              <span className={`${styles.requestTitle}`}>
                Request NO#{`**** - ${serviceRequest?._id?.slice(26, 38)}`}
              </span>
              <div></div>
              <span className={`${styles.requestDate}`}>
                Request date:{" "}
                {new Date(serviceRequest?.created_at)?.toDateString()}
              </span>
              <span className={`${styles.miscInfo}`}>
                <span
                  style={{
                    textTransform: "capitalize",
                    fontSize: `var(--text-sm)`,
                    width: "70%",
                    textAlign: "center",
                    borderRadius: `var(--radius-min)`,
                    padding: "0.35rem 0.5rem",
                    backgroundColor: `${
                      serviceRequest?.status == "requested"
                        ? "var(--dark-2)"
                        : serviceRequest?.status == "completed"
                        ? "var(--success)"
                        : serviceRequest?.status == "inprogress"
                        ? "var(--black-2)"
                        : serviceRequest?.status == "cancelled"
                        ? "var(--danger)"
                        : "var(--dark-gray)"
                    }`,
                    color: `var(--white)`,
                    boxShadow: `var(--cards-shadow-2)`,
                  }}
                >
                  {serviceRequest?.status ?? "Unavailable"}
                </span>{" "}
              </span>
              <button
                type="button"
                onClick={() => viewSelectedRequest(serviceRequest)}
              >
                <MdOutlineRemoveRedEye size={25} />
              </button>
            </div>
          ))}
        </div>
      ) : (getRequestSuccess && sessionCustomRequest?.length == 0) ||
        sessionCustomRequest?.length == "undefined" ? (
        <NoOrderData
          notification={
            "There are  special request items here. Request a custom service to see them here..."
          }
        />
      ) : getRequestError ? (
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
            "There are  special request items here. Request a custom service to see them here..."
          }
        />
      )}
    </div>
  );
}
