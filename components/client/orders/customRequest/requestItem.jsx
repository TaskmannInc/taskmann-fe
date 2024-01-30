import { FcCustomerSupport } from "react-icons/fc";
import { CloseButton } from "../../../admin/Globals/closeBtn";
import { FaRegDotCircle } from "react-icons/fa";
import { primaryCurrency } from "../../../utils/constants/constants";

export default function CustomRequestItem({
  styles,
  closeModal,
  selectedCustomRequest,
}) {
  return (
    <div className={styles.selectedCustomRequestItem}>
      <div className={"modalHeader"}>
        <FcCustomerSupport size={25} />
        <h4>
          <small style={{ fontWeight: 800, fontStyle: "italic" }}>
            Request NO#{`**** - ${selectedCustomRequest?._id?.slice(26, 38)}`}
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
              {selectedCustomRequest?.firstname}
              {selectedCustomRequest?.lastname}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Phone number</em>
            </span>
            <span className={styles.rightSection}>
              {selectedCustomRequest?.phone}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Email</em>
            </span>
            <span className={styles.rightSection}>
              {selectedCustomRequest?.email}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Customer account name</em>
            </span>
            <span className={styles.rightSection}>
              {selectedCustomRequest?.customer?.first_name} &nbsp;
              {selectedCustomRequest?.customer?.last_name}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Phone number</em>
            </span>
            <span className={styles.rightSection}>
              {selectedCustomRequest?.customer?.phone}
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
              {new Date(selectedCustomRequest?.created_at)?.toDateString()}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Last updated</em>
            </span>
            <span className={styles.rightSection}>
              {new Date(selectedCustomRequest?.updated_at)?.toDateString()}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Proposed servicing date</em>
            </span>
            <span className={styles.rightSection}>
              {new Date(selectedCustomRequest?.start_date_time)?.toDateString()}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Budget / Estimated cost</em>
            </span>
            <span className={styles.rightSection}>
              {primaryCurrency}&nbsp;{selectedCustomRequest?.budget}
            </span>
          </div>
          <div className={styles.requestItem}>
            <span className={styles.leftSection}>
              <em>Request detail</em>
            </span>
            <span className={styles.rightSection}>
              {selectedCustomRequest?.description}
            </span>
          </div>
        </div>
        <div className={styles.otherDetails}></div>
      </div>
    </div>
  );
}
