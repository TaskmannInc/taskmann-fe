import { BsLayers } from "react-icons/bs";

export default function SummaryTables({
  styles,
  allSystemTasks,
  isTasksSuccess,
  tasksError,
}) {
  return (
    <section className={styles.tableVisualizers}>
      {(isTasksSuccess || tasksError) && (
        <div className={styles.taskOrders}>
          <h6>Recent Orders</h6>
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
              <span>Customer</span>
              <span>Tasker</span>
              <span className={styles.statusColumn}>Task status</span>
            </div>
            <div className={styles.tableBody}>
              {allSystemTasks?.length > 0 && (
                <>
                  {allSystemTasks?.map((task, index) => (
                    <div key={index + 1} className={styles.tableRow}>
                      <span>***{task?._id?.slice(23, 39)}</span>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: "0 0",
                        }}
                      >
                        {task?.order?.cart?.line_items?.map((service, i) => {
                          return (
                            <small
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: "bolder",
                              }}
                              key={i + 1}
                            >
                              {service?.service_name ?? service?.serviceName}
                            </small>
                          );
                        })}
                      </span>
                      <span>
                        {task?.order?.cart?.line_items?.map((service, i) => (
                          <p key={i + 1}>
                            {service?.service_date
                              ? new Date(
                                  service?.service_date
                                )?.toLocaleDateString()
                              : "Unavailable"}{" "}
                          </p>
                        ))}
                      </span>
                      <span>
                        {task?.order?.cart?.line_items?.map((service, i) => (
                          <p key={i + 1}>
                            {service?.service_date
                              ? service?.service_date
                                  ?.split("T")[1]
                                  ?.split(".")[0]
                              : "Unavailable"}
                          </p>
                        ))}
                      </span>
                      <span> {task?.order?.customer?.address} </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <small
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: "bolder",
                          }}
                        >
                          {task?.order?.customer?.first_name}&nbsp;
                          {task?.order?.customer?.last_name}
                        </small>
                        <small>{task?.order?.customer?.phone}</small>
                        <small>{task?.order?.customer?.email}</small>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <small
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: "bolder",
                          }}
                        >
                          {task?.taskers?.first_name}&nbsp;
                          {task?.taskers?.last_name} {"(You)"}
                        </small>
                        <small> {task?.taskers?.phone}</small>
                        <small> {task?.taskers?.email}</small>
                      </span>
                      <span className={styles.statusColumn}>
                        <small
                          style={{
                            padding: "0.5rem 1rem",
                            textAlign: "center",
                            color: `var(--white)`,
                          }}
                          className={
                            task?.status == "PAID"
                              ? "pill-success"
                              : task?.status == "CANCELLED"
                              ? "pill-failure"
                              : "pill-other"
                          }
                        >
                          {task?.status ?? "PENDING"}
                        </small>
                      </span>
                    </div>
                  ))}{" "}
                </>
              )}
              {allSystemTasks?.length == 0 && (
                <span className="pill-error">
                  There is nothing here at the moment
                </span>
              )}
              {tasksError && (
                <>
                  <span>
                    We could not retrieve any recent orders at this time
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
