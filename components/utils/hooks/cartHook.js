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

//--> call back function to get session cart
const getSessionCart = () => {
  const url = baseURL + ENDPOINTS.cart;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  // console.log("headers", headers);
  return axios.get(url, { headers: headers });
};

export const GetLoggedInUserCart = (onSuccess, onError) => {
  return useQuery(["sessionCart"], () => getSessionCart(), {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to add cart items
const addCartItem = (cartData) => {
  const url = baseURL + ENDPOINTS.cart;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.post(url, cartData, { headers: headers });
};

export const AddCartItemsHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("sessionCart");
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update cart item
const updateCartItem = (cartData) => {
  const url = baseURL + ENDPOINTS.cart;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.post(url, cartData, { headers: headers });
};

export const UpdateCartItemsHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionCart"]);
    },
    onUpdateSuccess,
    onError,
  });
};

//--> call back function to delete cart item
const deleteCartItem = (id) => {
  const url = baseURL + ENDPOINTS.cart + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userSession?.accessAuth}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteCartItemHook = (onDeleteSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessionCart"]);
    },
    onDeleteSuccess,
    onError,
  });
};
