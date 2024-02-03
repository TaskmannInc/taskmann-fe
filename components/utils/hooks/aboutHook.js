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

//--> call back function to get all team members
const getAboutContent = () => {
  const url = baseURL + ENDPOINTS.aboutus;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetAboutContentHook = (onSuccess, onError) => {
  return useQuery("allInfos", getAboutContent, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to get specific team members
const getSelectedAboutContent = (id) => {
  const url = baseURL + ENDPOINTS.aboutus + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedAboutContentHook = (onSuccess, onError, id) => {
  const queryClient = useQueryClient();
  return useMutation(["selectedAbout"], () => getSelectedAboutContent(id), {
    onSuccess,
    onError,
  });
};

//--> call back function to add a team members
const addAboutContent = (data) => {
  const url = baseURL + ENDPOINTS.aboutus;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, data, { headers: headers });
};

export const AddAboutContentHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addAboutContent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allInfos");
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update a team member
const updateAboutContent = (data) => {
  const url = baseURL + ENDPOINTS.aboutus + `/${data?.id}`;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateAboutContentHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateAboutContent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allInfos");
    },
    onError,
  });
};

//--> call back function to delete a team member
const deleteAboutContent = (id) => {
  const url = baseURL + ENDPOINTS.aboutus + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteAboutContentHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteAboutContent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allInfos");
    },
    onError,
  });
};
