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

//=========>SIGNUP
//call back function to signup user
const AuthenticateStaff = (signupdata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.registerstaff;
  return axios.post(url, signupdata, { headers: headers });
};

//Sign up request hook
export const SendStaffAuthenticationRequest = (onSuccess, onError) => {
  return useMutation(AuthenticateStaff, {
    onSuccess,
    onError,
  });
};

//=========>LOGIN
//call back function to login user
const AuthorizeStaff = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.loginstaff;
  return axios.post(url, data, { headers: headers });
};

//Login request hook
export const SendStaffAuthorizationRequest = (onSuccess, onError) => {
  return useMutation(AuthorizeStaff, {
    onSuccess,
    onError,
  });
};

//=========>VERIFICATION
//call back function to verify user
const VerifyStaffEmail = (verificationData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.verifystaff + `?code=${verificationData}`;
  return axios.patch(url, { headers: headers });
};

//Verification request hook
export const StaffMailVerificationHook = (onSuccess, onError) => {
  return useMutation(VerifyStaffEmail, {
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
  const url = baseURL + ENDPOINTS.resendstaffverification;
  return axios.patch(url, verificationdata, { headers: headers });
};

//Resend mail verification request hook
export const ResendStaffVerificationLinkHook = (onSuccess, onError) => {
  return useMutation(ResendVerification, {
    onSuccess,
    onError,
  });
};

//=========>FORGOT PASSWORD
//call back function to requets password reset / forgot password
const ForgotStaffPassword = (forgotPassowrdData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.staffforgotpassword;
  return axios.patch(url, forgotPassowrdData, { headers: headers });
};

//forgot password hook
export const ForgotStaffPasswordHook = (onSuccess, onError) => {
  return useMutation(ForgotStaffPassword, {
    onSuccess,
    onError,
  });
};

//=========>PASSWORD CHANGE / RESET
//call back function to change staff password
const StaffPasswordReset = (passwordresetdata) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url =
    baseURL +
    ENDPOINTS.staffresetpassword +
    `?token=${passwordresetdata?.code}`;
  delete passwordresetdata?.code;
  return axios.patch(url, passwordresetdata, { headers: headers });
};

//password change hook
export const StaffPasswordResetDataHook = (onSuccess, onError) => {
  return useMutation(StaffPasswordReset, {
    onSuccess,
    onError,
  });
};

//=========>LOGOUT
//call back function to logout user
const RevokeRefreshToken = (staffID) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const url = baseURL + ENDPOINTS.logout;
  return axios.post(url, staffID, { headers: headers });
};

//Logout request hook
export const LogoutAllDevicesHook = (onSuccess, onError) => {
  return useMutation(RevokeRefreshToken, {
    onSuccess,
    onError,
  });
};

//====>get staff profile by token
//--> call back function to get all logged in user profile
const getStaffProfileData = () => {
  console.log("TOKEN", ACCESS_TOKEN);
  const url = baseURL + ENDPOINTS.getstaffprofile;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetStaffProfileHook = (onSuccess, onError) => {
  return useQuery({
    queryKey: "staffprofile",
    queryFn: getStaffProfileData,
    onSuccess: onSuccess,
    onError: onError,
    staleTime: Infinity,
  });
};

//call back function to get profile info
export const GetStaffProfile = (token) => {
  const url = baseURL + ENDPOINTS.getstaffprofile;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    axios.get(url, { headers: headers }).then((resp) => {
      if (
        resp?.status == 200 &&
        resp?.data?.result?.user?.roles?.[0] === "ADMIN"
      ) {
        var user = resp?.data?.result?.user;
        var token = resp?.data?.result?.token;
        sessionStorage.setItem("TM_STF_USR", JSON.stringify(user));
        sessionStorage.setItem("TM_STF_TK", token);
        sessionStorage.setItem("TM_STF_ROLE", "ADMIN");
        cookie.set("TM_STF_TK", token, { sameSite: "strict" });
        cookie.set("TM_STF_USR", user, { sameSite: "strict" });
        cookie.set("TM_STF_ROLE", "ADMIN", { sameSite: "strict" });
        // return;
        window.location.href = "/admin/cms/dashboard";
      } else if (
        resp?.status == 200 &&
        resp?.data?.result?.user?.roles?.[0] === "TASKER"
      ) {
        var user = resp?.data?.result?.user;
        var token = resp?.data?.result?.token;
        sessionStorage.setItem("TM_STF_USR", JSON.stringify(user));
        sessionStorage.setItem("TM_STF_TK", token);
        sessionStorage.setItem("TM_STF_ROLE", "TASKER");
        cookie.set("TM_STF_USR", user, { sameSite: "strict" });
        cookie.set("TM_STF_TK", token, { sameSite: "strict" });
        cookie.set("TM_STF_ROLE", "TASKER", { sameSite: "strict" });
        // return;
        window.location.href = "/tasker/taskerdashboard";
      } else {
        console.error("an error happened confirming your information");
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
const staffLogoutFunc = () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.stafflogout;
  return axios.delete(url, { headers: headers });
};

//password change hook
export const StaffLogoutRequestHook = (onSuccess, onError) => {
  return useMutation(staffLogoutFunc, {
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

//password change hook
export const StaffLogoutAllRequestHook = (onSuccess, onError) => {
  return useMutation(staffLogoutOfAllDevicesFunc, {
    onSuccess,
    onError,
  });
};

//=========>PROFILE BIO UPDATE
//call back function to update staff bio
const updateUserBio = (bioInfo) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.staffprofileupdate;
  return axios.patch(url, bioInfo, { headers: headers });
};

//staff bio update hook
export const UpdateStaffBioDataHook = (onSuccess, onError) => {
  return useMutation(updateUserBio, {
    onSuccess,
    onError,
  });
};

//=========>PASSWORD CHANGE - LOGGED IN
//call back function to change staff password
const staffPasswordChange = (passworddata) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.staffpasswordchange;
  return axios.patch(url, passworddata, { headers: headers });
};

//password change hook
export const StafdPasswordChangeDataHook = (onSuccess, onError) => {
  return useMutation(staffPasswordChange, {
    onSuccess,
    onError,
  });
};

//=========>Avatar update
//call back function to change staff avatar
const profileImageUpdload = (passworddata) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const url = baseURL + ENDPOINTS.staffimagechange;
  return axios.patch(url, passworddata, { headers: headers });
};

//staff profile avatar change hook
export const StaffProfileImageUpdateHook = (onSuccess, onError) => {
  return useMutation(profileImageUpdload, {
    onSuccess,
    onError,
  });
};
