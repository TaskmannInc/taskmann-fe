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
const getTaskTeamMembers = () => {
  const url = baseURL + ENDPOINTS.teammembers;
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetTaskTeamMembersHook = (onSuccess, onError) => {
  return useQuery(["allTaskers"], getTaskTeamMembers, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};
