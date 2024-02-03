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

//--> call back function to get all openings
const getAllCareerOpenings = () => {
  const url = baseURL + ENDPOINTS.careers;
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(url, { headers: headers });
};

export const GetCareerOpeningsHook = (onSuccess, onError) => {
  return useQuery(["allcareeropenings"], getAllCareerOpenings, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to get specific opening
const getSelectedCareerOpening = (id) => {
  const url = baseURL + ENDPOINTS.careers + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const GetSelectedCareerOpeningHook = (onSuccess, onError, id) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["selectedCareerOpening"],
    () => getSelectedCareerOpening(id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["allcareeropenings"]);
      },
      onError,
    }
  );
};

//--> call back function to add an opening
const addCareerOpening = (servicedata) => {
  const url = baseURL + ENDPOINTS.careers;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, servicedata, { headers: headers });
};

export const AddCareerOpeningHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addCareerOpening, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allcareeropenings"]);
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update an opening
const updateCareerOpening = (data) => {
  const url = baseURL + ENDPOINTS.careers + `/${data?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateCareerOpeningHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateCareerOpening, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allcareeropenings"]);
    },
    onUpdateSuccess,
    onError,
  });
};

//--> call back function to delete an opening
const deleteCareerOpening = (id) => {
  const url = baseURL + ENDPOINTS.careers + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteCareerOpeningHook = (onDeleteSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteCareerOpening, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allcareeropenings"]);
    },
    onDeleteSuccess,
    onError,
  });
};
