import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Cookies from "universal-cookie";
const cookie = new Cookies();

// =====================================================//
// =====================================================//
// =====================================================//
var baseURL = process.env.NEXT_PUBLIC_APP_URL;
var ACCESS_TOKEN, sessionToken;
if (typeof window != "undefined") {
  sessionToken = sessionStorage.getItem("TM_STF_TK");
  sessionToken != undefined
    ? (ACCESS_TOKEN = sessionToken)
    : (ACCESS_TOKEN = undefined);
}

//====>get staff profile by token
//--> call back function to get all logged in user profile
const getSummaryData = () => {
  console.log("TOKEN", ACCESS_TOKEN);
  const url = baseURL + ENDPOINTS.getstaffprofile;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSummaryAdminData = (onSuccess, onError) => {
  return useQuery({
    queryKey: "staffprofile",
    queryFn: getSummaryData,
    onSuccess: onSuccess,
    onError: onError,
    staleTime: Infinity,
  });
};
