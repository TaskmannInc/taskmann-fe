import React, { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/admin/Auth.module.css";
import { FaUserAlt } from "react-icons/fa";
import Joi from "joi-browser";
import validation from "../../utils/helpers/validation.js";
import Cookies from "universal-cookie";
import { GeneralPasswordInput } from "../../ui-fragments/input";
import { StaffPasswordResetDataHook } from "../../utils/hooks/adminAuth";
import { StatusNotification } from "../../ui-fragments/notification";
import { ButtonLoader } from "../../ui-fragments/loaders";

export default function AdminResetPassword() {
  //form states
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });

  //defined validation schema
  const schema = {
    password: Joi.string().required(),
    confirmpassword: Joi.string().required().valid(Joi.ref("password")),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //next router definition
  const router = useRouter();

  //get email confirmation code
  let resetToken = router?.query?.code;

  const passwordResetBody = {
    code: resetToken,
    password: formData?.password,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (errors) {
      console.log("data", formData);
    }
    if (!resetToken) {
      setTokenError(true);
    }
    if (!errors && resetToken) {
      resetRequest(passwordResetBody);
      console.log("data", passwordResetBody);
    }
  };

  //API request
  const onSuccess = (data) => {
    router.push("/admin/auth/login");
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: resetRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = StaffPasswordResetDataHook(onSuccess, onError);

  //toggle password show
  const togglePasswordShow = (e) => {
    setShowPass(!showPass);
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  //toggle password show
  const toggleConfirmPasswordShow = () => {
    setShowConfirmPass(!showConfirmPass);
    var x = document.getElementById("confirmpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <>
      <div className={"adminAuthBg"}>
        <div className={"authForm"}>
          <div className={"authFormHeader"}>
            <FaUserAlt size={20} />
            <h4>
              {isLoading ? (
                "Changing your password..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Password change successful. Redirecting to login..."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : tokenError ? (
                <StatusNotification
                  type={"error"}
                  message={
                    "We could not confirm your reset code. Please click on the reset button/link in the mail sent to you and try again."
                  }
                />
              ) : (
                "Admin Password Reset"
              )}
            </h4>
          </div>
          <form className={"formContainer"} onSubmit={handleSubmit}>
            <GeneralPasswordInput
              label={"New Password"}
              placeholder={"Please enter your new admin password"}
              id={"password"}
              name={"password"}
              showPassword={showPass}
              togglePasswordShow={togglePasswordShow}
              onChange={handleChange}
            />
            <small className="field-validation">
              {errors.password && "A vaild password is required"}
            </small>

            <GeneralPasswordInput
              label={"Confirm Password"}
              placeholder={"Please confirm new admin password"}
              id={"confirmpassword"}
              name={"confirmpassword"}
              showPassword={showConfirmPass}
              togglePasswordShow={toggleConfirmPasswordShow}
              onChange={handleChange}
            />
            <small className="field-validation">
              {errors.confirmpassword && "Your passwords must match"}
            </small>

            <button type="submit" className={"submitBtn"} disabled={isLoading}>
              {isLoading ? <ButtonLoader /> : "Submit"}
            </button>
            <Link href={"/admin/auth/forgot-password"} className={"pageLink"}>
              Forgot Password
            </Link>
          </form>
        </div>
        <div className={"PageNotice"}></div>
      </div>
    </>
  );
}
