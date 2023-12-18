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
const getTeamMembers = () => {
  const url = baseURL + ENDPOINTS.teammembers;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  // console.log("headers", headers);
  return axios.get(url, { headers: headers });
};

export const GetTeamMembersHook = (onSuccess, onError) => {
  return useQuery("allteammembers", getTeamMembers, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to get specific team members
const getSelectedTeamMember = (id) => {
  const url = baseURL + ENDPOINTS.teammembers + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedTeamMemberHook = (onSuccess, onError, id) => {
  const queryClient = useQueryClient();
  return useMutation(["selectedMember"], () => getSelectedTeamMember(id), {
    onSuccess,
    onError,
  });
};

//--> call back function to add a team members
const addTeamMember = (data) => {
  const url = baseURL + ENDPOINTS.teammembers;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, data, { headers: headers });
};

export const AddTeamMemberHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addTeamMember, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allteammembers");
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update a team member
const updateTeamMember = (data) => {
  const url = baseURL + ENDPOINTS.teammembers + `/${data?.id}`;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateTeamMemberHook = (onReqSucces, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateTeamMember, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allteammembers");
    },
    onReqSucces,
    onError,
  });
};

//--> call back function to delete a team member
const deleteTeamMember = (id) => {
  const url = baseURL + ENDPOINTS.teammembers + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteTeamMemberHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTeamMember, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allteammembers");
    },
    onError,
  });
};
