import { useEffect, useState } from "react";
import styles from "../../../../styles/admin/Dashboard.module.css";
import { GetServicesHook } from "../../../utils/hooks/serviceMgmtHook";
import {
  GetAllCustomersDataHook,
  GetAllStaffMembersDataHook,
} from "../../../utils/hooks/usermgmtHook";

import Statistics from "./subs/statistics";
import SummaryTables from "./subs/summaryTables";
import {
  GetAdminOrderListHook,
  GetAdminTaskListHook,
} from "../../../utils/hooks/ordersMgmtHook";
export default function AdminDashboard() {
  const [allCustomerOrders, setAllCustomerOrders] = useState([]);
  const [recentOrders, setRecentORders] = useState([]);
  const [summaryTasks, setSummaryTasks] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [taskerUsers, setTaskerUsers] = useState([]);
  const [customerUsers, setCustomerUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  //===========>ORDERS<==============
  const onOrderError = (response) => {
    console.log("orders error", response);
  };

  const onOrderSuccess = (data) => {
    setAllCustomerOrders(data?.data?.data);
    var recent = data?.data?.data?.sort(function (a, b) {
      return new Date(b?.date_of_birth) - new Date(a?.date_of_birth);
    });
    setRecentORders(recent?.splice(0, 4));
  };

  const {
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    isSuccess: isOrdersSuccess,
    error: orderError,
    refetch: refetchOrders,
    isRefetching: refetchingOrders,
  } = GetAdminOrderListHook(onOrderSuccess, onOrderError);
  //===========>ORDERS<==============

  //===========>TASKS<==============
  const onTasksError = (response) => {
    console.log("tasks error", response);
  };

  const onTasksSuccess = (data) => {
    //filter pending tasks
    var pending = data?.data?.data?.filter((item) => {
      return item?.order?.task?.status == "PENDING";
    });
    setSummaryTasks(pending?.splice(0, 4));
  };

  const {
    isLoading: isTasksLoading,
    isError: isTasksError,
    isSuccess: isTasksSuccess,
    error: tasksError,
    refetch: refetchTasks,
    isRefetching: refetchingTasks,
  } = GetAdminTaskListHook(onTasksSuccess, onTasksError);
  //===========>TASKS<==============

  //===========>SERVICES<==============
  const onServiceError = (response) => {
    console.log("error", response);
  };

  const onServiceSuccess = () => {};

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: serviceData,
  } = GetServicesHook(onServiceSuccess, onServiceError);
  const allMainServices = serviceData?.data?.result;
  //===========>SERVICES<==============

  //===========>USERS <==============
  const onStaffError = (response) => {
    setStaffUsers([]);
  };

  const onStaffSuccess = (response) => {
    setStaffUsers(response?.data?.result);

    //filter tasker users
    const filterTaskers = response?.data?.result?.filter(function (item) {
      return item?.roles?.[0] == "TASKER";
    });
    setTaskerUsers(filterTaskers);

    //filter admin users
    const filterAdmins = response?.data?.result?.filter(function (item) {
      return item?.roles?.[0] == "ADMIN";
    });
    setAdminUsers(filterAdmins);
  };

  const {
    data: staffData,
    isLoading: isStaffLoading,
    isError: isStaffError,
    isSuccess: isStaffSuccess,
    error: staffError,
  } = GetAllStaffMembersDataHook(onStaffSuccess, onStaffError);
  const allStaffUsers = staffData?.data?.result;

  //get all customers
  const onCustomerError = (response) => {
    setCustomerUsers([]);
    console.log("error", response);
  };

  const onCustomerSuccess = (response) => {
    setCustomerUsers(response?.data?.result);
  };

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
    isSuccess: isCustomerSuccess,
    error: customerError,
  } = GetAllCustomersDataHook(onCustomerSuccess, onCustomerError);
  const allCustomerUsers = customerData?.data?.result;

  //join staff and customer users data sets
  const concatenateUsers = () => {
    var concatUsers = allStaffUsers?.concat(allCustomerUsers);
    setAllUsers(concatUsers);
  };

  useEffect(() => {
    concatenateUsers();
  }, [staffData, customerData]);

  //===========>USERS <==============

  return (
    <div className={styles.adminDashboard}>
      <h4 className={styles.title}>Dashboard Overview</h4>
      <div className={styles.dashboardStats}>
        <h6>All time statistics</h6>
        <Statistics
          styles={styles}
          allMainServices={allMainServices}
          allUsers={allUsers}
          allCustomerOrders={allCustomerOrders}
        />
        <SummaryTables
          styles={styles}
          recentOrders={recentOrders}
          summaryTasks={summaryTasks}
          isOrdersLoading={isOrdersLoading}
          isTasksLoading={isTasksLoading}
        />
      </div>
    </div>
  );
}
