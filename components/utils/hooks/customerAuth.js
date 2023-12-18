import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";
import { useMutation } from "react-query";
import Cookies from "universal-cookie";
const cookie = new Cookies();

// =====================================================//
// =====================================================//
// =====================================================//
var baseURL = process.env.NEXT_PUBLIC_APP_URL;

var ACCESS_TOKEN, sessionToken;
if (typeof window != "undefined") {
  sessionToken = sessionStorage.getItem("TM_AC_TK");
  sessionToken != undefined
    ? (ACCESS_TOKEN = sessionToken)
    : (ACCESS_TOKEN = undefined);
}

//=========>SIGNUP
//call back function to signup user
const AuthenticateCustomer = (signupdata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.registercustomer;
  return axios.post(url, signupdata, { headers: headers });
};

//Sign up request hook
export const SendAuthenticationRequest = (onSuccess, onError) => {
  return useMutation(AuthenticateCustomer, {
    onSuccess,
    onError,
  });
};

//=========>LOGIN
//call back function to login user
const AuthorizeCustomer = (logindata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.logincustomer;
  return axios.post(url, logindata, { headers: headers });
};

//Login request hook
export const SendAuthorizationRequest = (onSuccess, onError) => {
  return useMutation(AuthorizeCustomer, {
    onSuccess,
    onError,
  });
};

//=========>VERIFICATION
//call back function to verify user
const VerifyUserEmail = (verificationData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.verifycustomer + `?code=${verificationData}`;
  return axios.patch(url, { headers: headers });
};

//Verification request hook
export const UpdateMailVerificationHook = (onSuccess, onError) => {
  return useMutation(VerifyUserEmail, {
    onSuccess,
    onError,
  });
};

//=========>RESEND VERIFICATION
//call back function to resend email verification
const ResendVerification = (verificationdata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.resendcustomerverification;
  return axios.patch(url, verificationdata, { headers: headers });
};

//Resend mail verification request hook
export const ResendCustomerVerificationLinkHook = (onSuccess, onError) => {
  return useMutation(ResendVerification, {
    onSuccess,
    onError,
  });
};

//=========>FORGOT PASSWORD
//call back function to requets password reset / forgot password
const forgotPassword = (forgotPassowrdData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.customerforgotpassword;
  return axios.patch(url, forgotPassowrdData, { headers: headers });
};

//forgot password hook
export const SendForgotPasswordDataHook = (onSuccess, onError) => {
  return useMutation(forgotPassword, {
    onSuccess,
    onError,
  });
};

//=========>PASSWORD CHANGE / RESET
//call back function to change customer password
const customerPasswordReset = (passwordresetdata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url =
    baseURL + ENDPOINTS.resetpassword + `?token=${passwordresetdata?.code}`;
  delete passwordresetdata?.code;
  return axios.patch(url, passwordresetdata, { headers: headers });
};

//password change hook
export const SendPasswordResetDataHook = (onSuccess, onError) => {
  return useMutation(customerPasswordReset, {
    onSuccess,
    onError,
  });
};

//====>get staff profile by token
//call back function to get jobs added by scout
const getCustomerProfileData = () => {
  const url = baseURL + ENDPOINTS.getcustomerprofile;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetCustomerProfileHook = (onSuccess, onError) => {
  return useQuery({
    queryKey: "customerprofile",
    queryFn: () => getCustomerProfileData,
    onSuccess: onSuccess,
    onError: onError,
  });
};

//call back function to get profile info
export const GetCustomerProfile = (token) => {
  const url = baseURL + ENDPOINTS.getcustomerprofile;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    axios.get(url, { headers: headers }).then((resp) => {
      if (resp?.status == 200 && resp?.data?.result?.user) {
        var user = resp?.data?.result?.user;
        var token = resp?.data?.result?.token;
        sessionStorage.setItem("TM_AC_USR", JSON.stringify(user));
        sessionStorage.setItem("TM_AC_TK", token);
        cookie.set("TM_AC_TK", token, { sameSite: "strict" });
        cookie.set("TM_AC_USR", user, { sameSite: "strict" });
        // return;
        window.location.href = "/";
      } else {
        console.error("something happened");
        return;
      }
    });
  } catch (err) {
    console.error("err", err);
    return;
  }
};

//=========>Logout functionality
//call back function to logout from current device
const customerLogoutFunc = () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.customerlogout;
  return axios.delete(url, { headers: headers });
};

//logout from current device request hook
export const CustomerLogoutRequestHook = (onSuccess, onError) => {
  return useMutation(customerLogoutFunc, {
    onSuccess,
    onError,
  });
};

//call back function to logout from all devices
const staffLogoutOfAllDevicesFunc = () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.stafflogout;
  return axios.delete(url, { headers: headers });
};

//logout from all devices request hook
export const StaffLogoutAllRequestHook = (onSuccess, onError) => {
  return useMutation(staffLogoutOfAllDevicesFunc, {
    onSuccess,
    onError,
  });
};

//=========>PROFILE BIO UPDATE
//call back function to update customer bio
const updateUserBio = (bioInfo) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.customerprofileupdate;
  return axios.patch(url, bioInfo, { headers: headers });
};

//customer bio update hook
export const UpdateCustomerBioDataHook = (onSuccess, onError) => {
  return useMutation(updateUserBio, {
    onSuccess,
    onError,
  });
};

//=========>PASSWORD CHANGE - LOGGED IN
//call back function to change customer password
const customerPasswordChange = (passworddata) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.customerpasswordchange;
  return axios.patch(url, passworddata, { headers: headers });
};

//password change hook
export const SendPasswordChangeDataHook = (onSuccess, onError) => {
  return useMutation(customerPasswordChange, {
    onSuccess,
    onError,
  });
};
//=========>Avatar update
//call back function to change customer avatar
const profileImageUpdload = (passworddata) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.customerimagechange;
  return axios.patch(url, passworddata, { headers: headers });
};

//password change hook
export const ProfileImageUpdateHook = (onSuccess, onError) => {
  return useMutation(profileImageUpdload, {
    onSuccess,
    onError,
  });
};
