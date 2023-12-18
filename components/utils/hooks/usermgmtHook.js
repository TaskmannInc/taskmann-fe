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

//===> GET USERS INFORMATION <====//

//--> call back function to get all users
const getAllUsers = () => {
  const url = baseURL + ENDPOINTS.allusers + "?deleted=false";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetAllUsersData = (onSuccess, onError) => {
  return useQuery(["allusers"], getAllUsers(), {
    onSuccess,
    onError,
  });
};

//--> call back function to get all customers
const getAllCustomers = () => {
  const url = baseURL + ENDPOINTS.allcustomers;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetAllCustomersDataHook = (onSuccess, onError) => {
  return useQuery(["allcustomerUsers"], () => getAllCustomers(), {
    onSuccess,
    onError,
    staleTime: Infinity,
    keepPreviousData: true,
  });
};

//--> call back function to get all staff members

const getAllStaffMembers = () => {
  const url = baseURL + ENDPOINTS.allstaff;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetAllStaffMembersDataHook = (onSuccess, onError) => {
  return useQuery(["allstaffUsers"], () => getAllStaffMembers(), {
    onSuccess,
    onError,
    // staleTime: Infinity,
    keepPreviousData: true,
  });
};

//===> USER ADDITION <===//
//--> call back function to add a user
const addUser = (userdata) => {
  const url = baseURL + ENDPOINTS.allusers;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, userdata, { headers: headers });
};

export const AddUserData = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allusers"]);
    },
    onError,
  });
};

//===> USER UPDATE -ROLE <===//
//--> call back function to update user role
const UpdateStaffRole = (userdata) => {
  const url = baseURL + ENDPOINTS.updatestaffrole;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, userdata, { headers: headers });
};

export const UpdateStaffRoleHook = (onRoleSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(UpdateStaffRole, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allusers"]);
    },
    onRoleSuccess,
    onError,
  });
};

//--> call back function to update user role
const updateUserStatus = (userdata) => {
  const url = baseURL + ENDPOINTS.allusers;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, userdata, { headers: headers });
};

export const UpdateUserStatusHook = (onStatusSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateUserStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allusers"]);
    },
    onStatusSuccess,
    onError,
  });
};

//--> call back function to update a user
const updateUser = (new_user_data) => {
  const url = baseURL + ENDPOINTS.allusers + `/${new_user_data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete new_user_data?.id;
  return axios.patch(url, new_user_data, { headers: headers });
};

export const UpdateUserDataHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allusers"]);
    },
    onUpdateSuccess,
    onError,
  });
};

//--> call back function to update staff status
const updateStaffStatus = (new_user_data) => {
  const url = baseURL + ENDPOINTS.updatestaff;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete new_user_data?.id;
  return axios.patch(url, new_user_data, { headers: headers });
};

export const UpdateStaffStatusHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateStaffStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allusers"]);
    },
    onUpdateSuccess,
    onError,
  });
};

//--> call back function to update customer status
const updateCustomerStatus = (new_user_data) => {
  const url = baseURL + ENDPOINTS.updatecustomer;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete new_user_data?.id;
  return axios.patch(url, new_user_data, { headers: headers });
};

export const UpdateCustomerStatusHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateCustomerStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allusers"]);
    },
    onUpdateSuccess,
    onError,
  });
};

//--> call back function to delete a user
const deleteUser = (__id) => {
  const url = baseURL + ENDPOINTS.allusers + `/${__id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteUserDataHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allusers", "allcustomers", "allstaff"]);
    },
    onUpdateSuccess,
    onError,
  });
};
