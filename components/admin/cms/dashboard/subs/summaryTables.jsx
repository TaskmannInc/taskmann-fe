import { primaryCurrency } from "../../../../utils/constants/constants";

export default function SummaryTables({
  styles,
  summaryTasks,
  recentOrders,
  isOrdersLoading,
  isTasksLoading,
}) {
  return (
    <section className={styles.tableVisualizers}>
      <div className={styles.pendingTasks}>
        <h6>Pending Tasks</h6>
        <div className={styles.pendingTasksTable}>
          <div className={styles.tableHeader}>
            <span>#</span>
            <span>Service</span>
            <span>Customer</span>
            <span>Assignee</span>
          </div>
          {isTasksLoading ? (
            <span style={{ fontWeight: "bold" }}>
              Loading recent pending tasks
            </span>
          ) : summaryTasks?.length > 0 ? (
            <div className={styles.tableBody}>
              {summaryTasks?.map((pending, index) => (
                <div key={index + 1} className={styles.tableRow}>
                  <span>{index + 1}</span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "0.25rem",
                    }}
                  >
                    {pending?.order?.cart?.line_items?.map((service, _idx) => (
                      <em style={{ fontWeight: "bold" }} key={_idx + 1}>
                        {service?.service_name}
                      </em>
                    ))}
                  </span>
                  <span>
                    {pending?.order?.customer?.first_name}{" "}
                    {pending?.order?.customer?.first_name}
                  </span>
                  <span>
                    {pending?.tasker?.first_name} {pending?.tasker?.last_name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span>There are no pending tasks ...</span>
          )}
        </div>
      </div>
      <div className={styles.recentOrder}>
        <h6>Recent Payments</h6>
        <div className={styles.recentOrdersTable}>
          <div className={styles.tableHeader}>
            <span>#</span>
            <span>Service</span>
            <span>Customer</span>
            <span style={{ textAlign: "center" }}>Cost</span>
            <span style={{ textAlign: "center" }}>Status</span>
          </div>
          {isOrdersLoading ? (
            <span style={{ fontWeight: "bold" }}>Loading recent orders</span>
          ) : recentOrders?.length > 0 ? (
            <div className={styles.tableBody}>
              {recentOrders?.map((orders, index) => (
                <div key={index + 1} className={styles.tableRow}>
                  <span>{index + 1}</span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "0.25rem",
                    }}
                  >
                    {orders?.cart?.line_items?.map((service, _idx) => (
                      <em style={{ fontWeight: "bold" }} key={_idx + 1}>
                        {service?.service_name}
                      </em>
                    ))}
                  </span>
                  <span>
                    {orders?.customer?.first_name} {orders?.customer?.last_name}
                  </span>

                  <span style={{ textAlign: "center" }}>
                    <small
                      style={{
                        backgroundColor: `var(--white)`,
                        padding: `0.25rem 0.4rem`,
                        borderRadius: `var(--radius-lg)`,
                        color: `var(--green-primary)`,
                        fontWeight: "bold",
                        border: `1pt solid var(--gray-3)`,
                      }}
                    >
                      {" "}
                      {primaryCurrency} {orders?.cart?.total_price}
                    </small>
                  </span>
                  <span style={{ textAlign: "center" }}>
                    <small
                      className={`status ${
                        orders?.payment?.status == "PAID"
                          ? "pill-success"
                          : orderItem?.status == "CANCELLED"
                          ? "pill-failure"
                          : "pill-other"
                      }`}
                    >
                      {orders?.payment?.status ?? "PENDING"}
                    </small>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span>There are no orders to show ...</span>
          )}
        </div>
      </div>
    </section>
  );
}
