import { BsLayers } from "react-icons/bs";

export default function CancelledTasks({ styles }) {
  return (
    <section className={styles.tableVisualizers}>
      <div className={styles.taskOrders}>
        <h6>Cancelled tasks</h6>
        <div className={styles.taskOrdersTable}>
          <div className={styles.tableHeader}>
            <span>
              <BsLayers size={15} />
              &nbsp; ID
            </span>
            <span>Job</span>
            <span>Date</span>
            <span>Time</span>
            <span>Location</span>
            <span>Customer name</span>
            <span>Customer phone</span>
            <span>Customer email</span>
            <span className={styles.statusColumn}>Status</span>
          </div>
          <div className={styles.tableBody}>
            {[...Array(4)].map((i, index) => (
              <div key={index + 1} className={styles.tableRow}>
                <span>***-{index + 1}</span>
                <span>Service task</span>
                <span>10-10-2023</span>
                <span>10:05 P.M.</span>
                <span>Service location</span>
                <span>Customer name</span>
                <span>Customer phone</span>
                <span>Customer email</span>
                <span className={styles.statusColumn}>Status</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
