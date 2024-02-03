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

//--> call back function to get all faqs
const getFAQs = () => {
  const url = baseURL + ENDPOINTS.faqs;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetFAQsHook = (onSuccess, onError) => {
  return useQuery(["allfaqs"], getFAQs, {
    onSuccess,
    onError,
    // staleTime: Infinity,
  });
};

//--> call back function to get specific faqs
const getSelectedFAQs = (id) => {
  const url = baseURL + ENDPOINTS.faqs + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const GetSelectedFAQsHook = (onSuccess, onError, id) => {
  const queryClient = useQueryClient();
  return useMutation(["selectedFAQs"], () => getSelectedFAQs(id), {
    onSuccess,
    onError,
  });
};

//--> call back function to add a faq
const addFAQs = (data) => {
  const url = baseURL + ENDPOINTS.faqs;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, data, { headers: headers });
};

export const AddFAQsHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addFAQs, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allfaqs");
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update a review
const updateFAQs = (data) => {
  const url = baseURL + ENDPOINTS.faqs + `/${data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateFAQHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateFAQs, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allfaqs");
    },
    onUpdateSuccess,
    onError,
  });
};

//--> call back function to delete a faq
const deleteFAQ = (id) => {
  const url = baseURL + ENDPOINTS.faqs + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteFAQHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteFAQ, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allfaqs");
    },
    onError,
  });
};
