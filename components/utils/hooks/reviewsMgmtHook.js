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

//--> call back function to get all reviews
const getReviews = () => {
  const url = baseURL + ENDPOINTS.review;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  // console.log("headers", headers);
  return axios.get(url, { headers: headers });
};

export const GetReviewsHook = (onSuccess, onError) => {
  return useQuery(["allreviews"], getReviews, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to get specific reviews
const getSelectedReview = (id) => {
  const url = baseURL + ENDPOINTS.review + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const GetSelectedReviewHook = (onSuccess, onError, id) => {
  const queryClient = useQueryClient();
  return useMutation(["selectedReview"], () => getSelectedReview(id), {
    onSuccess,
    onError,
  });
};

//--> call back function to add a review
const addReview = (data) => {
  const url = baseURL + ENDPOINTS.review;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, data, { headers: headers });
};

export const AddReviewHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addReview, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allreviews");
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update a review
const updateReview = (data) => {
  const url = baseURL + ENDPOINTS.review + `/${data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateReviewHook = (onFnSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateReview, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allreviews");
    },
    onFnSuccess,
    onError,
  });
};

//--> call back function to delete a review
const deleteReview = (id) => {
  const url = baseURL + ENDPOINTS.review + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteReviewHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteReview, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allreviews");
    },
    onError,
  });
};
