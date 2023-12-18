import { StaffContextStore } from "../../../store/staffContextStore";
import styles from "../../../styles/taskers/Dashboard.module.css";
import SummaryInformation from "./subs/statistics";
import { useState } from "react";
import { GetTaskersTask } from "../../utils/hooks/ordersMgmtHook";
import SummaryTables from "./subs/summaryTables";
export default function TaskerDashboard() {
  var [allSystemTasks, setAllSystemTasks] = useState([]);
  var [pendingTasks, setAllPendingTasks] = useState([]);
  var [completedTasks, setAllCompletedTasks] = useState([]);
  var [cancelledTasks, setAllCancelledTasks] = useState([]);

  //--> get orders and tasks error, success <--> on during, after, request <--//
  const onTasksError = (response) => {
    console.log("tasks error", response);
  };

  const onTasksSuccess = (data) => {
    console.log("all tasks", data?.data?.data);
    setAllSystemTasks(data?.data?.data?.splice(0, 5));

    //filter cancelled tasks
    var cancelled = data?.data?.data?.filter(function (item) {
      return item?.status == "CANCELLED";
    });

    setAllCancelledTasks(cancelled);

    //filter pending tasks
    var pending = data?.data?.data?.filter(function (item) {
      return item?.status == "PENDING";
    });
    console.log("pending", pending);
    setAllPendingTasks(pending);

    //filter completed tasks
    var completed = data?.data?.data?.filter(function (item) {
      return item?.status == "COMPLETED";
    });
    setAllCompletedTasks(completed);
  };

  const { isSuccess: isTasksSuccess, error: tasksError } = GetTaskersTask(
    onTasksSuccess,
    onTasksError
  );
  //get logged in staff session
  const { session } = StaffContextStore();
  return (
    <div className={styles.taskerDashboard}>
      <h4 className={styles.title}>Overview</h4>
      <div className={styles.dashboardStats}>
        <SummaryInformation
          styles={styles}
          session={session}
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
          cancelledTasks={cancelledTasks}
        />
        <SummaryTables
          styles={styles}
          session={session}
          allSystemTasks={allSystemTasks}
          isTasksSuccess={isTasksSuccess}
          tasksError={tasksError}
        />
      </div>
    </div>
  );
}
