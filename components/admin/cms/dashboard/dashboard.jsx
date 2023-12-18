import { useEffect, useState } from "react";
import styles from "../../../../styles/admin/Dashboard.module.css";
import { GetServicesHook } from "../../../utils/hooks/serviceMgmtHook";
import {
  GetAllCustomersDataHook,
  GetAllStaffMembersDataHook,
} from "../../../utils/hooks/usermgmtHook";

import Statistics from "./subs/statistics";
import SummaryTables from "./subs/summaryTables";
import { GetAdminOrderListHook } from "../../../utils/hooks/ordersMgmtHook";
export default function AdminDashboard() {
  const [allCustomerOrders, setAllCustomerOrders] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [taskerUsers, setTaskerUsers] = useState([]);
  const [customerUsers, setCustomerUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  //--get orders and tasks error, success <--> on during, after, request--//
  const onOrderError = (response) => {
    console.log("orders error", response);
  };

  const onOrderSuccess = (data) => {
    console.log("allorder", data?.data?.data);
    setAllCustomerOrders(data?.data?.data);
  };

  const {
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    isSuccess: isOrdersSuccess,
    error: orderError,
    refetch: refetchOrders,
    isRefetching: refetchingOrders,
  } = GetAdminOrderListHook(onOrderSuccess, onOrderError);

  //--get main service <--> request--//
  const onServiceError = (response) => {
    console.log("error", response);
  };

  const onServiceSuccess = (response) => {
    // console.log("sucesss :", response);
  };

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: serviceData,
  } = GetServicesHook(onServiceSuccess, onServiceError);
  const allMainServices = serviceData?.data?.result;

  //get all staff members
  const onStaffError = (response) => {
    console.log("error", response);
    setStaffUsers([]);
  };

  const onStaffSuccess = (response) => {
    setStaffUsers(response?.data?.result);

    //filter tasker users
    const filterTaskers = response?.data?.result?.filter(function (item) {
      return item?.roles?.[0] == "TASKER";
    });
    console.log("filtered taskers", filterTaskers);
    setTaskerUsers(filterTaskers);

    //filter admin users
    const filterAdmins = response?.data?.result?.filter(function (item) {
      return item?.roles?.[0] == "ADMIN";
    });
    console.log("filtered Admins", filterAdmins);
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
        {/* <SummaryTables styles={styles} /> */}
      </div>
    </div>
  );
}
