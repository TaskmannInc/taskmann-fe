import { useState } from "react";
import { BsLayers } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { NoTableData } from "../../../../../ui-fragments/dataInteractions";
import { TableLoader } from "../../../../../ui-fragments/loaders";
import { GetAdminTaskListHook } from "../../../../../utils/hooks/ordersMgmtHook";
import TablePaginationInstance from "../../../../Globals/Pagination";

export default function AllTasks({ styles, iconSize }) {
  //component states

  const [searchTasksInput, setSearchTasksInput] = useState("");
  var [allSystemTasks, setAllSystemTasks] = useState([]);

  // Pagination
  var itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //--get orders and tasks error, success <--> on during, after, request--//
  const onTasksError = (response) => {
    console.log("tasks error", response);
  };

  const onTasksSuccess = (data) => {
    console.log("all tasks", data?.data?.data);
    setAllSystemTasks(data?.data?.data);
  };

  const {
    isLoading: isTasksLoading,
    isError: isTasksError,
    isSuccess: isTasksSuccess,
    error: tasksError,
    refetch: refetchTasks,
    isRefetching: refetchingTasks,
  } = GetAdminTaskListHook(onTasksSuccess, onTasksError);

  const totalDataSet = allSystemTasks?.length;
  var currentDataItems = allSystemTasks?.slice(itemOffset, endOffset);
  var pageCount = Math.ceil(allSystemTasks?.length / itemsPerPage);

  const handleTasksSearchChange = (e) => {
    e.preventDefault();
    setSearchTasksInput(e.target.value);
  };

  if (searchTasksInput.length > 0) {
    all = allSystemTasks?.filter((result) => {
      pageCount = Math.ceil(allSystemTasks?.length / itemsPerPage);
      return (
        result?.first_name?.match(new RegExp(searchTasksInput, "i")) ||
        result?.last_name?.match(new RegExp(searchTasksInput, "i")) ||
        result?.phone?.match(new RegExp(searchTasksInput, "i")) ||
        result?.email?.match(new RegExp(searchTasksInput, "i")) ||
        (result?.first_name + " " + result?.last_name)?.match(
          new RegExp(searchTasksInput, "i")
        ) ||
        (result?.last_name + " " + result?.first_name)?.match(
          new RegExp(searchTasksInput, "i")
        )
      );
    });
  }

  //page numbers click event handler
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allUsers?.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span
          className={styles.searchContainer}
          style={{
            alignSelf: "flex-end",
          }}
        >
          <FiSearch size={iconSize} />{" "}
          <input
            readOnly={isTasksLoading || refetchingTasks}
            type="search"
            className={styles.searchinput}
            placeholder="Search tasks..."
            disabled={!allSystemTasks}
            onChange={handleTasksSearchChange}
          />
        </span>
        <button
          title="Refetch tasks"
          className="refetchButton"
          type="button"
          onClick={() => refetchTasks()}
          disabled={isTasksLoading || refetchingTasks}
        >
          <TbReload size={20} />
        </button>
      </div>
      {isTasksLoading || refetchingTasks ? (
        <TableLoader />
      ) : isTasksSuccess && allSystemTasks?.length > 0 ? (
        <>
          <section className={styles.tableVisualizers}>
            <div className={styles.taskOrders}>
              <h6>All tasks</h6>
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
                              : "Unavailable"}{" "}
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
                          style={{ fontSize: "0.8rem", fontWeight: "bolder" }}
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
                          style={{ fontSize: "0.8rem", fontWeight: "bolder" }}
                        >
                          {task?.tasker?.first_name}&nbsp;
                          {task?.tasker?.last_name}
                        </small>
                        <small> {task?.tasker?.phone}</small>
                        <small> {task?.tasker?.email}</small>
                      </span>
                      <span className={styles.statusColumn}>
                        <small
                          style={{
                            padding: "0.5rem 1rem",
                            textAlign: "center",
                            color: `var(--white)`,
                          }}
                          className={
                            task?.status == "COMPLETED"
                              ? "pill-success"
                              : task?.status == "CANCELLED"
                              ? "pill-failure"
                              : "pill-other"
                          }
                        >
                          {task?.status ?? "Unavailable"}
                        </small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {allSystemTasks?.length > 0 && (
            <div className="pagination-section">
              <div className="pagination-text">
                <p>
                  Showing <strong>{currentDataItems?.length ?? 0}</strong> out
                  of <strong>{totalDataSet ?? 0}</strong> items.
                </p>
              </div>
              <TablePaginationInstance
                pageCount={pageCount}
                changePage={handlePageClick}
              />
            </div>
          )}
        </>
      ) : isTasksSuccess && allSystemTasks?.length == 0 ? (
        <NoTableData />
      ) : (
        isTasksError && (
          <NoTableData
            notification={
              tasksError?.error ??
              "An error occured while getting all system tasks, please try again later."
            }
          />
        )
      )}
    </>
  );
}
