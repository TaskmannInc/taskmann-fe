import { FcCustomerSupport } from "react-icons/fc";
import { FaRegDotCircle } from "react-icons/fa";
import { CloseButton } from "../../../../Globals/closeBtn";
import { primaryCurrency } from "../../../../../utils/constants/constants";

export default function AdminCustomRequestItem({
  styles,
  closeModal,
  selectedSpecialRequest,
}) {
  return (
    <div className={styles.selectedCustomRequestItem}>
      <div className={"modalHeader"}>
        <FcCustomerSupport size={25} />
        <h4>
          <small style={{ fontWeight: 800, fontStyle: "italic" }}>
            Request NO#{`**** - ${selectedSpecialRequest?._id?.slice(26, 38)}`}
          </small>
        </h4>
        <CloseButton className={"closeBtn"} closeFunc={closeModal} />
      </div>
      <div className={styles.requestDetail}>
        <h4>Billing Info</h4>
        <div className={styles.requestAddress}>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em style={{ fontWeight: 700 }}>Billing name</em>
            </span>
            <span className={styles.rightSection}>
              {selectedSpecialRequest?.firstname} &nbsp;
              {selectedSpecialRequest?.lastname}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Phone number</em>
            </span>
            <span className={styles.rightSection}>
              {selectedSpecialRequest?.phone}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Email</em>
            </span>
            <span className={styles.rightSection}>
              {selectedSpecialRequest?.email}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Customer account name</em>
            </span>
            <span className={styles.rightSection}>
              {`${selectedSpecialRequest?.firstname}  ${selectedSpecialRequest?.lastname}`}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Phone number</em>
            </span>
            <span className={styles.rightSection}>
              {`${
                selectedSpecialRequest?.customer?.phone
                  ? `${selectedSpecialRequest?.customer?.phone} |`
                  : ""
              } ${selectedSpecialRequest?.phone}`}
            </span>
          </div>
        </div>
        <div className={styles.otherDetails}></div>
      </div>
      <div className={styles.requestDetail}>
        <h4>Request info</h4>
        <div className={styles.requestAddress}>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Date requested</em>
            </span>
            <span className={styles.rightSection}>
              {new Date(selectedSpecialRequest?.created_at)?.toDateString()}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Last updated</em>
            </span>
            <span className={styles.rightSection}>
              {new Date(selectedSpecialRequest?.updated_at)?.toDateString()}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Proposed servicing date</em>
            </span>
            <span className={styles.rightSection}>
              {new Date(
                selectedSpecialRequest?.start_date_time
              )?.toDateString()}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Budget / Estimated cost</em>
            </span>
            <span className={styles.rightSection}>
              {primaryCurrency}&nbsp;{selectedSpecialRequest?.budget}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Request detail</em>
            </span>
            <span className={styles.rightSection}>
              {selectedSpecialRequest?.description}
            </span>
          </div>
        </div>
        <div className={styles.otherDetails}></div>
      </div>
    </div>
  );
}
