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

//get selected service to book
const userSession = {
  accessAuth:
    typeof window !== "undefined"
      ? cookies.get("TM_AC_TK") ?? sessionStorage.getItem("TM_AC_TK")
      : null,
  userSession:
    typeof window !== "undefined"
      ? cookies.get("TM_AC_USR") ?? sessionStorage.getItem("TM_AC_USR")
      : null,
};

//--> call back function to get session orders
const getSessionOrders = () => {
  const url = baseURL + ENDPOINTS.order + "s";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  // console.log("headers", headers);
  return axios.get(url, { headers: headers });
};

export const GetLoggedInUserOrders = (onSuccess, onError) => {
  return useQuery(["sessionOrders"], () => getSessionOrders(), {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to order cart items
const checkoutCart = (data) => {
  const url = baseURL + ENDPOINTS.order + `/${data}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.post(url, {}, { headers: headers });
};

export const CheckoutCartItemsHook = (onCheckoutSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(checkoutCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionOrders"]);
    },
    onCheckoutSuccess,
    onError,
  });
};

//--> call back function to order cart items
const makePayment = (data) => {
  const url = baseURL + ENDPOINTS.payment + `/${data}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.post(url, {}, { headers: headers });
};

export const MakePaymentHook = (onPaymentSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(makePayment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["sessionOrders"]);
      window.open(data?.data?.data?.payment_details?.url, "_blank");
    },
    onPaymentSuccess,
    onError,
  });
};

const cancelSessionUserOrder = (data) => {
  const url = baseURL + ENDPOINTS.order + `/cancel/${data?.id}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  delete data.id;
  return axios.patch(url, data, { headers: headers });
};

export const CancelSessionUserOrderHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(cancelSessionUserOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionOrders"]);
      queryClient.invalidateQueries(["adminTaskList"]);
      queryClient.invalidateQueries(["taskersTasks"]);
    },
    onUpdateSuccess,
    onError,
  });
};

//<==== CUSTOM REQUESTS RELATED HOOKS ===>

//--> call back function to get session user's custom requests ==> HOOKS
const getSessionRequest = () => {
  const url = baseURL + ENDPOINTS.customrequests;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetLoggedInUserRequest = (onSuccess, onError) => {
  return useQuery(["sessionCustomOrders"], () => getSessionRequest(), {
    onSuccess,
    onError,
    staleTime: Infinity,
    keepPreviousData: true,
  });
};

//--> call back function to get specific custom request ==> HOOKS
const getSelectedCustomRequest = (id) => {
  const url = baseURL + ENDPOINTS.customrequests + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedCustomRequestHook = (onSuccess, onError, id) => {
  return useQuery(
    ["selectedCustomRequest", id],
    () => getSelectedCustomRequest(id),
    {
      onSuccess,
      onError,
      staleTime: Infinity,
    }
  );
};

//--> call back function to make a custom request ==>HOOKS
const requestCustomService = (data) => {
  const url = baseURL + ENDPOINTS.customrequests;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.post(url, data, { headers: headers });
};

export const RequestCustomServiceHook = (onRequestSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(requestCustomService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionCustomOrders"]);
    },
    onRequestSuccess,
    onError,
  });
};

//update user's existing custom request ==>HOOKS
const updateCustomRequest = (data) => {
  const url = baseURL + ENDPOINTS.order + `/cancel/${data?.id}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  delete data.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateCustomRequestHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateCustomRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionCustomOrders"]);
    },
    onUpdateSuccess,
    onError,
  });
};
