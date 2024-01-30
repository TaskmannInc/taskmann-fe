import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";
import { useMutation } from "react-query";
var baseURL = process.env.NEXT_PUBLIC_APP_URL;

//call back function to signup user
const AuthenticateCustomer = (signupdata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.registercustomer;
  return axios.post(url, signupdata, { headers: headers });
};

//Login submission hook
export const SendAuthenticationRequest = (onSuccess, onError) => {
  return useMutation(AuthenticateCustomer, {
    onSuccess,
    onError,
  });
};

//call back function to signup user
const VerifyUserEmail = (verificationData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.verifycustomer + `?${verificationData}`;
  return axios.get(url, { headers: headers });
};

//Login submission hook
export const UpdateMailVerification = (onSuccess, onError) => {
  return useMutation(VerifyUserEmail, {
    onSuccess,
    onError,
  });
};

//call back function to logout user
const RevokeRefreshToken = (userId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.logout;
  return axios.post(url, userId, { headers: headers });
};

//Login submission hook
export const LogoutAllDevices = (onSuccess, onError) => {
  return useMutation(RevokeRefreshToken, {
    onSuccess,
    onError,
  });
};

//call back function to requets password reset / forgot password
const forgotPassword = (forgotPassowrdData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.forgotpassword;
  return axios.post(url, forgotPassowrdData, { headers: headers });
};

//Login submission hook
export const SendForgotPasswordData = (onSuccess, onError) => {
  return useMutation(forgotPassword, {
    onSuccess,
    onError,
  });
};

//call back function to change customer password
const customerPasswordReset = (passwordresetdata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.resetpassword;
  return axios.patch(url, passwordresetdata, { headers: headers });
};

//Login submission hook
export const SendPasswordResetData = (onSuccess, onError) => {
  return useMutation(customerPasswordReset, {
    onSuccess,
    onError,
  });
};
