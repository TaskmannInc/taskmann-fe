import { FaFileInvoiceDollar } from "react-icons/fa";
import { CloseButton } from "../../../../Globals/closeBtn";
import styles from "../../../../../../styles/admin/Forms.module.css";
import Image from "next/image";
import { primaryCurrency } from "../../../../../utils/constants/constants";

export default function ViewOrderDetails({ selectedOrder, closeModal }) {
  console.log("selectedOrder", selectedOrder);
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaFileInvoiceDollar size={25} />
          <h4>Order invoice</h4>
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
            <h3>Invoice #&nbsp;{`***${selectedOrder?._id?.slice(23, 39)}`}</h3>
          </div>
          <div className={styles.customerDetail}>
            <h4>Customer Information</h4>
            <div className={styles.detailItem}>
              <label>Billed to</label>
              <span className={styles.detailInfo}>
                {selectedOrder?.customer?.first_name}&nbsp;
                {selectedOrder?.customer?.last_name}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Phone / Mobile</label>
              <span className={styles.detailInfo}>
                {selectedOrder?.customer?.phone}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>E-mail address</label>
              <span className={styles.detailInfo}>
                {selectedOrder?.customer?.email}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Billing address</label>
              <span className={styles.detailInfo}>
                {selectedOrder?.customer?.address} -{" "}
                {selectedOrder?.customer?.city}.
              </span>
            </div>
          </div>
          <div className={styles.orderDetail}>
            <h4>Order Information</h4>
            <div className={styles.detailItem}>
              <label>Service</label>
              {selectedOrder?.cart?.line_items?.map((item, _idx) => (
                <span key={_idx + 1} className={styles.detailInfo}>
                  <span style={{ fontWeight: "bolder" }}>
                    {item?.service_name}
                  </span>
                  {item?.packageDetails?.map((packItem, _i) => (
                    <small key={_i + 1} style={{ fontStyle: "italic" }}>
                      <li>{packItem?.title}</li>
                    </small>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.paymentAdvice}>
            <span className={styles.paymentStatus}>
              {selectedOrder?.payment?.status ?? "PENDING"}
            </span>
            <span className={styles.paymentAmount}>
              {primaryCurrency}&nbsp;{selectedOrder?.cart?.total_price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
