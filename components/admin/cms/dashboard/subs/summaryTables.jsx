export default function SummaryTables({ styles }) {
  const pendingTasks = [{}];
  const recentPayments = [{}];

  return (
    <section className={styles.tableVisualizers}>
      <div className={styles.pendingTasks}>
        <h6>Pending Tasks</h6>
        <div className={styles.pendingTasksTable}>
          <div className={styles.tableHeader}>
            <span>#</span>
            <span>Task</span>
            <span>Type</span>
            <span>Location</span>
            <span>Assigned to</span>
          </div>
          <div className={styles.tableBody}>
            {[...Array(4)].map((i, index) => (
              <div key={index + 1} className={styles.tableRow}>
                <span>#</span>
                <span>Task</span>
                <span>Type</span>
                <span>Location</span>
                <span>Assigned to</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.recentOrder}>
        <h6>Recent Payments</h6>
        <div className={styles.recentOrdersTable}>
          <div className={styles.tableHeader}>
            <span>#</span>
            <span>Task</span>
            <span>Type</span>
            <span>Location</span>
            <span>Assigned to</span>
            <span>Status</span>
          </div>
          <div className={styles.tableBody}>
            {[...Array(4)].map((i, index) => (
              <div key={index + 1} className={styles.tableRow}>
                <span>#</span>
                <span>Task</span>
                <span>Type</span>
                <span>Location</span>
                <span>Assigned to</span>
                <span className="status pill-success">Status</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
