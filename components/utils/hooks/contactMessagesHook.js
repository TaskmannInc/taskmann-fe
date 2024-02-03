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

//--> call back function to get all contact messages
const getMessageContent = () => {
  const url = baseURL + ENDPOINTS.contact;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetMessagesContentHook = (onSuccess, onError) => {
  return useQuery(["allmessages"], getMessageContent, {
    onSuccess,
    onError,
  });
};

//--> call back function to get specific contact messages
const getSelectedMessageContent = (id) => {
  const url = baseURL + ENDPOINTS.contact + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedMessageContentHook = (onSuccess, onError, id) => {
  const queryClient = useQueryClient();
  return useMutation(["selectedMessage"], () => getSelectedMessageContent(id), {
    onSuccess,
    onError,
  });
};

//--> call back function to add a contact messages
const addMessageContent = (data) => {
  const url = baseURL + ENDPOINTS.contact;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, data, { headers: headers });
};

export const AddMessageContentHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addMessageContent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allmessages"]);
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update a team member
const updateMessageContent = (data) => {
  const url = baseURL + ENDPOINTS.contact + `/${data?.id}`;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateMessageContentHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateMessageContent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allmessages");
    },
    onError,
  });
};

//--> call back function to delete a team member
const deleteMessageContent = (id) => {
  const url = baseURL + ENDPOINTS.contact + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteMessageContentHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteMessageContent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allmessages");
    },
    onError,
  });
};
