import { useEffect, useState } from "react";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import { BsFunnel, BsLayers, BsThreeDots } from "react-icons/bs";
import {
  MdHourglassEmpty,
  MdOutlineAssignmentInd,
  MdOutlineCancel,
  MdOutlineDoneAll,
} from "react-icons/md";
import styles from "../../../styles/taskers/Tasks.module.css";
import TablePaginationInstance from "../../admin/Globals/Pagination";
import ViewAssignedTask from "../../admin/cms/ordermanagement/subs/tasks/viewAssignedTasks";
import { NoTableData } from "../../ui-fragments/dataInteractions";
import { TableLoader } from "../../ui-fragments/loaders";
import { GetTaskersTask } from "../../utils/hooks/ordersMgmtHook";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { FaEye, FaLongArrowAltRight } from "react-icons/fa";
import ViewTaskDetails from "../../admin/cms/ordermanagement/subs/tasks/viewTask";

export default function AllServiceTasks() {
  const iconSize = 18;
  const filterButtons = [
    {
      icon: (
        <BiObjectsHorizontalLeft size={iconSize} color="var(--green-dark)" />
      ),
      title: "all",
    },
    {
      icon: <MdOutlineDoneAll size={iconSize} color="green" />,
      title: "completed",
    },
    {
      icon: <MdHourglassEmpty size={iconSize} color="gray" />,
      title: "pending",
    },
    {
      icon: <MdOutlineCancel size={iconSize} color="red" />,
      title: "cancelled",
    },
  ];

  //mobile responsive screen
  const [screenWidthMobile, setScreenWidthMobile] = useState(
    window.matchMedia("(min-width: 250px) and (max-width: 720px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 250px) and (max-width: 720px)")
      .addEventListener("change", (e) => setScreenWidthMobile(e.matches));
  }, []);

  const [showAssignedTaskModal, setshowAssignedTaskModal] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [activeFilterBtn, setActiveFilterBtn] = useState("all");
  const filterBtnOnclick = (param) => {
    setActiveFilterBtn(param?.title);
  };

  const [searchTasksInput, setSearchTasksInput] = useState("");
  var [allSystemTasks, setAllSystemTasks] = useState([]);
  var [pendingTasks, setAllPendingTasks] = useState([]);
  var [completedTasks, setAllCompletedTasks] = useState([]);
  var [cancelledTasks, setAllCancelledTasks] = useState([]);

  // Pagination
  var itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  //--get orders and tasks error, success <--> on during, after, request--//
  const onTasksError = (response) => {
    console.log("tasks error", response);
  };

  const onTasksSuccess = (response) => {
    var allTaskersTasks = response?.data?.data;

    //filter cancelled tasks
    var cancelled = allTaskersTasks?.filter((item) => {
      return item?.order?.task?.status == "CANCELLED";
    });
    setAllCancelledTasks(
      cancelled?.sort(function (a, b) {
        return new Date(b?.created_at) - new Date(a?.created_at);
      })
    );

    //filter pending tasks
    var pending = allTaskersTasks?.filter((item) => {
      return item?.order?.task?.status == "PENDING";
    });
    setAllPendingTasks(
      pending?.sort(function (a, b) {
        return new Date(b?.created_at) - new Date(a?.created_at);
      })
    );

    //filter completed tasks
    var completed = allTaskersTasks?.filter((item) => {
      return item?.order?.task?.status == "COMPLETED";
    });
    setAllCompletedTasks(
      completed?.sort(function (a, b) {
        return new Date(b?.created_at) - new Date(a?.created_at);
      })
    );

    setAllSystemTasks(
      response?.data?.data?.sort(function (a, b) {
        return new Date(b?.created_at) - new Date(a?.created_at);
      })
    );
  };

  const {
    isLoading: isTasksLoading,
    isError: isTasksError,
    isSuccess: isTasksSuccess,
    error: tasksError,
    refetch: refetchTasks,
    isRefetching: refetchingTasks,
  } = GetTaskersTask(onTasksSuccess, onTasksError);

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

  //modal handlers
  const viewAssignedTaskDetail = (task) => {
    setSelectedTask(task);
    setshowAssignedTaskModal(!showAssignedTaskModal);
  };

  const viewTaskDetail = (task) => {
    setSelectedTask(task);
    setShowTaskDetail(!showTaskDetail);
  };

  //--Material ui modal wrapper  styles--//
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: screenWidthMobile ? "95%" : 500,
    maxHeight: "70vh",
    overflowY: "auto",
    overflowX: "auto",
    bgcolor: `var(--white)`,
    border: "none",
    boxShadow: 24,
    borderRadius: `var(--radius-md)`,
    p: screenWidthMobile ? "1rem 0.5rem" : 2,
  };
  return (
    <>
      <div className={styles.allserviceTasksLayout}>
        <h4 className={styles.title}>Tasks</h4>
        <div className={styles.tabButtonsWrapper}>
          <BsFunnel size={25} title="Click on an option to filter" />
          {filterButtons?.map((btnIntance, i) => (
            <button
              key={i + 1}
              type="button"
              title={`Show all ${btnIntance?.title}`}
              onClick={() => filterBtnOnclick(btnIntance)}
              // disabled={isTasksLoading}
              className={
                activeFilterBtn == btnIntance?.title
                  ? styles.activeFilterBtn
                  : ""
              }
            >
              {btnIntance?.icon}
              {btnIntance?.title}
            </button>
          ))}
        </div>
        {/*All tasks*/}
        {activeFilterBtn == "all" && (
          <>
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
                        <span className={styles.statusColumn}>
                          <BsThreeDots size={25} />
                        </span>
                      </div>
                      <div className={styles.tableBody}>
                        {allSystemTasks?.map((task, index) => (
                          <div key={index + 1} className={styles.tableRow}>
                            <span>***{task?._id?.slice(23, 39)}</span>
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                padding: "0 0",
                              }}
                            >
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => {
                                  return (
                                    <small
                                      style={{
                                        overflowY: "auto",
                                        fontSize: "0.85rem",
                                        fontWeight: "bolder",
                                      }}
                                      key={i + 1}
                                    >
                                      <>
                                        {service?.service_name ??
                                          service?.serviceName}
                                      </>
                                    </small>
                                  );
                                }
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toDateString()
                                      : "Unavailable"}{" "}
                                  </p>
                                )
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toLocaleTimeString()
                                      : "Unavailable"}
                                  </p>
                                )
                              )}
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
                                className={"pill-other"}
                                style={{
                                  padding: "0.5rem 1rem",
                                  textAlign: "center",
                                  color: `var(--white)`,
                                  backgroundColor: `${
                                    task?.status == "PENDING"
                                      ? "var(--dark-2)"
                                      : task?.status == "COMPLETED"
                                      ? "var(--success)"
                                      : task?.status == "ASSIGNED"
                                      ? "var(--black-2)"
                                      : task?.status == "INPROGRESS"
                                      ? "var(--green-primary)"
                                      : task?.status == "CANCELLED"
                                      ? "var(--danger)"
                                      : "var(--dark-gray)"
                                  }`,
                                }}
                              >
                                {task?.status}
                              </small>
                            </span>
                            <span className={styles.statusColumn}>
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewTaskDetail(task)}
                              >
                                <FaEye
                                  size={25}
                                  style={{ color: `var(--gold)` }}
                                />
                              </button>
                              &nbsp;&nbsp;
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewAssignedTaskDetail(task)}
                              >
                                <MdOutlineAssignmentInd
                                  size={25}
                                  style={{ color: `var(--green-dark)` }}
                                />
                              </button>
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
                        Showing <strong>{currentDataItems?.length ?? 0}</strong>{" "}
                        out of <strong>{totalDataSet ?? 0}</strong> items.
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
        )}

        {/*completed tasks*/}
        {activeFilterBtn == "completed" && (
          <>
            {isTasksLoading || refetchingTasks ? (
              <TableLoader />
            ) : isTasksSuccess && completedTasks?.length > 0 ? (
              <>
                <section className={styles.tableVisualizers}>
                  <div className={styles.taskOrders}>
                    <h6>Completed tasks</h6>
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
                        <span className={styles.statusColumn}>
                          <BsThreeDots size={25} />
                        </span>
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
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => {
                                  return (
                                    <small
                                      style={{
                                        overflowY: "auto",
                                        fontSize: "0.85rem",
                                        fontWeight: "bolder",
                                      }}
                                      key={i + 1}
                                    >
                                      <>
                                        {service?.service_name ??
                                          service?.serviceName}
                                      </>
                                    </small>
                                  );
                                }
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toDateString()
                                      : "Unavailable"}{" "}
                                  </p>
                                )
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toLocaleTimeString()
                                      : "Unavailable"}
                                  </p>
                                )
                              )}
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
                            <span className={styles.statusColumn}>
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewTaskDetail(task)}
                              >
                                <FaEye
                                  size={25}
                                  style={{ color: `var(--gold)` }}
                                />
                              </button>
                              &nbsp;&nbsp;
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewAssignedTaskDetail(task)}
                              >
                                <MdOutlineAssignmentInd
                                  size={25}
                                  style={{ color: `var(--green-dark)` }}
                                />
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                {completedTasks?.length > 0 && (
                  <div className="pagination-section">
                    <div className="pagination-text">
                      <p>
                        Showing <strong>{currentDataItems?.length ?? 0}</strong>{" "}
                        out of <strong>{totalDataSet ?? 0}</strong> items.
                      </p>
                    </div>
                    <TablePaginationInstance
                      pageCount={pageCount}
                      changePage={handlePageClick}
                    />
                  </div>
                )}
              </>
            ) : isTasksSuccess && completedTasks?.length == 0 ? (
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
        )}

        {/*pending tasks*/}
        {activeFilterBtn == "pending" && (
          <>
            {isTasksLoading || refetchingTasks ? (
              <TableLoader />
            ) : isTasksSuccess && pendingTasks?.length > 0 ? (
              <>
                <section className={styles.tableVisualizers}>
                  <div className={styles.taskOrders}>
                    <h6>Pending tasks</h6>
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
                        <span className={styles.statusColumn}>
                          <BsThreeDots size={25} />
                        </span>
                      </div>
                      <div className={styles.tableBody}>
                        {pendingTasks?.map((task, index) => (
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
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => {
                                  return (
                                    <small
                                      style={{
                                        overflowY: "auto",
                                        fontSize: "0.85rem",
                                        fontWeight: "bolder",
                                      }}
                                      key={i + 1}
                                    >
                                      <>
                                        {service?.service_name ??
                                          service?.serviceName}
                                      </>
                                    </small>
                                  );
                                }
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toDateString()
                                      : "Unavailable"}{" "}
                                  </p>
                                )
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toLocaleTimeString()
                                      : "Unavailable"}
                                  </p>
                                )
                              )}
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
                            <span className={styles.statusColumn}>
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewTaskDetail(task)}
                              >
                                <FaEye
                                  size={25}
                                  style={{ color: `var(--gold)` }}
                                />
                              </button>
                              &nbsp;&nbsp;
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewAssignedTaskDetail(task)}
                              >
                                <MdOutlineAssignmentInd
                                  size={25}
                                  style={{ color: `var(--green-dark)` }}
                                />
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                {pendingTasks?.length > 0 && (
                  <div className="pagination-section">
                    <div className="pagination-text">
                      <p>
                        Showing <strong>{currentDataItems?.length ?? 0}</strong>{" "}
                        out of <strong>{totalDataSet ?? 0}</strong> items.
                      </p>
                    </div>
                    <TablePaginationInstance
                      pageCount={pageCount}
                      changePage={handlePageClick}
                    />
                  </div>
                )}
              </>
            ) : isTasksSuccess && pendingTasks?.length == 0 ? (
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
        )}

        {/*cancelled tasks*/}
        {activeFilterBtn == "cancelled" && (
          <>
            {isTasksLoading || refetchingTasks ? (
              <TableLoader />
            ) : isTasksSuccess && cancelledTasks?.length > 0 ? (
              <>
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
                        <span>Customer</span>
                        <span>Tasker</span>
                        <span className={styles.statusColumn}>Task status</span>
                        <span className={styles.statusColumn}>
                          <BsThreeDots size={25} />
                        </span>
                      </div>
                      <div className={styles.tableBody}>
                        {cancelledTasks?.map((task, index) => (
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
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => {
                                  return (
                                    <small
                                      style={{
                                        overflowY: "auto",
                                        fontSize: "0.85rem",
                                        fontWeight: "bolder",
                                      }}
                                      key={i + 1}
                                    >
                                      <>
                                        {service?.service_name ??
                                          service?.serviceName}
                                      </>
                                    </small>
                                  );
                                }
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toDateString()
                                      : "Unavailable"}{" "}
                                  </p>
                                )
                              )}
                            </span>
                            <span>
                              {task?.order?.cart?.line_items?.map(
                                (service, i) => (
                                  <p key={i + 1}>
                                    {service?.service_date
                                      ? new Date(
                                          service?.service_date
                                        )?.toLocaleTimeString()
                                      : "Unavailable"}
                                  </p>
                                )
                              )}
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
                            <span className={styles.statusColumn}>
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewTaskDetail(task)}
                              >
                                <FaEye
                                  size={25}
                                  style={{ color: `var(--gold)` }}
                                />
                              </button>
                              &nbsp;&nbsp;
                              <button
                                title="Assign order to a tasker"
                                className={styles.editButton}
                                onClick={() => viewAssignedTaskDetail(task)}
                              >
                                <MdOutlineAssignmentInd
                                  size={25}
                                  style={{ color: `var(--green-dark)` }}
                                />
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                {cancelledTasks?.length > 0 && (
                  <div className="pagination-section">
                    <div className="pagination-text">
                      <p>
                        Showing <strong>{currentDataItems?.length ?? 0}</strong>{" "}
                        out of <strong>{totalDataSet ?? 0}</strong> items.
                      </p>
                    </div>
                    <TablePaginationInstance
                      pageCount={pageCount}
                      changePage={handlePageClick}
                    />
                  </div>
                )}
              </>
            ) : isTasksSuccess && cancelledTasks?.length == 0 ? (
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
        )}
      </div>
      {showAssignedTaskModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewAssignedTaskDetail}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewAssignedTaskDetail}>
            <Box sx={ModalStyle}>
              <ViewAssignedTask
                selectedTask={selectedTask}
                closeModal={viewAssignedTaskDetail}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {showTaskDetail && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewTaskDetail}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewTaskDetail}>
            <Box sx={ModalStyle}>
              <ViewTaskDetails
                selectedTask={selectedTask}
                closeModal={viewTaskDetail}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
