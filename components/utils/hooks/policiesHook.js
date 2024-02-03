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

//--> call back function to get all policies
const getPolicies = () => {
  const url = baseURL + ENDPOINTS.policies;
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetPoliciesHook = (onSuccess, onError) => {
  return useQuery("allpolicies", getPolicies, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to get specific policies
const getSelectedPolicies = (id) => {
  const url = baseURL + ENDPOINTS.policies + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedPoliciesHook = (onSuccess, onError, id) => {
  const queryClient = useQueryClient();
  return useMutation(["selectedPolicies"], () => getSelectedPolicies(id), {
    onSuccess,
    onError,
  });
};

//--> call back function to add a policies
const addPolicies = (data) => {
  const url = baseURL + ENDPOINTS.policies;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, data, { headers: headers });
};

export const AddPoliciesHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addPolicies, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allpolicies");
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update a policy
const updatePolicies = (data) => {
  const url = baseURL + ENDPOINTS.policies + `/${data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdatePoliciesHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updatePolicies, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allpolicies");
    },
    onError,
  });
};

//--> call back function to delete a policy
const deletePolicies = (id) => {
  const url = baseURL + ENDPOINTS.policies + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeletePoliciesHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deletePolicies, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allpolicies");
    },
    onError,
  });
};
