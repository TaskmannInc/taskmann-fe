import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ENDPOINTS } from "../constants/endpoints";
import Cookies from "universal-cookie";
const cookies = new Cookies();
var baseURL = process.env.NEXT_PUBLIC_APP_URL;

//get access token
var ACCESS_TOKEN, sessionToken;
if (typeof window != "undefined") {
  sessionToken = sessionStorage.getItem("TM_STF_TK");
  sessionToken != undefined
    ? (ACCESS_TOKEN = sessionToken)
    : (ACCESS_TOKEN = undefined);
}

//--> call back function to get all admin orders
const getAdminOrderList = () => {
  const url = baseURL + ENDPOINTS.adminorders;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetAdminOrderListHook = (onSuccess, onError) => {
  return useQuery(["adminOrderList"], getAdminOrderList, {
    onSuccess,
    onError,
    keepPreviousData: true,
    staleTime: Infinity,
  });
};

//--> call back function to get all admin special requests
const getAdminSpecialRequestListing = () => {
  const url = baseURL + ENDPOINTS.admincustomorders;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetAdminSpecialRequestListingsHook = (onSuccess, onError) => {
  return useQuery(["adminSpecialRequestList"], getAdminSpecialRequestListing, {
    onSuccess,
    onError,
    keepPreviousData: true,
    staleTime: Infinity,
  });
};

//--> call back function to get all services
const getSelectedOrder = (data) => {
  const url = baseURL + ENDPOINTS.adminorders + `/${data}`;
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedOrderHook = (onSuccess, onError, data) => {
  return useQuery(["selectedOrder", data], () => getSelectedOrder(data), {
    onSuccess,
    onError,
  });
};

//--> call back function to get all services
const getAdminTaskList = () => {
  const url = baseURL + ENDPOINTS.alltasks;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetAdminTaskListHook = (onSuccess, onError) => {
  return useQuery(["adminTaskList"], getAdminTaskList, {
    onSuccess,
    onError,
    keepPreviousData: true,
    staleTime: Infinity,
  });
};

//--> call back function to get all taskers
const getTaskersTasks = () => {
  const url = baseURL + ENDPOINTS.taskerstasks;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetTaskersTask = (onSuccess, onError) => {
  return useQuery(["taskersTasks"], getTaskersTasks, {
    onSuccess,
    onError,
    keepPreviousData: true,
    staleTime: Infinity,
  });
};

//--> call back function to make a custom request ==>HOOKS
const AdminRequestCustomService = (data) => {
  const url = baseURL + ENDPOINTS.admincustomorders + `/${data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.post(url, data, { headers: headers });
};

export const AdminRequestCustomServiceHook = (onRequestSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(AdminRequestCustomService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionCustomOrders"]);
      queryClient.invalidateQueries(["adminSpecialRequestList"]);
    },
    onRequestSuccess,
    onError,
  });
};

//--> call back function to make a custom request ==>HOOKS
const updateAdminCustomService = (data) => {
  const url = baseURL + ENDPOINTS.admincustomorders + `/${data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateAdminCustomRequestHook = (onRequestSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateAdminCustomService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionCustomOrders"]);
      queryClient.invalidateQueries(["adminSpecialRequestList"]);
    },
    onRequestSuccess,
    onError,
  });
};

//--> call back function to add assign a task
const assignTask = (data) => {
  const url = baseURL + ENDPOINTS.tasks + `/${data?.order?._id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.order;
  return axios.post(url, data, { headers: headers });
};

export const AssignTaskHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(assignTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["adminTaskList"]);
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update an assigned task
const updateTaskAssignment = (data) => {
  const accept_reject_url =
    baseURL + ENDPOINTS.accept_reject_tasks + `/${data?.id}`;
  const progress_cancel_cancel =
    baseURL + ENDPOINTS.progress_cancel_complete_tasks + `/${data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data.id;
  return axios.patch(
    data?.code ? progress_cancel_cancel : accept_reject_url,
    data,
    { headers: headers }
  );
};

export const UpdateTaskersTasks = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateTaskAssignment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["adminTaskList"]);
      queryClient.invalidateQueries(["taskersTasks"]);
    },
    onUpdateSuccess,
    onError,
  });
};
