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

// console.log("actok", ACCESS_TOKEN);

//--> call back function to get all services
const getAllServices = () => {
  const url = baseURL + ENDPOINTS.services;
  const headers = {
    "Content-Type": "application/json",
  };
  // console.log("headers", headers);
  return axios.get(url, { headers: headers });
};

export const GetServicesHook = (onSuccess, onError) => {
  return useQuery(["allservices"], getAllServices, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to get all services
const getSelectedService = (data) => {
  const url = baseURL + ENDPOINTS.services + `/${data}`;
  const headers = {
    "Content-Type": "application/json",
  };
  // console.log("headers", headers);
  return axios.get(url, { headers: headers });
};

export const GetSelectedServiceHook = (onSuccess, onError, data) => {
  return useQuery(["selectedService", data], () => getSelectedService(data), {
    onSuccess,
    onError,
    // staleTime: Infinity,
  });
};

//--> call back function to get sub  services
const getAllSubServices = () => {
  const url = baseURL + ENDPOINTS.subservices;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSubServicesHook = (onSuccess, onError) => {
  return useQuery(["allsubservices"], getAllSubServices, {
    onSuccess,
    onError,
    // staleTime: Infinity,
  });
};

//--> call back function to get sub  services
const getSelectedSubService = (data) => {
  const url = baseURL + ENDPOINTS.subservices + `/${data}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedSubServiceHook = (onSuccess, onError, data) => {
  return useQuery(
    ["selectedSubService", data],
    () => getSelectedSubService(data),
    {
      onSuccess,
      onError,
      staleTime: Infinity,
    }
  );
};

//--> call back function to get sub service price tiers
const getAllSubServicePriceTiers = () => {
  const url = baseURL + ENDPOINTS.pricetier;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSubServicesPriceTierHook = (onSuccess, onError) => {
  return useQuery("subservicepricetiers", getAllSubServicePriceTiers, {
    onSuccess,
    onError,
  });
};

//--> call back function to add a service
const addMainService = (servicedata) => {
  const url = baseURL + ENDPOINTS.services;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, servicedata, { headers: headers });
};

export const AddServiceHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addMainService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["allservices"]);
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to add a sub service
const addSubService = (servicedata) => {
  const url = baseURL + ENDPOINTS.subservices;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, servicedata, { headers: headers });
};

export const AddSubServiceHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addSubService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allservices");
      queryClient.invalidateQueries("allsubservices");
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to add a price tier
const addPriceTier = (pricingdata) => {
  const url = baseURL + ENDPOINTS.pricetier;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, pricingdata, { headers: headers });
};

export const AddPriceTierHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addPriceTier, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("subservicepricetiers");
    },
    onError,
  });
};

//--> call back function to update a service
const updateMainService = (servicedata) => {
  const url = baseURL + ENDPOINTS.services + `/${servicedata?.id}`;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete servicedata?.id;
  return axios.patch(url, servicedata, { headers: headers });
};

export const UpdateMainServiceHook = (onUpdateSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateMainService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allservices");
      queryClient.invalidateQueries("allsubservices");
    },
    onUpdateSuccess,
    onError,
  });
};

//--> call back function to update a sub service
const updateSubService = (servicedata) => {
  const url = baseURL + ENDPOINTS.subservices + `/${servicedata?.id}`;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete servicedata?.id;
  return axios.patch(url, servicedata, { headers: headers });
};

export const UpdateSubServiceHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateSubService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allsubservices");
      queryClient.invalidateQueries("allservices");
    },
    onError,
  });
};

//--> call back function to update pricing
const updatePricing = (pricingdata) => {
  const url = baseURL + ENDPOINTS.pricetier + `/${pricingdata?.id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete pricingdata?.id;
  return axios.patch(url, pricingdata, { headers: headers });
};

export const UpdatePricingHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updatePricing, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("subservicepricetiers");
    },
    onError,
  });
};

//--> call back function to delete a service
const deleteMainService = (id) => {
  const url = baseURL + ENDPOINTS.services + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteMainService = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteMainService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allservices");
    },
    onError,
  });
};

//--> call back function to delete a sub service
const deleteSubService = (id) => {
  const url = baseURL + ENDPOINTS.subservices + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteSubServiceHook = (onDelSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteSubService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allservices");
      queryClient.invalidateQueries("allsubservices");
    },
    onDelSuccess,
    onError,
  });
};

//--> call back function to delete pricing tier
const deletePricingTier = (id) => {
  const url = baseURL + ENDPOINTS.pricetier + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeletePricingTierHook = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deletePricingTier, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("subservicepricetiers");
    },
    onError,
  });
};
