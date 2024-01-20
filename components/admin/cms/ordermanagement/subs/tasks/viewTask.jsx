import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { CloseButton } from "../../../../Globals/closeBtn";

export default function ViewTaskDetails({ selectedTask, closeModal }) {
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <MdOutlineAssignmentInd size={25} />
          <h4>Task details</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeModal} />
        </div>
        <div className={styles.invoiceContainer}>
          <div className={styles.invoiceHeader}>
            <Image
              width={75}
              height={75}
              src="/assets/trademarks/taskmann-logo.png"
              alt="admin-logo"
              className="admin-logo"
              loading="lazy"
            />
            <h3>
              Task #&nbsp;
              {`***${selectedTask?.order?.task?._id?.slice(23, 39)}`}
            </h3>
          </div>
          <div className={styles.customerDetail}>
            <h4>Customer Information</h4>
            <div className={styles.detailItem}>
              <label>Billed to</label>
              <span className={styles.detailInfo}>
                {selectedTask?.order?.customer?.first_name}&nbsp;
                {selectedTask?.order?.customer?.last_name}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Phone / Mobile</label>
              <span className={styles.detailInfo}>
                {selectedTask?.order?.customer?.phone}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>E-mail address</label>
              <span className={styles.detailInfo}>
                {selectedTask?.order?.customer?.email}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Service location</label>
              <span className={styles.detailInfo}>
                {selectedTask?.order?.customer?.address} -{" "}
                {selectedTask?.order?.customer?.city}.
              </span>
            </div>
          </div>
          <div className={styles.orderDetail}>
            <h4 style={{ fontSize: `var(--text-lg)` }}>
              Task / Servicing Information
            </h4>
            <div className={styles.detailItem}>
              {selectedTask?.order?.cart?.line_items?.map((item, _idx) => (
                <span key={_idx + 1} className={styles.detailInfo}>
                  <span
                    style={{
                      fontSize: `var(--text-md)`,
                      fontWeight: "700",
                      alignItems: "center",
                      textDecoration: "underline",
                    }}
                  >
                    {item?.service_name} &nbsp;
                    <FaArrowRight size={15} />
                    &nbsp;
                    {new Date(item?.service_date)?.toDateString()},{" "}
                    {new Date(item?.service_date)?.toLocaleTimeString()}
                  </span>
                  {item?.packageDetails?.map((packItem, _i) => (
                    <small key={_i + 1} style={{ fontStyle: "italic" }}>
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        {packItem?.title}&nbsp; <FaArrowRight size={15} />
                        &nbsp;
                        {packItem?.quantity}
                      </li>
                    </small>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.paymentAdvice}>
            <span style={{ color: `var(--white)` }}>Task status</span>
            <span className={styles.paymentStatus}>
              {selectedTask?.order?.task?.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
